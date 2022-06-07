import { Address } from '../domain/address';
import { AddressRepository } from '../domain/address_repository';
import { AddressNotFoundError } from '../domain/exceptions/address_not_found';
export class ValidateAddressUseCase {
    addressRepository: AddressRepository;

    constructor(dependencies: { addressRepository: AddressRepository }) {
        this.addressRepository = dependencies.addressRepository;
    }

    async validate(street: string, streetNumber: string, town: string, postalCode: string, country: string): Promise<Address | null> {
        const address: Address | null = await this.addressRepository.findOne(street, streetNumber, town, postalCode, country);
        if (!address) {
            throw new AddressNotFoundError();
        }
        return address;
    }
}
