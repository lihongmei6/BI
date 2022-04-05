import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "@/config/domain";

export interface IAxiosResponse<T> {
  code: number;
  data: T;
  msg: string;
}

const service = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

// // http response 拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.log("接口错误！");
    } else {
      console.log("服务器错误！");
    }
    return error.response?.data ?? false; // 返回接口返回的错误信息
  }
);

export default {
  // T 表示API返回的 类型声明
  get<T, U>(
    url: string,
    params: U,
    options: AxiosRequestConfig = {}
  ): Promise<IAxiosResponse<T>> {
    return service.get(url, {
      ...options,
      params,
    });
  },
  post<T, U>(
    url: string,
    data: U,
    options: AxiosRequestConfig = {}
  ): Promise<IAxiosResponse<T>> {
    return service.post(url, data, {
      ...options,
    });
  },
  delete<T, U>(
    url: string,
    params: U,
    options: AxiosRequestConfig = {}
  ): Promise<IAxiosResponse<T>> {
    return service.delete(url, {
      ...options,
      params,
    });
  },
  put<T, U>(
    url: string,
    data: U,
    options: AxiosRequestConfig = {}
  ): Promise<IAxiosResponse<T>> {
    return service.put(url, data, {
      ...options,
    });
  },
};
