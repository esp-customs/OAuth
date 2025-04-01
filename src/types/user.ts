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

	constructor({ username, global_name = undefined, locale = undefined, mfa_enabled = undefined, flags = 0, public_flags = undefined, avatar = null, banner = null, accent_color = undefined, discriminator, id, email = undefined, verified = undefined, premium_type = 0, bot = false, system = false, avatar_decoration_data = undefined }: any) {
		this.username = username;
		this.globalName = global_name;
		this.locale = locale;
		this.isMFAEnabled = mfa_enabled;
		this.discriminator = parseInt(discriminator).toString().padStart(4, '0');
		this.id = id;
		this.email = email;
		this.emailVerified = verified;
		this.avatarHash = avatar;
		this.bannerHash = banner;
		this.accentColor = accent_color;
		this.userFlags = [];
		this.publicFlags = public_flags;
		this.premiumType = premium_type === 0 ? 'None' : premium_type === 1 ? 'Nitro Classic' : premium_type === 2 ? 'Nitro' : 'Nitro Basic';
		this.bot = bot;
		this.system = system;
		this.avatarDecorationData = avatar_decoration_data;
		this.displayAvatarURL = this.avatarURL({ forceStatic: false, size: 256 });
		this.bannerURL = this.BannerURL({ forceStatic: false, size: 1024 });
		this.tag = `${this.username}#${this.discriminator}`;

		this.buildFlags(flags);
	}

	private buildFlags(flags: number) {
		if ((flags & 1) === 1) this.userFlags.push('Discord Employee');
		if ((flags & 2) === 2) this.userFlags.push('Discord Partner');
		if ((flags & 4) === 4) this.userFlags.push('HypeSquad Events');
		if ((flags & 8) === 8) this.userFlags.push('Bug Hunter Level 1');
		if ((flags & 64) === 64) this.userFlags.push('HypeSquad House of Bravery');
		else if ((flags & 128) === 128) this.userFlags.push('HypeSquad House of Brilliance');
		else if ((flags & 256) === 256) this.userFlags.push('HypeSquad House of Balance');
		if ((flags & 512) === 512) this.userFlags.push('Early Supporter');
		if ((flags & 1024) === 1024) this.userFlags.push('Team User');
		if ((flags & 4096) === 4096) this.userFlags.push('System');
		if ((flags & 16384) === 16384) this.userFlags.push('Bug Hunter Level 2');
		if ((flags & 131072) === 131072) this.userFlags.push('Verified Bot Developer');
		if ((flags & 262144) === 262144) this.userFlags.push('Certified Moderator');
		if ((flags & 524288) === 524288) this.userFlags.push('Bot HTTP Interactions');
		if ((flags & 4194304) === 4194304) this.userFlags.push('Active Developer');
	}

	/** La marca de tiempo de la creación de la cuenta del usuario. */
	get createdTimestamp() {
		return parseInt((BigInt(this.id) >> BigInt(22)).toString()) + 1420070400000;
	}
	/** La hora de creación de la cuenta del usuario. */
	get createdAt() {
		return new Date(this.createdTimestamp);
	}

	/** Obtenga la URL del avatar de un usuario, con opciones. */
	avatarURL(options: ImageURLOptions = { size: 512 }): string {
		const extension = this.avatarHash?.startsWith('a_') && !options.forceStatic ? 'gif' : 'webp';
		return `https://cdn.discordapp.com/${this.avatarHash ? '' : 'embed/'}avatars/${this.avatarHash ? `${this.id}/${this.avatarHash}` : parseInt(this.discriminator) % 5}.${this.avatarHash ? extension : 'webp'}?size=${options.size}`;
	}
	/** Obtenga la URL del banner de un usuario, con opciones. */
	BannerURL(options: ImageURLOptions = { size: 512 }): string {
		const extension = this.bannerHash?.startsWith('a_') && !options.forceStatic ? 'gif' : 'png';
		return `https://cdn.discordapp.com/${this.bannerHash ? '' : 'embed/'}banners/${this.bannerHash ? `${this.id}/${this.bannerHash}` : parseInt(this.discriminator) % 5}.${this.bannerHash ? extension : 'png'}?size=${options.size}`;
	}
}
