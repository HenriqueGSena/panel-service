import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class HttpService {
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY_PROD;

        this.axiosInstance = axios.create({
            baseURL: apiUrl,
            headers: {
                'X-Avantio-Auth': apiKey,
            },
        });
    }

    getApiClient(): AxiosInstance {
        return this.axiosInstance;
    }
}
