import { Request, Response } from 'express';
import { AddressNotFound } from '../../context/address/domain/exceptions/address_not_found';
import { validateAddressUseCase } from '../di/container';

export const validateAddressController = async (req: Request, res: Response) => {
    const { street, streetNumber, town, postalCode, country } = req.query;
    try {
        const address = await validateAddressUseCase.validate(street, streetNumber, town, postalCode, country);
        res.status(200).send(address).json();
    } catch (error) {
        if (error instanceof AddressNotFound) {
            res.status(404).send({ error: error.message }).json();
        }
    }
};
