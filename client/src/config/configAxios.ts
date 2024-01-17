import axios from "axios";
import { getLocalToken } from "../common/localStogate";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance  = axios.create({
  baseURL: BASE_URL,
});

const instance_token = axios.create({
  baseURL: BASE_URL,
});

instance_token.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getLocalToken()}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { instance_token, instance};
