import 'jest';
import { Weather } from '../../../../src/context/weather/domain/weather';
import { WeatherRepository } from '../../../../src/context/weather/domain/weather_repository';

export class WeatherRepositoryMocked implements WeatherRepository {
    findMocked = jest.fn();
    async find(lat: number, lon: number): Promise<Weather | null> {
        return await this.findMocked();
    }

    findReturnWeather = (weatherMocked: Weather | null) => {
        return this.findMocked.mockReturnValue(weatherMocked);
    };
}
