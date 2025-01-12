import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const apiConnector = async (method, url, bodyData = {}, headers = {}, params = {}) => {
  try {
      console.log("API call initiated", method, url);
      return await axiosInstance({
          method,
          url,
          data: bodyData,
          headers,
          params,
      });
  } catch (error) {
      console.error("API call failed", error);
      throw error; // Re-throw to propagate error
  }
};
  
export  {axiosInstance,apiConnector} 