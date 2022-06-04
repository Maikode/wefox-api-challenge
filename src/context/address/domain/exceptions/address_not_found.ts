export class AddressNotFound extends Error {
    constructor() {
        super('Invalid address, there are missing or bad parameters');
    }
}
