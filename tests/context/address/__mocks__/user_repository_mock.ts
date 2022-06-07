import 'jest';
import { Address } from '../../../../src/context/address/domain/address';
import { AddressRepository } from '../../../../src/context/address/domain/address_repository';

export class AddressRepositoryMocked implements AddressRepository {
    findOneMocked = jest.fn();
    async findOne(email: string): Promise<Address | null> {
        return await this.findOneMocked();
    }

    findOneReturnAddress = (addressMocked: Address | null) => {
        return this.findOneMocked.mockReturnValue(addressMocked);
    };
}
