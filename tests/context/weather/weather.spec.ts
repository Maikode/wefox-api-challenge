import { config } from 'dotenv';
import { GetWeatherUseCase } from '../../../src/context/weather/application/get_weather_use_case';
import { WeatherNotFoundError } from '../../../src/context/weather/domain/exceptions/weather_not_found';
import { Weather } from '../../../src/context/weather/domain/weather';
import { WeatherRepositoryMocked } from './__mocks__/weather_repository_mock';

describe('User context testing', () => {
    let weather_repository_mocked: WeatherRepositoryMocked;
    let get_weather_use_case: GetWeatherUseCase;

    //Use default dev env file as test env
    config({
        path: `${process.cwd()}/env/dev.env`
    });

    beforeEach(() => {
        weather_repository_mocked = new WeatherRepositoryMocked();
        get_weather_use_case = new GetWeatherUseCase({ weatherRepository: weather_repository_mocked });
    });

    it('Get current weather from address lat-lon coords', async () => {
        //create address coords input exmaple
        const lat = 38.8702533;
        const lon = -6.9855666;

        //Add weather response to return
        const weather_to_return = new Weather(23, '0%-6%', 'cloudy', '30%');
        weather_repository_mocked.findReturnWeather(weather_to_return);

        const result: any = await get_weather_use_case.get(lat, lon);
        expect(result instanceof Weather).toBeTruthy();
        expect(result.cloud_cover).toEqual('0%-6%');
        expect(result.temperature_celsius).toEqual(23);
        expect(result.humidity).toEqual('30%');
        expect(result.weather).toEqual('cloudy');
    });

    it('Get a not found weather with bad lat-lon coordinates', async () => {
        weather_repository_mocked.findReturnWeather(null);

        //call get weather use case
        //create address coords input exmaple
        const lat = 99.9999999;
        const lon = 99.9999999;
        await expect(get_weather_use_case.get(lat, lon)).rejects.toThrow(WeatherNotFoundError);
    });
});
