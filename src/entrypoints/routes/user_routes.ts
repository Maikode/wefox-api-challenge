import { Express } from 'express';
import { loginController } from '../controllers/login.controller';

export const registerUserRoutes = (application: Express) => {
    application.use('/login', loginController);
};
