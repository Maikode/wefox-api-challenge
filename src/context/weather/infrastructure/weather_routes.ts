import { Express } from 'express';
import { authMiddelware } from '../../shared/infrastructure/middlewares/auth_middleware';
import { getWeatherController } from './get_weather_controller';

export const registerWeatherRoutes = (application: Express) => {
    application.get('/weather', authMiddelware, getWeatherController);
};
