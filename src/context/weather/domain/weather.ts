export class Weather {
    temperature_celsius: number;
    cloud_cover: string;
    weather: string;
    humidity: string;
    constructor(temperature: number, cloud_cover: string, weather: string, humidity: string) {
        this.temperature_celsius = temperature;
        this.cloud_cover = cloud_cover;
        this.weather = weather;
        this.humidity = humidity;
    }
}
