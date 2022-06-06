export class WeatherNotFoundError extends Error {
    constructor() {
        super('There is not weather for these coordinates');
    }
}
