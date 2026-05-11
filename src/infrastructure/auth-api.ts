import http from "@/infrastructure/http.ts";

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type MeResponse = {
  id: number;
  username: string;
};

export async function loginRequest(
  username: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>("/api/v1/auth/login", {
    username,
    password
  });
  return data;
}

export async function registerRequest(
  username: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>("/api/v1/auth/register", {
    username,
    password
  });
  return data;
}

export async function logoutRequest(): Promise<void> {
  await http.post("/api/v1/auth/logout");
}

export async function meRequest(): Promise<MeResponse> {
  const { data } = await http.get<MeResponse>("/api/v1/auth/me");
  return data;
}
