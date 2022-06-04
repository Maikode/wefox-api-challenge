export class NotAuthorizedError extends Error {
    constructor() {
        super('Not authorized. Invalid token');
    }
}
