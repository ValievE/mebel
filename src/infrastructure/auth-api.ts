import http from "@/infrastructure/http.ts";

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type MeResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>("/api/v1/auth/login", { email, password });
  return data;
}

export async function registerInitRequest(
  email: string,
  firstName: string,
  lastName: string,
  password: string
): Promise<void> {
  await http.post("/api/v1/auth/register/init", {
    email,
    first_name: firstName,
    last_name: lastName,
    password
  });
}

export async function registerConfirmRequest(
  email: string,
  code: string
): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>("/api/v1/auth/register/confirm", {
    email,
    code
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
