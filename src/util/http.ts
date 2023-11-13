// Check Zod library for fetching data!

export default async function get(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseData = (await response.json()) as unknown;

  return responseData;
}
