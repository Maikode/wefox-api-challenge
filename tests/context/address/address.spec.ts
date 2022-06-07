import { config } from 'dotenv';
import { ValidateAddressUseCase } from '../../../src/context/address/application/validate_address_use_case';
import { Address } from '../../../src/context/address/domain/address';
import { AddressNotFoundError } from '../../../src/context/address/domain/exceptions/address_not_found';
import { AddressRepositoryMocked } from './__mocks__/user_repository_mock';

describe('User context testing', () => {
    let address_repository_mocked: AddressRepositoryMocked;
    let validate_address_use_case: ValidateAddressUseCase;

    //Use default dev env file as test env
    config({
        path: `${process.cwd()}/env/dev.env`
    });

    beforeEach(() => {
        address_repository_mocked = new AddressRepositoryMocked();
        validate_address_use_case = new ValidateAddressUseCase({ addressRepository: address_repository_mocked });
    });

    it('Validate correct address and get lat-lon coords', async () => {
        //Create an address with values
        const address_to_return = new Address('street 1', '12', 'Madrid', 'Spain', '30044', 45.0, -6.0);
        address_repository_mocked.findOneReturnAddress(address_to_return);

        //call validate address use case
        const result: any = await validate_address_use_case.validate('street 1', '12', 'Madrid', 'Spain', '30044');
        expect(result instanceof Address).toBeTruthy();
        expect(result.lat).toBeDefined();
        expect(result.lat).toEqual(45.0);
        expect(result.lon).toBeDefined();
        expect(result.lon).toEqual(-6.0);
    });

    it('Address not valid', async () => {
        address_repository_mocked.findOneReturnAddress(null);

        //call validate address use case
        await expect(validate_address_use_case.validate('street 1', '12', 'Madrid', 'Spain', '30044')).rejects.toThrow(AddressNotFoundError);
    });
});
