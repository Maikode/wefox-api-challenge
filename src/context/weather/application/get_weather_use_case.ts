import { WeatherNotFoundError } from '../domain/exceptions/weather_not_found';
import { Weather } from '../domain/weather';
import { WeatherRepository } from '../domain/weather_repository';

export class GetWeatherUseCase {
    private weatherRepository: WeatherRepository;

    constructor(dependencies: { weatherRepository: WeatherRepository }) {
        this.weatherRepository = dependencies.weatherRepository;
    }

    async get(lat: number, lon: number): Promise<Weather | null> {
        const weather: Weather | null = await this.weatherRepository.find(lat, lon);
        if (!weather) {
            throw new WeatherNotFoundError();
        }
        return weather;
    }
}
