import { Request, Response } from 'express';
import { UserCredentialsError } from '../../context/user/domain/exceptions/user_credentials_error';
import { loginUseCase } from '../di/container';

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await loginUseCase.login(email, password);
        res.status(200).send(result).json();
    } catch (error) {
        if (error instanceof UserCredentialsError) {
            res.status(401).send({ error: error.error_message() }).json();
        }
    }
};
