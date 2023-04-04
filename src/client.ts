import jwt from 'jsonwebtoken';
import phin from 'phin';
import User from './types/user';
import APIError from './errors/api';
import Guild from './types/guild';
import Connection from './types/connection';
import { Collection } from '@discordjs/collection';
import crypto from 'crypto';

export type Scope = 'activities.read' | 'activities.write' | 'applications.builds.upload' | 'applications.builds.read' | 'applications.commands' | 'applications.commands.update' | 'applications.commands.permissions.update' | 'applications.entitlements' | 'applications.store.update' | 'bot' | 'connections' | 'dm_channels.read' | 'email' | 'gdm.join' | 'guilds' | 'guilds.join' | 'guilds.members.read' | 'identify' | 'messages.read' | 'relationships.read' | 'role_connections.write' | 'rpc' | 'rpc.activities.write' | 'rpc.notifications.read' | 'rpc.voice.read' | 'rpc.voice.write' | 'voice' | 'webhook.incoming';

export class Client {
  private baseURL = 'https://discord.com/api/';

  /** Cree un nuevo cliente OAuth2. */
  constructor(private options: ClientOptions) { }

  /** Genera un enlace de código de autorización según los ámbitos y el conjunto de URI de redirección. */
  get authCodeLink() {
    if (this.options.scopes.length > 0) {
      let state = crypto.randomBytes(16).toString('hex');
      return {
        url: `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${this.options.id}&scope=${this.options.scopes.join('%20')}&state=${state}&redirect_uri=${this.options.redirectURI}&prompt=none`,
        state
      };
    } else if (this.options.scopes.length < 1)
      throw new TypeError('Scopes are not defined.');
  }

  /** Obtiene el token de acceso para que el usuario realice más funciones. */
  async getAccess(code: string): Promise<string> {
    if (!code)
      throw new TypeError('Código de autorización no proporcionado.');

    const response: any = await phin({
      method: 'POST',
      url: `${this.baseURL}oauth2/token`,
      parse: 'json',
      form: {
        client_id: this.options.id,
        client_secret: this.options.secret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.options.redirectURI,
        scope: this.options.scopes.join(' ')
      }
    });
    if (response.statusCode === 200) {
      let token = response.body;
      token['expireTimestamp'] = Date.now() + token['expires_in'] * 1000 - 10000;
      return jwt.sign(token, this.options.secret, { expiresIn: token['expires_in'] });
    } else
      throw new APIError(response.statusCode);
  }

  /** Obtiene un nuevo token de acceso para el usuario cuyo token de acceso ha caducado. */
  async refreshToken(key: string): Promise<string | void> {
    const access = this.getAccessKey(key);

    try {
      const response: any = await phin({
        url: `${this.baseURL}oauth2/token`,
        method: 'POST',
        parse: 'json',
        form: {
          client_id: this.options.id,
          client_secret: this.options.secret,
          grant_type: 'refresh_token',
          refresh_token: access.refresh_token,
          redirect_uri: this.options.redirectURI,
          scope: this.options.scopes.join(' ')
        }
      });
      if (response.statusCode !== 200)
        throw new APIError(response.statusCode);

      let token = response.body;
      token.expireTimestamp = Date.now() + token['expires_in'] * 1000 - 10000;

      return jwt.sign(token, this.options.secret, { expiresIn: token.expires_in });
    } catch (err: any) {
      throw (err.error
        ? new TypeError(err.error)
        : new APIError(err.phinResponse?.statusCode));
    }
  }

  private getAccessKey(key: string): { access_token: any, token_type: any, refresh_token: any } {
    try {
      const decoded = jwt.verify(key, this.options.secret);

      if (typeof decoded === 'string') {
        throw new Error('Invalid access key');
      }

      return {
        access_token: decoded.access_token,
        token_type: decoded.token_type,
        refresh_token: decoded.refresh_token
      };
    } catch (error) {
      throw error;
    }
  }

  /** Obtiene el usuario que ha autorizado el uso del flujo OAuth2. */
  async getUser(key: string) {
    const access = this.getAccessKey(key);

    try {
      const response: any = await phin({
        url: `${this.baseURL}users/@me`,
        method: 'GET',
        headers: { Authorization: `${access.token_type} ${access.access_token}` },
        parse: 'json'
      });
      if (response.statusCode !== 200)
        throw new APIError(response.statusCode);

      return new User(response.body);
    } catch (err: any) {
      throw (err.error
        ? new TypeError(err.error)
        : new APIError(err['phinResponse']?.statusCode));
    }
  }

  /** Obtiene los servidores de un usuario autorizado. */
  async getGuilds(key: string): Promise<Collection<string, Guild>> {
    const access = this.getAccessKey(key);

    try {
      const response: any = await phin({
        url: `${this.baseURL}users/@me/guilds`,
        method: 'GET',
        headers: { Authorization: `${access.token_type} ${access.access_token}` },
        parse: 'json'
      });
      if (response.statusCode !== 200)
        throw new APIError(response.statusCode);

      const guilds = new Collection<string, Guild>();
      for (const guild of response.body)
        guilds.set(guild.id, new Guild(guild));

      return guilds;
    } catch (err) {
      throw err;
    }
  }

  /** Obtiene las cuentas de terceros conectadas de un usuario autorizado. */
  async getConnections(key: string): Promise<Collection<string, Connection>> {
    const access = this.getAccessKey(key);

    try {
      const response: any = await phin({
        url: `${this.baseURL}users/@me/connections`,
        method: 'GET',
        headers: { Authorization: `${access['token_type']} ${access['access_token']}` },
        parse: 'json'
      });
      if (response.statusCode !== 200)
        throw new APIError(response.statusCode);

      const connections = new Collection<string, Connection>();
      for (const connection of response.body)
        connections.set(connection.id, connection);

      return connections;
    } catch (err: any) {
      throw (err.error
        ? new TypeError(err.error)
        : new APIError(err['phinResponse']?.statusCode));
    }
  }
};

/** Opciones requeridas para el cliente - https://discord.com/developers. */
export interface ClientOptions {
  /** ID de cliente de Discord. */
  id: string;
  /** Secreto de la aplicación Discord. */
  secret: string;
  /** OAuth Redirect URI al que se envía un código de acceso. */
  redirectURI: string;
  /** Scopes para el acceso de clientes. */
  scopes: Scope[];
}