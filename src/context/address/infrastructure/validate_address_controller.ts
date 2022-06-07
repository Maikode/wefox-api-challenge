import { Request, Response } from 'express';
import { validateAddressUseCase } from '../../shared/infrastructure/di/container';
import { AddressNotFoundError } from '../domain/exceptions/address_not_found';

export const validateAddressController = async (req: Request, res: Response) => {
    const { street, streetNumber, town, postalCode, country } = req.query;
    if (!checkBadParams(street, streetNumber, town, postalCode, country)) {
        res.status(400).send({ error: 'There are missing or bad parameters to validate address' });
    } else {
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
    }
};

const checkBadParams = (street: any, streetNumber: any, town: any, postalCode: any, country: any): boolean => {
    if (
        street === undefined ||
        street === '' ||
        streetNumber === undefined ||
        streetNumber === '' ||
        town === undefined ||
        town === '' ||
        postalCode === undefined ||
        postalCode === '' ||
        country === undefined ||
        country === ''
    ) {
        return false;
    }
    return true;
};
