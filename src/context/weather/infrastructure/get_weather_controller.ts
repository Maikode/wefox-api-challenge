import { Request, Response } from 'express';
import { getWeatherUseCase } from '../../shared/infrastructure/di/container';
import { WeatherNotFoundError } from '../domain/exceptions/weather_not_found';

export const getWeatherController = async (req: Request, res: Response) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    if (!checkCoordinates(lat, lon)) {
        res.status(400).send({ error: 'Invalid lat-lon coordinates format' });
    } else {
        try {
            const weather = await getWeatherUseCase.get(lat, lon);
            res.status(200).send(weather);
        } catch (error) {
            if (error instanceof WeatherNotFoundError) {
                res.status(404).send({ error: error.message });
            } else {
                res.status(500).send('Internal server Error');
            }
        }
    }
};

const checkCoordinates = (lat: any, lon: any): boolean => {
    const lat_parser = parseFloat(lat);
    const lon_parser = parseFloat(lon);

    // Check that the first number in your latitude coordinate is between -90 and 90
    const latitude = lat_parser >= -90.0 && lat_parser <= 90.0 ? true : false;
    //Check that the first number in your longitude coordinate is between -180 and 180.
    const longitude = lon_parser >= -180.0 && lon_parser <= 180.0 ? true : false;

    return latitude && longitude;
};
