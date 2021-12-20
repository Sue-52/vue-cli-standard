import axios from "axios";
// Create a new axios instance
axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || "";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "",
  timeout: 60 * 1000, // Timeout,
  withCredentials: true, // Check cross-site Access-Control
};

// 创建一个 axios 实例对象，用于配置项目应用相关请求
const _axios = axios.create(config);

// 请求拦截器
_axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          return {
            code: 400,
            message: "网络请求不存在",
          };
        default:
          return {
            message: error.response.data.message,
            code: error.response.status,
          };
      }
    }
    return Promise.reject(error.response);
  }
);

// 生成请求函数所需参数
const generateRequestConfig = (url: any, method: any, data: any) => ({
  url,
  method,
  [method.toLowerCase() === "get" ? "params" : "data"]: data,
});

// 请求函数（不带Token）
export default function request(url: any, method: any, data: any) {
  return _axios(generateRequestConfig(url, method, data));
}
