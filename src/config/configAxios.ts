import axios from 'axios';

const accessToken: string | null = localStorage.getItem("token") || null;

const BASE_URL = 'http://localhost:8080';
const axiosPublic = axios.create({
    baseURL: BASE_URL,
})

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});
export { axiosPrivate, axiosPublic }