import axios, { AxiosResponse } from 'axios';
import { Address } from '../domain/address';
import { AddressRepository } from '../domain/address_repository';

export class NominatimAPIRepository implements AddressRepository {
    base_url: string;

    constructor(base_url: string) {
        this.base_url = process.env.NOMINATIM_BASE_URL || '';
    }

    async findOne(street: string, streetNumber: string, town: string, postalCode: string, country: string): Promise<Address | null> {
        const url = `${this.base_url}/search`;
        const query_params = {
            street: `${streetNumber} ${street}`,
            city: town,
            country: country,
            postalcode: postalCode,
            format: 'json',
            limit: 1
        };
        const response: AxiosResponse = await axios.get(url, {
            params: query_params
        });
        if (response.data.length > 0 && response.status === 200) {
            const address = response.data[0];
            return new Address(street, streetNumber, town, postalCode, country, Number(address.lat), Number(address.lon));
        } else {
            return null;
        }
    }
}
