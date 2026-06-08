import query from "@/infrastructure/query.ts";
import type { RegisterInitRequest } from "@/infrastructure/auth/register-init/types.ts";

export async function registerInit(payload: RegisterInitRequest): Promise<void> {
  await query({
    point: "/api/v1/auth/register/init",
    config: {
      method: "POST",
      data: payload
    }
  });
}
