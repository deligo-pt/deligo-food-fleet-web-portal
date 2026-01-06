import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const backendUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: backendUrl,
});

const serverRequestHelper = async (
  url: string,
  options?: AxiosRequestConfig
) => {
  const accessToken = (await cookies()).get("accessToken")?.value || "";

  return axiosInstance({
    url,
    ...options,
    headers: {
      ...(options?.headers || {}),
      authorization: accessToken,
    },
  }).then((res) => res.data);
};

export const serverRequest = {
  get: (url: string, options: AxiosRequestConfig = {}) =>
    serverRequestHelper(url, { ...options, method: "GET" }),

  post: (url: string, options: AxiosRequestConfig = {}) =>
    serverRequestHelper(url, { ...options, method: "POST" }),

  patch: (url: string, options: AxiosRequestConfig = {}) =>
    serverRequestHelper(url, { ...options, method: "PATCH" }),

  delete: (url: string, options: AxiosRequestConfig = {}) =>
    serverRequestHelper(url, { ...options, method: "DELETE" }),
};


const serverFetchHelper = async (endPoint: string, options: RequestInit): Promise<Response> => {
  const { headers, ...restOptions } = options;

  const accessToken = (await cookies()).get("accessToken")?.value || "";

  const response = await fetch(`${backendUrl}${endPoint}`, {
    credentials: 'include',
    headers: {
      ...headers,
      authorization: accessToken ? accessToken : "",
    },
    ...restOptions
  });

  return response;
};

export const serverFetch = {
  get: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'GET', ...options }),

  post: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'POST', ...options }),

  put: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'PUT', ...options }),

  patch: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'PATCH', ...options }),

  delete: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'DELETE', ...options }),
};