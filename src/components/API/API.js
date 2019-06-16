import axios from 'axios';

const API = () => {
  const axiosConf = {
    baseURL: 'https://api.myjson.com/bins',
  };

  const axiosInstance = axios.create(axiosConf);

  axiosInstance.interceptors.response.use(response => response);

  return axiosInstance;
};

export default API;
