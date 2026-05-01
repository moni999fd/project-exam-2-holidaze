import type { Venue } from "../types/venue";

const API_BASE = "https://v2.api.noroff.dev/holidaze";

interface VenuesResponse {
  data: Venue[];
  meta: Record<string, unknown>;
}

export async function getVenues(): Promise<Venue[]> {
  const response = await fetch(`${API_BASE}/venues`);

  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  const result: VenuesResponse = await response.json();
  return result.data;
}
interface VenueResponse {
  data: Venue;
  meta: Record<string, unknown>;
}

export async function getVenueById(id: string): Promise<Venue> {
  const response = await fetch(`${API_BASE}/venues/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch venue");
  }

  const result: VenueResponse = await response.json();
  return result.data;
}