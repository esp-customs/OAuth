export default interface Connection {
  /** El ID de la cuenta de terceros. */
  id: string;
  /** El nombre de usuario de la cuenta de terceros. */
  name: string;
  /** El nombre del servicio que proporciona la cuenta de terceros. */
  service: string;
  /** Si el usuario ha revocado esta conexión. */
  isRevoked: string;
  /** Si el usuario ha verificado esta conexión. */
  isVerified: string;
  /** Si el usuario ha habilitado la sincronización de amigos. */
  friendSync: string;
  /** Si mostrar la actividad en la cuenta conectada en Rich Presence. */
  showActivity: string;
  /** Si la cuenta es visible en el perfil del usuario. */
  isPublic: string;
  /** Una matriz de objetos de integración. */
  integrations: string;
}
