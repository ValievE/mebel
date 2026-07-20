import query from "@/infrastructure/query.ts";
import type {
  RegisterConfirmRequest,
  RegisterConfirmResponse
} from "@/infrastructure/auth/register-confirm/types.ts";

export async function registerConfirm(
  payload: RegisterConfirmRequest
): Promise<RegisterConfirmResponse> {
  return query<RegisterConfirmResponse>({
    point: "/api/v1/auth/register/confirm",
    config: {
      method: "POST",
      data: payload
    }
  }).then(res => res.data);
}
