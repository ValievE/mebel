import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig
} from "axios";

import { SSNames } from "@/common/consts.ts";

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url ?? "";
  if (
    url.includes("/auth/login") ||
    url.includes("/auth/register") ||
    url.includes("/auth/refresh")
  ) {
    delete config.headers.Authorization;
    return config;
  }
  const token = sessionStorage.getItem(SSNames.AccessToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  res => res,
  async err => {
    const cfg = err.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (!cfg || cfg._retry || err.response?.status !== 401) {
      return Promise.reject(err);
    }
    const url = cfg.url ?? "";
    if (
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh")
    ) {
      return Promise.reject(err);
    }
    cfg._retry = true;
    try {
      const { refresh } =
        await import("@/infrastructure/auth/refresh/refresh.ts");
      const data = await refresh();
      sessionStorage.setItem(SSNames.AccessToken, data.access_token);
      cfg.headers.Authorization = `Bearer ${data.access_token}`;
      void import("@/stores/use-auth-store").then(({ useAuthStore }) => {
        try {
          useAuthStore().setAccessToken(data.access_token);
        } catch {
          /* Pinia ещё не смонтирован */
        }
      });
      return http(cfg);
    } catch {
      sessionStorage.removeItem(SSNames.AccessToken);
      void import("@/stores/use-auth-store").then(({ useAuthStore }) => {
        try {
          useAuthStore().setAccessToken(null);
        } catch {}
      });
      return Promise.reject(err);
    }
  }
);

export default http;
