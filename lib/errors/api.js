"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Una lista de los errores más comunes. */
const errors = new Map([
    [400, 'Solicitud no válida realizada'],
    [401, 'Token de acceso no válido'],
    [403, 'No hay suficientes permisos'],
    [404, 'Recurso no encontrado'],
    [405, 'Método no permitido'],
    [429, 'Tienes una tarifa limitada'],
    [502, 'Servidor ocupado, vuelva a intentarlo después de un rato']
]);
class APIError extends Error {
    statusCode;
    constructor(statusCode, ...params) {
        super(...params);
        this.statusCode = statusCode;
        this.message = errors.get(this.statusCode)
            || this.message
            || 'Ocurrió un error';
    }
}
exports.default = APIError;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFDNUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQWlCO0lBQ3JDLENBQUMsR0FBRyxFQUFFLCtCQUErQixDQUFDO0lBQ3RDLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDO0lBQ2xDLENBQUMsR0FBRyxFQUFFLDZCQUE2QixDQUFDO0lBQ3BDLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDO0lBQzlCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDO0lBQzVCLENBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDO0lBQ25DLENBQUMsR0FBRyxFQUFFLDBEQUEwRCxDQUFDO0NBQ2xFLENBQUMsQ0FBQztBQUVILE1BQXFCLFFBQVMsU0FBUSxLQUFLO0lBRWhDO0lBRFQsWUFDUyxVQUFrQixFQUN6QixHQUFHLE1BQWE7UUFDaEIsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFGVixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBSXpCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2VBQ3JDLElBQUksQ0FBQyxPQUFPO2VBQ1osa0JBQWtCLENBQUM7SUFDMUIsQ0FBQztDQUNGO0FBVkQsMkJBVUM7QUFBQSxDQUFDIn0=