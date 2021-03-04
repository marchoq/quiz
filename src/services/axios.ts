/**
 * Preconfigured axios instance for most use cases throughout the application.
 */
import axios from 'axios';

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

const preconfAxios = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

export default preconfAxios;
