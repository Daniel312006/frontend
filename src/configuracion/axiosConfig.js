import axios from 'axios';
// use env variables
const API_URL = process.env.REACT_APP_API_URL;

export const axiosConfig = axios.create({
    baseURL: API_URL || 'http://localhost:4000/api',
});

/*export const axiosConfig = axios.create({
    baseURL: proccess.env.API_BASE_URL || 'http://localhost:4000/api',
})*/