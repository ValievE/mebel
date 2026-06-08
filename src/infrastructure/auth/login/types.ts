import type { AuthTokenResponse } from "@/infrastructure/auth/types.ts";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = AuthTokenResponse;
