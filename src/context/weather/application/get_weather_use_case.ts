import { Weather } from '../domain/weather';
import { WeatherRepository } from '../domain/weather_repository';

export class GetWeatherUseCase {
    private weatherRepository: WeatherRepository;

    constructor(dependencies: { weatherRepository: WeatherRepository }) {
        this.weatherRepository = dependencies.weatherRepository;
    }

    async get(lat: number, lon: number): Promise<Weather | null> {
        const weather = await this.weatherRepository.find(lat, lon);

        if (!weather) {
            console.log('Throw Error');
        }

        return weather;
    }
}
