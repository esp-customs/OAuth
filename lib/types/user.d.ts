/** Un usuario de Discord que ha autorizado su aplicación para tener acceso a sus datos. */
import { ImageURLOptions } from '../rest/index';
export default class User {
    /** El nombre de usuario de Discord del usuario. */
    username: string;
    /** El nombre de visualización del usuario. */
    globalName?: string;
    /** La configuración regional del usuario. */
    locale?: string;
    /** Si el usuario ha habilitado la autenticación de 2 factores. */
    isMFAEnabled?: boolean;
    /** El discriminador del usuario (e.g. '0001'). */
    discriminator: string;
    /** El ID de Discord único del usuario. */
    id: string;
    /** El correo electrónico del usuario. */
    email?: string;
    /** Si se ha verificado el correo electrónico del usuario. */
    emailVerified?: boolean;
    /** Las banderas del perfil del usuario. */
    userFlags: string[];
    /** Las banderas públicas del perfil del usuario. */
    publicFlags?: number;
    /** El hash del avatar del usuario. */
    avatarHash?: string;
    /** El hash del banner del usuario. */
    bannerHash?: string;
    /** El color del banner del usuario. */
    accentColor?: number;
    /** El tipo de suscripción premium. */
    premiumType: string;
    /** Si el usuario es un bot de Discord. */
    bot?: boolean;
    /** Si el usuario es un sistema oficial de Discord. */
    system?: boolean;
    /** Datos de decoración del avatar del usuario. */
    avatarDecorationData?: {
        sku_id: string;
        asset: string;
    };
    /** Obtenga la URL del avatar de visualización de un usuario. */
    readonly displayAvatarURL: string;
    /** Obtenga la URL del banner de visualización de un usuario. */
    readonly bannerURL: string;
    /** Etiqueta del usuario (e.g. ! BLD Gobi#0001). */
    readonly tag: string;
    constructor({ username, global_name, locale, mfa_enabled, flags, public_flags, avatar, banner, accent_color, discriminator, id, email, verified, premium_type, bot, system, avatar_decoration_data }: any);
    private buildFlags;
    /** La marca de tiempo de la creación de la cuenta del usuario. */
    get createdTimestamp(): number;
    /** La hora de creación de la cuenta del usuario. */
    get createdAt(): Date;
    /** Obtenga la URL del avatar de un usuario, con opciones. */
    avatarURL(options?: ImageURLOptions): string;
    /** Obtenga la URL del banner de un usuario, con opciones. */
    BannerURL(options?: ImageURLOptions): string;
}
