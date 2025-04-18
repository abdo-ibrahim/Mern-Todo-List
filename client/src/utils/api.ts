import axios from "axios";
import getToken from "./getToken";
import Cookies from "js-cookie";

// export const baseURL = "http://localhost:5000/api/v1";
export const baseURL = "https://mern-todo-list-backend-three.vercel.app/api/v1";

export const todoApi = `${baseURL}/todos`;
export const authApi = `${baseURL}/auth`;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error("Unauthorized access. Please log in again.");
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
