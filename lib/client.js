"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const phin_1 = __importDefault(require("phin"));
const user_1 = __importDefault(require("./types/user"));
const api_1 = __importDefault(require("./errors/api"));
const guild_1 = __importDefault(require("./types/guild"));
const collection_1 = require("@discordjs/collection");
const crypto_1 = __importDefault(require("crypto"));
class Client {
    options;
    baseURL = 'https://discord.com/api/';
    /** Cree un nuevo cliente OAuth2. */
    constructor(options) {
        this.options = options;
    }
    /** Genera un enlace de código de autorización según los ámbitos y el conjunto de URI de redirección. */
    get authCodeLink() {
        if (this.options.scopes.length > 0) {
            let state = crypto_1.default.randomBytes(16).toString('hex');
            return {
                url: `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${this.options.id}&scope=${this.options.scopes.join('%20')}&state=${state}&redirect_uri=${this.options.redirectURI}&prompt=none`,
                state
            };
        }
        else if (this.options.scopes.length < 1)
            throw new TypeError('Scopes are not defined.');
    }
    /** Obtiene el token de acceso para que el usuario realice más funciones. */
    async getAccess(code) {
        if (!code)
            throw new TypeError('Código de autorización no proporcionado.');
        const response = await (0, phin_1.default)({
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
            return jsonwebtoken_1.default.sign(token, this.options.secret, { expiresIn: token['expires_in'] });
        }
        else
            throw new api_1.default(response.statusCode);
    }
    /** Obtiene un nuevo token de acceso para el usuario cuyo token de acceso ha caducado. */
    async refreshToken(key) {
        const access = this.getAccessKey(key);
        try {
            const response = await (0, phin_1.default)({
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
                throw new api_1.default(response.statusCode);
            let token = response.body;
            token.expireTimestamp = Date.now() + token['expires_in'] * 1000 - 10000;
            return jsonwebtoken_1.default.sign(token, this.options.secret, { expiresIn: token.expires_in });
        }
        catch (err) {
            throw (err.error
                ? new TypeError(err.error)
                : new api_1.default(err.phinResponse?.statusCode));
        }
    }
    getAccessKey(key) {
        try {
            const decoded = jsonwebtoken_1.default.verify(key, this.options.secret);
            if (typeof decoded === 'string') {
                throw new Error('Invalid access key');
            }
            return {
                access_token: decoded.access_token,
                token_type: decoded.token_type,
                refresh_token: decoded.refresh_token
            };
        }
        catch (error) {
            throw error;
        }
    }
    /** Obtiene el usuario que ha autorizado el uso del flujo OAuth2. */
    async getUser(key) {
        const access = this.getAccessKey(key);
        try {
            const response = await (0, phin_1.default)({
                url: `${this.baseURL}users/@me`,
                method: 'GET',
                headers: { Authorization: `${access.token_type} ${access.access_token}` },
                parse: 'json'
            });
            if (response.statusCode !== 200)
                throw new api_1.default(response.statusCode);
            return new user_1.default(response.body);
        }
        catch (err) {
            throw (err.error
                ? new TypeError(err.error)
                : new api_1.default(err['phinResponse']?.statusCode));
        }
    }
    /** Obtiene los servidores de un usuario autorizado. */
    async getGuilds(key) {
        const access = this.getAccessKey(key);
        try {
            const response = await (0, phin_1.default)({
                url: `${this.baseURL}users/@me/guilds`,
                method: 'GET',
                headers: { Authorization: `${access.token_type} ${access.access_token}` },
                parse: 'json'
            });
            if (response.statusCode !== 200)
                throw new api_1.default(response.statusCode);
            const guilds = new collection_1.Collection();
            for (const guild of response.body)
                guilds.set(guild.id, new guild_1.default(guild));
            return guilds;
        }
        catch (err) {
            throw err;
        }
    }
    /** Obtiene las cuentas de terceros conectadas de un usuario autorizado. */
    async getConnections(key) {
        const access = this.getAccessKey(key);
        try {
            const response = await (0, phin_1.default)({
                url: `${this.baseURL}users/@me/connections`,
                method: 'GET',
                headers: { Authorization: `${access['token_type']} ${access['access_token']}` },
                parse: 'json'
            });
            if (response.statusCode !== 200)
                throw new api_1.default(response.statusCode);
            const connections = new collection_1.Collection();
            for (const connection of response.body)
                connections.set(connection.id, connection);
            return connections;
        }
        catch (err) {
            throw (err.error
                ? new TypeError(err.error)
                : new api_1.default(err['phinResponse']?.statusCode));
        }
    }
}
exports.Client = Client;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRUFBK0I7QUFDL0IsZ0RBQXdCO0FBQ3hCLHdEQUFnQztBQUNoQyx1REFBb0M7QUFDcEMsMERBQWtDO0FBRWxDLHNEQUFtRDtBQUNuRCxvREFBNEI7QUFJNUIsTUFBYSxNQUFNO0lBSUc7SUFIWixPQUFPLEdBQUcsMEJBQTBCLENBQUM7SUFFN0Msb0NBQW9DO0lBQ3BDLFlBQW9CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7SUFBSSxDQUFDO0lBRS9DLHdHQUF3RztJQUN4RyxJQUFJLFlBQVk7UUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNuQyxJQUFJLEtBQUssR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkQsT0FBTztnQkFDTCxHQUFHLEVBQUUseUVBQXlFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLGlCQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsY0FBYztnQkFDNU0sS0FBSzthQUNOLENBQUM7UUFDSixDQUFDO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUN2QyxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQVk7UUFDMUIsSUFBSSxDQUFDLElBQUk7WUFDUCxNQUFNLElBQUksU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFF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