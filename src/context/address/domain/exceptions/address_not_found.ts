export class AddressNotFoundError extends Error {
    constructor() {
        super('Invalid address, there are missing or bad parameters');
    }
}
