const permissionConstants = {
  1: 'CREATE_INSTANT_INVITE',
  2: 'KICK_MEMBERS',
  4: 'BAN_MEMBERS',
  8: 'ADMINISTRATOR',
  0x10: 'MANAGE_CHANNELS',
  0x20: 'MANAGE_GUILD',
  0x40: 'ADD_REACTION',
  0x80: 'VIEW_AUDIT_LOG',
  0x100: 'PRIORITY_SPEAKER',
  0x200: 'STREAM',
  0x400: 'VIEW_CHANNEL',
  0x800: 'SEND_MESSAGES',
  0x1000: 'SEND_TTS_MESSAGES',
  0x2000: 'MANAGE_MESSAGES',
  0x4000: 'EMBED_LINKS',
  0x8000: 'ATTACH_FILES',
  0x10000: 'READ_MESSAGES_HISTORY',
  0x20000: 'MENTION_EVERYONE',
  0x40000: 'USE_EXTERNAL_EMOJIS',
  0x80000: 'VIEW_GUILD_INSIGHTS',
  0x100000: 'CONNECT',
  0x200000: 'SPEAK',
  0x400000: 'MUTE_MEMBERS',
  0x800000: 'DEAFEN_MEMBERS',
  0x1000000: 'MOVE_MEMBERS',
  0x2000000: 'USE_VAD',
  0x4000000: 'CHANGE_NICKNAME',
  0x8000000: 'MANAGE_NICKNAMES',
  0x10000000: 'MANAGE_ROLES',
  0x20000000: 'MANAGE_WEBHOOKS',
  0x40000000: 'MANAGE_GUILD_EXPRESSIONS',
  0x80000000: 'USE_APPLICATION_COMMANDS',
  0x100000000: 'REQUEST_TO_SPEAK',
  0x200000000: 'MANAGE_EVENTS',
  0x400000000: 'MANAGE_THREADS',
  0x800000000: 'CREATE_PUBLIC_THREADS',
  0x1000000000: 'CREATE_PRIVATE_THREADS',
  0x2000000000: 'USE_EXTERNAL_STICKERS',
  0x4000000000: 'SEND_MESSAGES_IN_THREADS',
  0x8000000000: 'USE_EMBEDDED_ACTIVITIES',
  0x10000000000: 'MODERATE_MEMBERS',
  0x20000000000: 'VIEW_CREATOR_MONETIZATION_ANALYTICS',
  0x40000000000: 'USE_SOUNDBOARD',
  0x80000000000: 'CREATE_GUILD_EXPRESSIONS',
  0x100000000000: 'CREATE_EVENTS',
  0x200000000000: 'USE_EXTERNAL_SOUNDS',
  0x400000000000: 'SEND_VOICE_MESSAGES',
};

export default class Guild {
	/** El ID de Discord único del servidor. */
	readonly id: string;
	/** Nombre del servidor. */
	readonly name: string;
	/** El hash del icono del servidor.The guild's icon hash. */
	readonly iconHash: string;
	/** El hash del banner del servidor. */
	readonly bannerHash: string;
	/** Si el usuario autorizado es el dueño del servidor. */
	readonly isOwner: boolean;
	/** Una lista de permisos que tiene el usuario autorizado en este servidor. */
	readonly permissions: string[];
	/** Una lista de las funciones habilitadas para discord del servidor. */
	readonly features: string[];
	/** El número aproximado de miembros en el servidor. */
	readonly approximateMemberCount: number;
	/** El número aproximado de miembros en línea en el servidor. */
	readonly approximatePresenceCount: number;

	/** La marca de tiempo de creación de la cuenta del usuario. */
	get createdTimestamp() {
		return parseInt((BigInt(this.id) >> BigInt(22)).toString()) + 1420070400000;
	}
	/** La hora de creación de la cuenta del usuario. */
	get createdAt() {
		return new Date(this.createdTimestamp);
	}

	constructor({ id, name, icon, banner, owner = false, permissions = 0, features = [], approximate_member_count = 0, approximate_presence_count = 0 }: any) {
		this.id = id;
		this.name = name;
		this.iconHash = icon;
		this.bannerHash = banner;
		this.isOwner = owner;
		this.permissions = this.parsePermissions(permissions);
		this.features = features;
		this.approximateMemberCount = approximate_member_count;
		this.approximatePresenceCount = approximate_presence_count;
	}

	private parsePermissions(perms: number) {
		const p = [];
		for (let c in permissionConstants) {
			let permNum = parseInt(c);
			if ((permNum & perms) === permNum) p.push(permissionConstants[permNum]);
		}
		return p;
	}

	/**
	 * Devuelve una URL al icono del servidor.
	 * @param size El tamaño del icono en píxeles. (Predeterminado a 512)
	 */
	iconUrl(size = 512): string {
		return this.iconHash ? `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.${this.iconHash.startsWith('a_') ? 'gif' : 'png'}?size=${size}` : 'https://i.imgur.com/rdvO6lD.png';
	}
}
