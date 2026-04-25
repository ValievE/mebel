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

    const sbKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    config.headers = {
      apikey: sbKey,
      Authorization: `Bearer ${sbKey}`
    };
    config.baseURL = import.meta.env.VITE_SUPABASE_URL;

    return await axios(payload.point, config);
  } catch (e) {
    return Promise.reject(e);
  }
}

export default query;
