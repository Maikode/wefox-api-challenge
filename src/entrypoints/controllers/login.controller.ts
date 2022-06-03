import { Request, Response } from 'express';
import { loginUseCase } from '../di/container';

export const loginController = async (req: Request, res: Response) => {
    console.log('Ejecutando controller');
    const { email, password } = req.body;
    const result = await loginUseCase.login(email, password);
    res.status(200).send(result).json();
};
