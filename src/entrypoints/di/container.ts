import * as awilix from 'awilix';
import { config } from 'dotenv';
import { LoginUseCase } from '../../context/user/application/login_use_case';
import { MongoDBUserRepository } from '../../context/user/infrastructure/mongodb_user_repository';
config();

const container = awilix.createContainer();

container.register({
    userRepository: awilix.asClass(MongoDBUserRepository).singleton(),
    loginUseCase: awilix.asClass(LoginUseCase)
});

export const loginUseCase = container.resolve('loginUseCase');
