import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const credentials = btoa("ttg_asia:ttg66@siA");

/**
 * Staging Base URL for API requests.
 */
const baseURL = "https://officialguidemap.com/public/";

/**
 * Creates and configures an Axios instance with baseURL and request/response interceptors.
 * @param {string} baseURL - The base URL for API requests.
 * @returns {AxiosInstance} - The configured Axios instance.
 */
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({ baseURL });
  // Request interceptor
  instance.interceptors.request.use(
    /**
     * Interceptor function to add Authorization header to the request config.
     * @param {InternalAxiosRequestConfig} config - Axios request config.
     * @returns {InternalAxiosRequestConfig} - Updated Axios request config.
     */
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      config.headers["Authorization"] = `Basic ${credentials}`;
      return config;
    },
    /**
     * Interceptor error handler for request.
     * @param {AxiosError} error - Axios error object.
     * @returns {Promise<never>} - Promise rejection with error.
     */
    (error: AxiosError): Promise<never> => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    /**
     * Interceptor function for successful response.
     * @param {AxiosResponse} response - Axios response object.
     * @returns {AxiosResponse} - The response object.
     */
    (response: AxiosResponse): AxiosResponse => response,
    /**
     * Interceptor error handler for response.
     * @param {AxiosError} error - Axios error object.
     * @returns {Promise<never>} - Promise rejection with error.
     */
    (error: AxiosError): Promise<never> => {
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Axios instance with baseURL set and request/response interceptors configured.
 */
const axiosInstance: AxiosInstance = createAxiosInstance(baseURL);

export default axiosInstance;

export { baseURL };
