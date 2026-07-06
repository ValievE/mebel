const bucketName = "mebel";

/** Публичный URL картинки: ключ MinIO или уже полный URL. */
export function resolveMediaUrl(keyOrUrl: string): string {
  const value = keyOrUrl.trim();
  if (!value) {
    return "";
  }
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  const base = (import.meta.env.VITE_API_URL ?? window.location.origin).replace(
    /\/$/,
    ""
  );
  return `${base}/${bucketName}/${value.replace(/^\//, "")}`;
}
