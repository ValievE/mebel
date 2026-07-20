import query from "@/infrastructure/query.ts";

export type SuggestAddressRequest = {
  query: string;
  count?: number;
};

export type SuggestAddressResponse = {
  suggestions: string[];
};

export async function suggestAddress(
  payload: SuggestAddressRequest
): Promise<SuggestAddressResponse> {
  return query<SuggestAddressResponse>({
    point: "/api/v1/delivery/address/suggest",
    config: {
      method: "POST",
      data: {
        query: payload.query,
        count: payload.count ?? 10
      }
    }
  }).then(res => res.data);
}
