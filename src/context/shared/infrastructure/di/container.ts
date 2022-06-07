import * as awilix from 'awilix';
import { config } from 'dotenv';
import { ValidateAddressUseCase } from '../../../address/application/validate_address_use_case';
import { NominatimAPIRepository } from '../../../address/infrastructure/nominatim_api_address_repository';
import { LoginUseCase } from '../../../user/application/login_use_case';
import { MongoDBUserRepository } from '../../../user/infrastructure/mongodb_user_repository';
import { GetWeatherUseCase } from '../../../weather/application/get_weather_use_case';
import { TimerWeatherRepository } from '../../../weather/infrastructure/timer_weather_api_repository';

//Charge env file
config({
    path: `${process.cwd()}/env/${process.env.ENV}.env`
});
const container = awilix.createContainer();

container.register({
    userRepository: awilix.asClass(MongoDBUserRepository).singleton(),
    addressRepository: awilix.asClass(NominatimAPIRepository).singleton(),
    weatherRepository: awilix.asClass(TimerWeatherRepository).singleton(),
    loginUseCase: awilix.asClass(LoginUseCase),
    validateAddressUseCase: awilix.asClass(ValidateAddressUseCase),
    getWeatherUseCase: awilix.asClass(GetWeatherUseCase)
});

export const loginUseCase = container.resolve('loginUseCase');
export const validateAddressUseCase = container.resolve('validateAddressUseCase');
export const getWeatherUseCase = container.resolve('getWeatherUseCase');
