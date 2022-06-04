import { Address } from './address';

export interface AddressRepository {
    findOne(
        street: string,
        streetNumber: string,
        town: string,
        postalCode: string,
        country: string
    ): Promise<Address | null>;
}
