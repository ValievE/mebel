import http from "@/infrastructure/http.ts";

export type SettingType = "boolean";

export type SettingMeta = {
  label: string;
  type: SettingType;
  value: boolean;
};

export type GetSettingsResponse = {
  settings: Record<string, SettingMeta>;
};

export type UpdateSettingsRequest = Record<string, boolean>;

export type UpdateSettingsResponse = Record<string, boolean>;

export async function getSettingsRequest(): Promise<GetSettingsResponse> {
  const { data } = await http.get<GetSettingsResponse>("/api/v1/settings");
  return data;
}

export async function updateSettingsRequest(
  payload: UpdateSettingsRequest
): Promise<UpdateSettingsResponse> {
  const { data } = await http.patch<UpdateSettingsResponse>(
    "/api/v1/settings",
    payload
  );
  return data;
}
