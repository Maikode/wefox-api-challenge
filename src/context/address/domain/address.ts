export class Address {
    street: string;
    streetNumber: string;
    town: string;
    postalCode: string;
    country: string;
    lat: number;
    lon: number;

    constructor(
        street: string,
        streetNumber: string,
        town: string,
        postalCode: string,
        country: string,
        lat: number,
        lon: number
    ) {
        this.street = street;
        this.country = country;
        this.postalCode = postalCode;
        this.streetNumber = streetNumber;
        this.town = town;
        this.lat = lat;
        this.lon = lon;
    }
}
