export class UserCredentialsError extends Error {
    constructor() {
        super('Credentials are invalid');
    }
}
