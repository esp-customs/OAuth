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
    get createdTimestamp(): number;
    /** La hora de creación de la cuenta del usuario. */
    get createdAt(): Date;
    constructor({ id, name, icon, banner, owner, permissions, features, approximate_member_count, approximate_presence_count }: any);
    private parsePermissions;
    /**
     * Devuelve una URL al icono del servidor.
     * @param size El tamaño del icono en píxeles. (Predeterminado a 512)
     */
    iconUrl(size?: number): string;
}
