import query from "@/infrastructure/query.ts";

export enum LegalDocumentType {
  PrivacyPolicy = 1,
  DataProcessing = 2
}

export type GetLegalDocumentResponse = {
  id: string;
  title: string;
  text: string;
  accept_date: string;
};

export async function getLegalDocument(
  type: LegalDocumentType
): Promise<GetLegalDocumentResponse> {
  return query<GetLegalDocumentResponse>({
    point: "/api/v1/legal/document",
    config: {
      method: "GET",
      params: { type: String(type) }
    }
  }).then(res => res.data);
}
