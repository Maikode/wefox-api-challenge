import { Request, Response } from 'express';
import { getWeatherUseCase } from '../di/container';

export const getWeatherController = async (req: Request, res: Response) => {
    const { lat, lon } = req.body;
    const weather = await getWeatherUseCase.get(lat, lon);
    res.status(200).send(weather);
};
