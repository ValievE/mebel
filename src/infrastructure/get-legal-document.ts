import query from "@/infrastructure/query.ts";

export type GetLegalDocumentResponse = {
  id: string;
  text: string;
  accept_date: string;
};

export async function getLegalDocument(
  id: string
): Promise<GetLegalDocumentResponse> {
  return query<GetLegalDocumentResponse>({
    point: "/api/v1/legal/document",
    config: {
      method: "GET",
      params: { id }
    }
  }).then(res => res.data);
}
