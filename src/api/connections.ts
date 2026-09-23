import authAxiosInstance from "./authAxiosInstance";

/** Connection Requests API types (from OpenAPI) */

export interface PublicUserProfileResponse {
  userId: string;
  points: number;
  learningDirectionId: string | null;
  learningDirectionName: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  university: string | null;
}

export interface ConnectionRequestResponse {
  id: string;
  sender: PublicUserProfileResponse;
  receiver: PublicUserProfileResponse;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateConnectionRequestStatusRequest {
  status: string | null; // e.g. "Accepted" | "Rejected" | "Cancelled"
}

/** UI shape for Earn More Points cards */
export interface EarnRequestItem {
  id: string;
  tag: string;
  tagClassName: string;
  title: string;
  eta: string;
  status: string | null;
  senderName: string;
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
};