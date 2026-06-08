import type { AuthTokenResponse } from "@/infrastructure/auth/types.ts";

export type RegisterConfirmRequest = {
  email: string;
  code: string;
};

export type RegisterConfirmResponse = AuthTokenResponse;
