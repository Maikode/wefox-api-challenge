import express from 'express';
import morgan from 'morgan';
import { registerAddressRoutes } from './context/address/infrastructure/address_routes';
import { registerUserRoutes } from './context/user/infrastructure/user_routes';
import { registerWeatherRoutes } from './context/weather/infrastructure/weather_routes';

export const expressApp = express();

//Add json parser
expressApp.use(express.json());

//Add call logs
expressApp.use(morgan(':method :url  ----> RESPONSE: [:status] in :response-time ms'));

// Register API routes for resources
registerUserRoutes(expressApp);
registerAddressRoutes(expressApp);
registerWeatherRoutes(expressApp);
