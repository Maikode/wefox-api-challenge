import * as awilix from 'awilix';
import { config } from 'dotenv';
import { ValidateAddressUseCase } from '../../context/address/application/validate_use_case';
import { NominatimAPIRepository } from '../../context/address/infrastructure/nominatim_api_address_repository';
import { LoginUseCase } from '../../context/user/application/login_use_case';
import { MongoDBUserRepository } from '../../context/user/infrastructure/mongodb_user_repository';

config();

const container = awilix.createContainer();

container.register({
    userRepository: awilix.asClass(MongoDBUserRepository).singleton(),
    addressRepository: awilix.asClass(NominatimAPIRepository).singleton(),
    loginUseCase: awilix.asClass(LoginUseCase),
    validateAddressUseCase: awilix.asClass(ValidateAddressUseCase)
});

export const loginUseCase = container.resolve('loginUseCase');
export const validateAddressUseCase = container.resolve('validateAddressUseCase');
