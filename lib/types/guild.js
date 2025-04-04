"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class Guild {
    /** El ID de Discord único del servidor. */
    id;
    /** Nombre del servidor. */
    name;
    /** El hash del icono del servidor.The guild's icon hash. */
    iconHash;
    /** El hash del banner del servidor. */
    bannerHash;
    /** Si el usuario autorizado es el dueño del servidor. */
    isOwner;
    /** Una lista de permisos que tiene el usuario autorizado en este servidor. */
    permissions;
    /** Una lista de las funciones habilitadas para discord del servidor. */
    features;
    /** El número aproximado de miembros en el servidor. */
    approximateMemberCount;
    /** El número aproximado de miembros en línea en el servidor. */
    approximatePresenceCount;
    /** La marca de tiempo de creación de la cuenta del usuario. */
    get createdTimestamp() {
        return parseInt((BigInt(this.id) >> BigInt(22)).toString()) + 1420070400000;
    }
    /** La hora de creación de la cuenta del usuario. */
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    constructor({ id, name, icon, banner, owner = false, permissions = 0, features = [], approximate_member_count = 0, approximate_presence_count = 0 }) {
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
    parsePermissions(perms) {
        const p = [];
        for (let c in permissionConstants) {
            let permNum = parseInt(c);
            if ((permNum & perms) === permNum)
                p.push(permissionConstants[permNum]);
        }
        return p;
    }
    /**
     * Devuelve una URL al icono del servidor.
     * @param size El tamaño del icono en píxeles. (Predeterminado a 512)
     */
    iconUrl(size = 512) {
        return this.iconHash ? `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.${this.iconHash.startsWith('a_') ? 'gif' : 'png'}?size=${size}` : 'https://i.imgur.com/rdvO6lD.png';
    }
}
exports.default = Guild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvZ3VpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLG1CQUFtQixHQUFHO0lBQzFCLENBQUMsRUFBRSx1QkFBdUI7SUFDMUIsQ0FBQyxFQUFFLGNBQWM7SUFDakIsQ0FBQyxFQUFFLGFBQWE7SUFDaEIsQ0FBQyxFQUFFLGVBQWU7SUFDbEIsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixJQUFJLEVBQUUsY0FBYztJQUNwQixJQUFJLEVBQUUsY0FBYztJQUNwQixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLEtBQUssRUFBRSxrQkFBa0I7SUFDekIsS0FBSyxFQUFFLFFBQVE7SUFDZixLQUFLLEVBQUUsY0FBYztJQUNyQixLQUFLLEVBQUUsZUFBZTtJQUN0QixNQUFNLEVBQUUsbUJBQW1CO0lBQzNCLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsTUFBTSxFQUFFLGFBQWE7SUFDckIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsT0FBTyxFQUFFLHVCQUF1QjtJQUNoQyxPQUFPLEVBQUUsa0JBQWtCO0lBQzNCLE9BQU8sRUFBRSxxQkFBcUI7SUFDOUIsT0FBTyxFQUFFLHFCQUFxQjtJQUM5QixRQUFRLEVBQUUsU0FBUztJQUNuQixRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsY0FBYztJQUN4QixRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLFNBQVMsRUFBRSxjQUFjO0lBQ3pCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFNBQVMsRUFBRSxpQkFBaUI7SUFDNUIsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QixVQUFVLEVBQUUsY0FBYztJQUMxQixVQUFVLEVBQUUsaUJBQWlCO0lBQzdCLFVBQVUsRUFBRSwwQkFBMEI7SUFDdEMsVUFBVSxFQUFFLDBCQUEwQjtJQUN0QyxXQUFXLEVBQUUsa0JBQWtCO0lBQy9CLFdBQVcsRUFBRSxlQUFlO0lBQzVCLFdBQVcsRUFBRSxnQkFB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