import express from 'express';
import { registerUserRoutes } from './entrypoints/routes/user_routes';

export const expressApp = express();

//Add json parser
expressApp.use(express.json());

// Register  API routes
registerUserRoutes(expressApp);
