export class AddressNotFoundError extends Error {
    constructor() {
        super('Invalid address');
    }
}
