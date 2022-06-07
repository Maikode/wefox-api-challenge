/*
    TEST E2E: happy path
        STEP 1: login with valid user credentials
            Save user token
            Expect response is 200 and json data is defined
        STEP 2: validate address info
            Save address info
            Expect response is 200 and json data is defined
        STEP 3: get current weather with previous validated address
            Expect response is 200 and json data is defined
*/

import axios from 'axios';
import 'jest';
import jwt from 'jsonwebtoken';
import { expressApp } from './../../src/server';

describe('TEST E2E: happy path', () => {
    //Server data config
    const PORT = process.env.SERVER_PORT;

    // User credentials example
    const user_payload = {
        email: 'email@example.com',
        password: 'password'
    };

    // Address params example
    const address_params = {
        street: 'Avenida Jose María Alcaraz y Alenda',
        country: 'Spain',
        postalCode: '06011',
        streetNumber: '9',
        town: 'Badajoz'
    };

    beforeAll(() => {
        //Init HTTP EXPRESS SERVER with PORT defined
        expressApp.listen(PORT, () => {
            console.log(`[*] Express Server listening on PORT ${PORT} `);
        });
    });

    it('Valid e2e test', async () => {
        //STEP 1: login with valid user credentials
        const response_login = await axios.post(`http://localhost:${PORT}/login`, user_payload);
        //Expect response is 200 and json data is defined
        expect(response_login.status).toEqual(200);
        expect(response_login.data.access_token).toBeDefined();
        //Verify token payload and expiration
        const payload: any = jwt.verify(response_login.data.access_token, process.env.JWT_SECRET as string) as {};
        expect(payload.email).toEqual(user_payload.email);

        //Save user token
        const access_token = response_login.data.access_token;

        //STEP 2: validate address info
        const response_validate_address = await axios.get(`http://localhost:${PORT}/address`, { params: address_params });
        //Expect response is 200 and json data is defined
        expect(response_validate_address.status).toEqual(200);
        expect(response_validate_address.data.lat).toBeDefined;
        expect(response_validate_address.data.lon).toBeDefined;

        //Save address info
        const address_data = response_validate_address.data;

        //STEP 3: get current weather with previous validated address
        const response_weather = await axios.get(`http://localhost:${PORT}/weather`, {
            params: {
                lat: address_data.lat,
                lon: address_data.lon
            },
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        //Expect response is 200 and json data is defined
        expect(response_weather.status).toEqual(200);
        expect(response_weather.data).toBeDefined();
    });
});
