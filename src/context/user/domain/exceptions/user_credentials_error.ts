export class UserCredentialsError extends Error {
    constructor() {
        super('Credentials are invalid');
    }

    error_message() {
        return this.message;
    }
}
