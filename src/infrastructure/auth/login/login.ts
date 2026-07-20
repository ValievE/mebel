import query from "@/infrastructure/query.ts";
import type { LoginRequest, LoginResponse } from "@/infrastructure/auth/login/types.ts";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return query<LoginResponse>({
    point: "/api/v1/auth/login",
    config: {
      method: "POST",
      data: payload
    }
  }).then(res => res.data);
}
