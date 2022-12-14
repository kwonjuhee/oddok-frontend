/* eslint-disable no-param-reassign */
import axios from "axios";
import { getNewToken } from "./auth/auth-api";
import ApiError from "./error/ApiError";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  timeout: 30000,
  header: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    // console.log("π΅μλ΅ μλ¬", error.response);
    const { config, response } = error;
    if (response.status === 401 && response.data.message === "λ‘κ·ΈμΈμ΄ λμ΄ μμ§ μμ΅λλ€.") {
      await getNewToken();
      return axiosInstance.request(config);
    }
    throw new ApiError(error.response.data.message, error.response.status);
  },
);

export default axiosInstance;
