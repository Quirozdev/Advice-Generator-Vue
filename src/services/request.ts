export async function request<T>(
  url: string,
  config: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  const data = await response.json();
  return data;
}
