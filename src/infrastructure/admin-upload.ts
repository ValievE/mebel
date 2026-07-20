import http from "@/infrastructure/http.ts";

export type AdminUploadResponse = {
  object_key: string;
  url: string;
};

export async function adminUploadImage(
  file: File
): Promise<AdminUploadResponse> {
  const form = new FormData();
  form.append("file", file);

  const response = await http.post<AdminUploadResponse>(
    "/api/v1/admin/uploads",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
}
