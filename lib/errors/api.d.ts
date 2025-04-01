export default class APIError extends Error {
    statusCode: number;
    constructor(statusCode: number, ...params: any[]);
}
