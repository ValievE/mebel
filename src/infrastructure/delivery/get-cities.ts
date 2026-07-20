import query from "@/infrastructure/query.ts";

export type DeliveryCitiesResponse = {
  cities: string[];
};

export async function getDeliveryCities(): Promise<DeliveryCitiesResponse> {
  return query<DeliveryCitiesResponse>({
    point: "/api/v1/delivery/cities",
    config: { method: "GET" }
  }).then(res => res.data);
}
