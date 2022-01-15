/** Una lista de los errores más comunes. */
const errors = new Map<number, string>([
  [400, 'Solicitud no válida realizada'],
  [401, 'Token de acceso no válido'],
  [403, 'No hay suficientes permisos'],
  [404, 'Recurso no encontrado'],
  [405, 'Método no permitido'],
  [429, 'Tienes una tarifa limitada'],
  [502, 'Servidor ocupado, vuelva a intentarlo después de un rato']
]);

export default class APIError extends Error {
  constructor(
    public statusCode: number,
    ...params: any[]) {
    super(...params);

    this.message = errors.get(this.statusCode)
      || this.message
      || 'Ocurrió un error';
  }
};
