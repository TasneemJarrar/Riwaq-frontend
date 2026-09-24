import authAxiosInstance from "./authAxiosInstance";
import type { PublicUserProfileResponse } from "./profile";

export interface ConnectionRequestResponse {
  id: string;
  status: string | null;
  createdAt: string;
  updatedAt?: string;
  sender: PublicUserProfileResponse | null;
  receiver?: PublicUserProfileResponse | null;
  senderUserId?: string | null;
  receiverUserId?: string | null;
}

export interface ConnectionResponse {
  id: string;
  userAId: string;
  userBId: string;
  createdAt: string;
  userA: PublicUserProfileResponse;
  userB: PublicUserProfileResponse;
}

export interface UpdateConnectionRequestStatusRequest {
  status: "Accepted" | "Rejected" | "Cancelled" | "Pending";
}

export const connectionsApi = {
  getReceived: async (): Promise<ConnectionRequestResponse[]> => {
    const { data } = await authAxiosInstance.get<ConnectionRequestResponse[]>(
      "/api/connection-requests/received"
    );
    return data;
  },

  getSent: async (): Promise<ConnectionRequestResponse[]> => {
    const { data } = await authAxiosInstance.get<ConnectionRequestResponse[]>(
      "/api/connection-requests/sent"
    );
    return data;
  },

  send: async (receiverUserId: string): Promise<ConnectionRequestResponse> => {
    const { data } = await authAxiosInstance.post<ConnectionRequestResponse>(
      "/api/connection-requests",
      { receiverUserId }
    );
    return data;
  },

  updateStatus: async (
    connectionRequestId: string,
    payload: UpdateConnectionRequestStatusRequest
  ): Promise<ConnectionRequestResponse> => {
    const { data } = await authAxiosInstance.patch<ConnectionRequestResponse>(
      `/api/connection-requests/${connectionRequestId}`,
      payload
    );
    return data;
  },

  getConnections: async (): Promise<ConnectionResponse[]> => {
  const { data } = await authAxiosInstance.get<ConnectionResponse[]>(
    "/api/connections"
  );
  return data;
},
};