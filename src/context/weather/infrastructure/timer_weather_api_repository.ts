import axios from 'axios';
import { Weather } from '../domain/weather';
import { WeatherRepository } from '../domain/weather_repository';

export class TimerWeatherRepository implements WeatherRepository {
    private base_url: string;
    private cloud_cover_values = ['0%-6%', '6%-19%', '19%-31%', '31%-44%', '44%-56%', '56%-69%', '69%-81%', '81%-94%', '94%-100%'];

    constructor() {
        this.base_url = process.env.TIMER_WEATHER_BASE_URL || '';
    }

    async find(lat: number, lon: number): Promise<Weather | null> {
        const url = `${this.base_url}/bin/api.pl`;
        const query_params = {
            lat: lat,
            lon: lon,
            product: 'civil',
            output: 'json'
        };
        const response = await axios.get(url, { params: query_params });
        if (response.status !== 200 || !response.data.dataseries) {
            return null;
        }
        const data = response.data.dataseries[0];
        const cloud_cover = data.cloudcover as number;
        return new Weather(data.temp2m, this.cloud_cover_values[cloud_cover - 1], data.weather, data.rh2m);
    }
}
