import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "../store/authStore";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const instance = axios.create({
  baseURL: apiEndpoint,
});

interface RetryQueueItem {
  resolve: (value?: never) => void;
  reject: (error?: never) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const accessToken = await useAuthStore.getState().getNewAccessToken();

          instance.defaults.headers.Authorization = accessToken;

          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            instance
              .request(config)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .then((response: any) => resolve(response))
              .catch((err) => reject(err));
          });

          refreshAndRetryQueue.length = 0;

          return instance(originalRequest);
          // eslint-disable-next-line no-useless-catch
        } catch (refreshError) {
          console.log("err", refreshError);
          // throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }
      new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
        return useAuthStore.getState().signOut();
      });
    }
    return Promise.reject(error);
  },
);

export { instance };
