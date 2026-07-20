import query from "@/infrastructure/query.ts";
import type { RefreshResponse } from "@/infrastructure/auth/refresh/types.ts";

export async function refresh(): Promise<RefreshResponse> {
  return query<RefreshResponse>({
    point: "/api/v1/auth/refresh",
    config: { method: "POST" }
  }).then(res => res.data);
}
