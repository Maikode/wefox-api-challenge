import { Weather } from './weather';

export interface WeatherRepository {
    find(lat: number, lon: number): Promise<Weather | null>;
}
