import axiosInstance from "../axios";
import { getAuthHeaders } from "../getAuth";
export const getAirlines = async (page: number = 1, limit: number = 10) => {
  const response = await axiosInstance.get(`/airlines?page=${page}&limit=${limit}`);
  return response.data; // Mengembalikan { success, data, meta }
};

export async function createAirline(data: any): Promise<void> {
  const headers = await getAuthHeaders();
  await axiosInstance.post("/admin/airlines", data, { headers });
}

export async function updateAirline(id: number, data: any): Promise<void> {
  const headers = await getAuthHeaders();
  await axiosInstance.patch(`/admin/airlines/${id}`, data, { headers });
}

export async function deleteAirlines(id: number) {
  const headers = await getAuthHeaders();    
  const response = await axiosInstance.delete(`/admin/airlines/${id}`, { headers });
  return response.data;
}

