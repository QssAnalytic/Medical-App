import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const instance = axios.create({
  baseURL: apiEndpoint,
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});

// instance.interceptors.response.use((response)=> response, async (error)=>{
//   const originalRequest = error.config;
//   const status = error.response ? error.response.status : null;
// })
export { instance };
