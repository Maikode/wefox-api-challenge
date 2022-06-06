import { Express } from 'express';
import { validateAddressController } from './validate_address_controller';

export const registerAddressRoutes = (application: Express) => {
    application.get('/address', validateAddressController);
};
