import query from "@/infrastructure/query.ts";

export async function logout(): Promise<void> {
  await query({
    point: "/api/v1/auth/logout",
    config: { method: "POST" }
  });
}
