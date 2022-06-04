import express from 'express';
import { registerAddressRoutes } from './entrypoints/routes/address_routes';
import { registerUserRoutes } from './entrypoints/routes/user_routes';
import { registerWeatherRoutes } from './entrypoints/routes/weather_routes';

export const expressApp = express();

//Add json parser
expressApp.use(express.json());

// Register  API routes
registerUserRoutes(expressApp);
registerAddressRoutes(expressApp);
registerWeatherRoutes(expressApp);
