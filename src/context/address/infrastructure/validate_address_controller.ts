import { Request, Response } from 'express';
import { validateAddressUseCase } from '../../shared/infrastructure/di/container';
import { AddressNotFoundError } from '../domain/exceptions/address_not_found';

export const validateAddressController = async (req: Request, res: Response) => {
    const { street, streetNumber, town, postalCode, country } = req.query;
    try {
        const address = await validateAddressUseCase.validate(street, streetNumber, town, postalCode, country);
        res.status(200).send(address).json();
    } catch (error) {
        if (error instanceof AddressNotFoundError) {
            res.status(404).send({ error: error.message }).json();
        } else {
            res.status(500).send('Internal server Error');
        }
    }
};