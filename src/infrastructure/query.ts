import type { AxiosRequestConfig, AxiosResponse } from "axios";

import http from "@/infrastructure/http.ts";

export type QueryPayload = {
  point: string;
  config: AxiosRequestConfig;
};

async function query<T = unknown>(
  payload: QueryPayload
): Promise<AxiosResponse<T>> {
  if (!import.meta.env.VITE_API_URL) {
    throw new Error("Missing VITE_API_URL");
  }
  return http.request<T>({
    url: payload.point,
    ...payload.config
  });
}

export default query;
