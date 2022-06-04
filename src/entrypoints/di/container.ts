import * as awilix from 'awilix';
import { config } from 'dotenv';
import { ValidateAddressUseCase } from '../../context/address/application/validate_use_case';
import { NominatimAPIRepository } from '../../context/address/infrastructure/nominatim_api_address_repository';
import { LoginUseCase } from '../../context/user/application/login_use_case';
import { MongoDBUserRepository } from '../../context/user/infrastructure/mongodb_user_repository';
import { GetWeatherUseCase } from '../../context/weather/application/get_weather_use_case';
import { TimerWeatherRepository } from '../../context/weather/infrastructure/timer_weather_api_repository';

config();

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
