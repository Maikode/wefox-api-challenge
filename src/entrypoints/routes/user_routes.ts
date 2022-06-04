import { Express } from 'express';
import { loginController } from '../controllers/login_controller';

export const registerUserRoutes = (application: Express) => {
    application.post('/login', loginController);
};
