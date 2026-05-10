import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export type QueryPayload = {
  point: string;
  config: AxiosRequestConfig;
};

async function query<T = any>(
  payload: QueryPayload
): Promise<AxiosResponse<T>> {
  try {
    const config = payload.config;
    const apiURL = import.meta.env.VITE_API_URL;

    if (!apiURL) throw new Error("Missing API URL");

    if (apiURL) {
      config.baseURL = apiURL.replace(/\/$/, "");
    }

    return await axios(payload.point, config);
  } catch (e) {
    return Promise.reject(e);
  }
}

export default query;
