import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { message } from "antd";
import { CODE_CONFIG, CODE_MESSAGE_CONFIG } from "./code.config";

interface RequestConfig extends AxiosRequestConfig {
  data?: any;
}

const service = axios.create({
  timeout: 10000, // 设置请求超时时间10秒
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 你可以根据实际情况更改token的获取方式
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === CODE_CONFIG.ERROR) {
      // 假设你的响应结构有一个code字段并且999为错误代码
      message.error(CODE_MESSAGE_CONFIG.ERROR);
      return Promise.reject(new Error(CODE_MESSAGE_CONFIG.ERROR));
    }
    return response.data;
  },
  (error: AxiosError) => {
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      message.error(CODE_MESSAGE_CONFIG.TIMEOUT);
    }
    return Promise.reject(error);
  }
);

// 封装 get, post, put, delete 方法
const get = <T = RequestConfig>(url: string, params?: any): Promise<T> =>
  service.get<T>(url, { params }).then((response) => response.data);
const post = <T = RequestConfig>(url: string, data?: any): Promise<T> =>
  service.post<T>(url, data).then((response) => response.data);
const put = <T = RequestConfig>(url: string, data?: any): Promise<T> =>
  service.put<T>(url, data).then((response) => response.data);
const remove = <T = RequestConfig>(url: string, data?: any): Promise<T> =>
  service.delete<T>(url, { data }).then((response) => response.data);

export { get, post, put, remove };
