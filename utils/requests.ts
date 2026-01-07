
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiConfig = RequestInit & {
  headers?: HeadersInit;
};

async function apiRequest<T>(
  url: string,
  options: ApiConfig = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: "include", // send cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // handle HTTP errors (fetch does NOT throw automatically)
  if (!response.ok) {
    let message = "Request failed";
    try {
      const error = await response.json();
      message = error?.message || message;
    } catch {
      message = `${response.status} ${response.statusText}`;
    }
    throw new Error(message);
  }

  // handle empty responses (204 No Content)
  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}

// =====================
// PUBLIC API METHODS
// =====================

export const fetchData = <T>(
  url: string,
  config?: ApiConfig
): Promise<T> => {
  return apiRequest<T>(url, {
    method: "GET",
    ...config,
  });
};

export const postData = <T, B = unknown>(
  url: string,
  data: B,
  config?: ApiConfig
): Promise<T> => {
  return apiRequest<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  });
};

export const updateData = <T, B = unknown>(
  url: string,
  data: B,
  config?: ApiConfig
): Promise<T> => {
  return apiRequest<T>(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    ...config,
  });
};

export const deleteData = <T>(
  url: string,
  config?: ApiConfig
): Promise<T> => {
  return apiRequest<T>(url, {
    method: "DELETE",
    ...config,
  });
};




// import axios, { AxiosRequestConfig } from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const fetchData = async <T>(
//   url: string,
//   config?: AxiosRequestConfig
// ) => {
//   const response = await api.get<T>(url, { ...config, withCredentials: true });
//   return response.data;
// };

// export const postData = async <T>(
//   url: string,
//   data: T,
//   config?: AxiosRequestConfig
// ) => {

//   const response = await api.post<T>(url, data, {
//     ...config,
//     withCredentials: true,
//   });
//   return response.data;
// };

// export const updateData = async <T>(
//   url: string,
//   data: T,
//   config?: AxiosRequestConfig
// ) => {
//   const response = await api.patch<T>(url, data, {
//     ...config,
//     withCredentials: true,
//   });
//   return response.data;
// };

// export const deleteData = async <T>(
//   url: string,
//   config?: AxiosRequestConfig
// ) => {
//   const response = await api.delete<T>(url, {
//     ...config,
//     withCredentials: true,
//   });
//   return response.data;
// };
