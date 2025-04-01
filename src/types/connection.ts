export default interface Connection {
	/** El ID de la cuenta de terceros. */
	id: string;
	/** El nombre de usuario de la cuenta de terceros. */
	name: string;
	/** El nombre del servicio que proporciona la cuenta de terceros. */
	type: string;
	/** Si el usuario ha revocado esta conexión. */
	revoked?: boolean;
	/** Una matriz de objetos de integración parcial del servidor. */
	integrations?: any[];
	/** Si el usuario ha verificado esta conexión. */
	verified: boolean;
	/** Si el usuario ha habilitado la sincronización de amigos. */
	friend_sync: boolean;
	/** Si mostrar la actividad en la cuenta conectada en Rich Presence. */
	show_activity: boolean;
	/** Si esta conexión tiene un token OAuth2 de terceros correspondiente. */
	two_way_link: boolean;
	/** Visibilidad de esta conexión (0 = oculto, 1 = visible). */
	visibility: number;
}
