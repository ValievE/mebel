import http from "@/infrastructure/http.ts";

export type InitPaymentRequest = {
  order_ids: string[];
  return_url: string;
};

export type InitPaymentResponse = {
  payment_id: string;
  redirect_url: string;
  amount: number;
};

export type ConfirmPaymentRequest = {
  payment_id: string;
};

export type ConfirmPaymentResponse = {
  status: "pending" | "success" | "failed";
};

export async function initPaymentRequest(
  payload: InitPaymentRequest
): Promise<InitPaymentResponse> {
  const { data } = await http.post<InitPaymentResponse>(
    "/api/v1/payments/init",
    payload
  );
  return data;
}

export async function confirmPaymentRequest(
  payload: ConfirmPaymentRequest
): Promise<ConfirmPaymentResponse> {
  const { data } = await http.post<ConfirmPaymentResponse>(
    "/api/v1/payments/confirm",
    payload
  );
  return data;
}
