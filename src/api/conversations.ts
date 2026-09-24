import authAxiosInstance from "./authAxiosInstance";

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

export interface ConversationResponse {
  id: string;
  subject: string | null;
  participants: PublicUserProfileResponse[] | null;
  lastActivityAt: string;
}

export interface MessageResponse {
  id: string;
  sender: PublicUserProfileResponse;
  content: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  connectionId?: string | null;
  content?: string | null;
  subject?: string | null;
}

export interface UpdateMessageRequest {
  content?: string | null;
}

export const conversationsApi = {
  getAll: async (): Promise<ConversationResponse[]> => {
    const { data } = await authAxiosInstance.get<ConversationResponse[]>(
      "/api/conversations"
    );
    return data;
  },

  getById: async (id: string): Promise<ConversationResponse> => {
    const { data } = await authAxiosInstance.get<ConversationResponse>(
      `/api/conversations/${id}`
    );
    return data;
  },

  getMessages: async (conversationId: string): Promise<MessageResponse[]> => {
    const { data } = await authAxiosInstance.get<MessageResponse[]>(
      `/api/conversations/${conversationId}/messages`
    );
    return data;
  },

  sendMessage: async (
    conversationId: string,
    payload: SendMessageRequest
  ): Promise<MessageResponse> => {
    const { data } = await authAxiosInstance.post<MessageResponse>(
      `/api/conversations/${conversationId}/messages`,
      payload
    );
    return data;
  },

  updateMessage: async (
    messageId: string,
    payload: UpdateMessageRequest
  ): Promise<MessageResponse> => {
    const { data } = await authAxiosInstance.patch<MessageResponse>(
      `/messages/${messageId}`,
      payload
    );
    return data;
  },
};