import { Express } from 'express';
import { getWeatherController } from '../controllers/get_weather_controller';
import { authMiddelware } from '../middlewares/auth_middleware';

export const registerWeatherRoutes = (application: Express) => {
    application.get('/weather', authMiddelware, getWeatherController);
};
