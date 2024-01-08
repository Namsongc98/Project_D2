import axios from "axios";

const BASE_URL = "http://localhost:8080";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

function getLocalToken() {
  const token = window.localStorage.getItem("accessToken");
  if (token) {
    return token;
  } else {
    throw new Error("Không có token");
  }
}
function setLocalToken(accessToken: string) {
  window.localStorage.setItem("accessToken", accessToken);
}

axiosPrivate.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getLocalToken()}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { axiosPrivate, axiosPublic, getLocalToken, setLocalToken };
