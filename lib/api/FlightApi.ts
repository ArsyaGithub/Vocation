import axiosInstance from "../axios";
import { ApiResponse, Flight, FlightFilters } from "@/lib/type/flight";
import { getAuthHeaders } from "../getAuth";
export const getFlights = async (filters: FlightFilters) => {
  const query = new URLSearchParams(filters as Record<string, string>).toString();
  const response = await axiosInstance.get(`/flights?${query}`);
  return response.data; // Mengembalikan { success, data, meta }
};
export const getTickets = getFlights


export async function getFlightById(id: string): Promise<Flight> {
    const response = await axiosInstance.get(`/flights/${id}`)
    const result: ApiResponse<Flight> = response.data
    return result.data
}

export async function createFlight(data: any): Promise<void> {
    const headers = await getAuthHeaders();
    await axiosInstance.post("/admin/flights", data, { headers })
}
export async function deleteFlight(id: number): Promise<void> {
  const headers = await getAuthHeaders();
    await axiosInstance.delete(`/admin/flights/${id}`, { headers })
}

export async function updateFlight(id: number, data: any): Promise<void> {
  const headers = await getAuthHeaders();
  await axiosInstance.put(`/admin/flights/${id}`, data, { headers })
}

export async function getFlightsSearch(params: any) {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`/flight/search?${query}`);
  return res.data;
}