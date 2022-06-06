import { Request, Response } from 'express';
import { loginUseCase } from '../../shared/infrastructure/di/container';
import { UserCredentialsError } from '../domain/exceptions/user_credentials_error';

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await loginUseCase.login(email, password);
        res.status(200).send(result).json();
    } catch (error) {
        if (error instanceof UserCredentialsError) {
            res.status(401).send({ error: error.message }).json();
        } else {
            res.status(500).send('Internal server Error');
        }
    }
};
