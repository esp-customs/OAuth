"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    /** El nombre de usuario de Discord del usuario. */
    username;
    /** El nombre de visualización del usuario. */
    globalName;
    /** La configuración regional del usuario. */
    locale;
    /** Si el usuario ha habilitado la autenticación de 2 factores. */
    isMFAEnabled;
    /** El discriminador del usuario (e.g. '0001'). */
    discriminator;
    /** El ID de Discord único del usuario. */
    id;
    /** El correo electrónico del usuario. */
    email;
    /** Si se ha verificado el correo electrónico del usuario. */
    emailVerified;
    /** Las banderas del perfil del usuario. */
    userFlags;
    /** Las banderas públicas del perfil del usuario. */
    publicFlags;
    /** El hash del avatar del usuario. */
    avatarHash;
    /** El hash del banner del usuario. */
    bannerHash;
    /** El color del banner del usuario. */
    accentColor;
    /** El tipo de suscripción premium. */
    premiumType;
    /** Si el usuario es un bot de Discord. */
    bot;
    /** Si el usuario es un sistema oficial de Discord. */
    system;
    /** Datos de decoración del avatar del usuario. */
    avatarDecorationData;
    /** Obtenga la URL del avatar de visualización de un usuario. */
    displayAvatarURL;
    /** Obtenga la URL del banner de visualización de un usuario. */
    bannerURL;
    /** Etiqueta del usuario (e.g. ! BLD Gobi#0001). */
    tag;
    constructor({ username, global_name = undefined, locale = undefined, mfa_enabled = undefined, flags = 0, public_flags = undefined, avatar = null, banner = null, accent_color = undefined, discriminator, id, email = undefined, verified = undefined, premium_type = 0, bot = false, system = false, avatar_decoration_data = undefined }) {
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
    buildFlags(flags) {
        if ((flags & 1) === 1)
            this.userFlags.push('Discord Employee');
        if ((flags & 2) === 2)
            this.userFlags.push('Discord Partner');
        if ((flags & 4) === 4)
            this.userFlags.push('HypeSquad Events');
        if ((flags & 8) === 8)
            this.userFlags.push('Bug Hunter Level 1');
        if ((flags & 64) === 64)
            this.userFlags.push('HypeSquad House of Bravery');
        else if ((flags & 128) === 128)
            this.userFlags.push('HypeSquad House of Brilliance');
        else if ((flags & 256) === 256)
            this.userFlags.push('HypeSquad House of Balance');
        if ((flags & 512) === 512)
            this.userFlags.push('Early Supporter');
        if ((flags & 1024) === 1024)
            this.userFlags.push('Team User');
        if ((flags & 4096) === 4096)
            this.userFlags.push('System');
        if ((flags & 16384) === 16384)
            this.userFlags.push('Bug Hunter Level 2');
        if ((flags & 131072) === 131072)
            this.userFlags.push('Verified Bot Developer');
        if ((flags & 262144) === 262144)
            this.userFlags.push('Certified Moderator');
        if ((flags & 524288) === 524288)
            this.userFlags.push('Bot HTTP Interactions');
        if ((flags & 4194304) === 4194304)
            this.userFlags.push('Active Developer');
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
    avatarURL(options = { size: 512 }) {
        const extension = this.avatarHash?.startsWith('a_') && !options.forceStatic ? 'gif' : 'webp';
        return `https://cdn.discordapp.com/${this.avatarHash ? '' : 'embed/'}avatars/${this.avatarHash ? `${this.id}/${this.avatarHash}` : parseInt(this.discriminator) % 5}.${this.avatarHash ? extension : 'webp'}?size=${options.size}`;
    }
    /** Obtenga la URL del banner de un usuario, con opciones. */
    BannerURL(options = { size: 512 }) {
        const extension = this.bannerHash?.startsWith('a_') && !options.forceStatic ? 'gif' : 'png';
        return `https://cdn.discordapp.com/${this.bannerHash ? '' : 'embed/'}banners/${this.bannerHash ? `${this.id}/${this.bannerHash}` : parseInt(this.discriminator) % 5}.${this.bannerHash ? extension : 'png'}?size=${options.size}`;
    }
}
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsTUFBcUIsSUFBSTtJQUN4QixtREFBbUQ7SUFDbkQsUUFBUSxDQUFTO0lBQ2pCLDhDQUE4QztJQUM5QyxVQUFVLENBQVU7SUFDcEIsNkNBQTZDO0lBQzdDLE1BQU0sQ0FBVTtJQUNoQixrRUFBa0U7SUFDbEUsWUFBWSxDQUFXO0lBQ3ZCLGtEQUFrRDtJQUNsRCxhQUFhLENBQVM7SUFDdEIsMENBQTBDO0lBQzFDLEVBQUUsQ0FBUztJQUNYLHlDQUF5QztJQUN6QyxLQUFLLENBQVU7SUFDZiw2REFBNkQ7SUFDN0QsYUFBYSxDQUFXO0lBQ3hCLDJDQUEyQztJQUMzQyxTQUFTLENBQVc7SUFDcEIsb0RBQW9EO0lBQ3BELFdBQVcsQ0FBVTtJQUNyQixzQ0FBc0M7SUFDdEMsVUFBVSxDQUFVO0lBQ3BCLHNDQUFzQztJQUN0QyxVQUFVLENBQVU7SUFDcEIsdUNBQXVDO0lBQ3ZDLFdBQVcsQ0FBVTtJQUNyQixzQ0FBc0M7SUFDdEMsV0FBVyxDQUFTO0lBQ3BCLDBDQUEwQztJQUMxQyxHQUFHLENBQVc7SUFDZCxzREFBc0Q7SUFDdEQsTUFBTSxDQUFXO0lBQ2pCLGtEQUFrRDtJQUNsRCxvQkFBb0IsQ0FHbEI7SUFDRixnRUFBZ0U7SUFDdkQsZ0JBQWdCLENBQVM7SUFDbEMsZ0VBQWdFO0lBQ3ZELFNBQVMsQ0FBUztJQUMzQixtREFBbUQ7SUFDMUMsR0FBRyxDQUFTO0lBRXJCLFlBQVksRUFBRSxRQUFRLEVBQUUsV0FBVyxHQUFHLFNBQVMsRUFBRSxNQUFNLEdBQUcsU0FBUyxFQUFFLFdBQVcsR0FBRyxTQUFTLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxZQUFZLEdBQUcsU0FBUyxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBRSxZQUFZLEdBQUcsU0FBUyxFQUFFLGFBQWEsRUFB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QUU7UUFDakQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM1RixPQUFPLDhCQUE4QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsV0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbk8sQ0FBQztDQUNEO0FBM0dELHVCQTJHQyJ9