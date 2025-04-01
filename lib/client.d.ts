import User from './types/user';
import Guild from './types/guild';
import Connection from './types/connection';
import { Collection } from '@discordjs/collection';
export type Scope = 'activities.read' | 'activities.write' | 'applications.builds.upload' | 'applications.builds.read' | 'applications.commands' | 'applications.commands.update' | 'applications.commands.permissions.update' | 'applications.entitlements' | 'applications.store.update' | 'bot' | 'connections' | 'dm_channels.read' | 'email' | 'gdm.join' | 'guilds' | 'guilds.join' | 'guilds.members.read' | 'identify' | 'messages.read' | 'relationships.read' | 'role_connections.write' | 'rpc' | 'rpc.activities.write' | 'rpc.notifications.read' | 'rpc.voice.read' | 'rpc.voice.write' | 'voice' | 'webhook.incoming';
export declare class Client {
    private options;
    private baseURL;
    /** Cree un nuevo cliente OAuth2. */
    constructor(options: ClientOptions);
    /** Genera un enlace de código de autorización según los ámbitos y el conjunto de URI de redirección. */
    get authCodeLink(): {
        url: string;
        state: string;
    };
    /** Obtiene el token de acceso para que el usuario realice más funciones. */
    getAccess(code: string): Promise<string>;
    /** Obtiene un nuevo token de acceso para el usuario cuyo token de acceso ha caducado. */
    refreshToken(key: string): Promise<string | void>;
    private getAccessKey;
    /** Obtiene el usuario que ha autorizado el uso del flujo OAuth2. */
    getUser(key: string): Promise<User>;
    /** Obtiene los servidores de un usuario autorizado. */
    getGuilds(key: string): Promise<Collection<string, Guild>>;
    /** Obtiene las cuentas de terceros conectadas de un usuario autorizado. */
    getConnections(key: string): Promise<Collection<string, Connection>>;
}
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
