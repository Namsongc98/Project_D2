import axios from 'axios';
import { IUser } from '../type';

const BASE_URL = 'http://localhost:8000';

const axiosPublic = axios.create({
    baseURL: BASE_URL,
})

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
});

axiosPrivate.interceptors.request.use((config) => {
    const user: IUser | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
},
    (error) => {
        return Promise.reject(error);
    }
)
export { axiosPrivate, axiosPublic }        