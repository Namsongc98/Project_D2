import axios from "axios";
import { getLocalToken } from "../common/localStogate";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getLocalToken()}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { axiosPrivate, axiosPublic};
