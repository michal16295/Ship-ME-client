import axios from "axios";
import Cookies from "js-cookie";
import globalConstants from "../constants/globalConstants";

const { COOKIE_JWT, HEADER_AUTH, LOCAL_STR_TOKEN, BASE_API } = globalConstants;

const api = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    // Add token to headers before request is sent
    const cookie = Cookies.get(COOKIE_JWT);
    if (
      config.baseURL === BASE_API &&
      !config.headers.Authorization &&
      !cookie
    ) {
      const token = localStorage.getItem(LOCAL_STR_TOKEN);
      if (token) {
        config.headers[HEADER_AUTH] = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};
