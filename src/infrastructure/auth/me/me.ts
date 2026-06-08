import query from "@/infrastructure/query.ts";
import type { MeResponse } from "@/infrastructure/auth/me/types.ts";

export async function me(): Promise<MeResponse> {
  return query<MeResponse>({
    point: "/api/v1/auth/me",
    config: { method: "GET" }
  }).then(res => res.data);
}
