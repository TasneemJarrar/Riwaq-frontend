import authAxiosInstance from "./authAxiosInstance";
import axiosInstance from "./axiosInstance";

export interface EducationalContentResponse {
  id: string;
  userId: string;
  title: string | null;
  description: string | null;
  contentType: string | null;
  contentUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEducationalContentRequest {
  title?: string | null;
  description?: string | null;
  contentType?: string | null;
  contentUrl?: string | null;
}

export interface CommentResponse {
  id: string;
  userId: string;
  educationalContentId: string;
  parentCommentId: string | null;
  content: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  content?: string | null;
  parentCommentId?: string | null;
}

export const educationalContentApi = {
  getAll: async (): Promise<EducationalContentResponse[]> => {
    const { data } = await axiosInstance.get<EducationalContentResponse[]>(
      "/api/educational-content"
    );
    return data;
  },

  getById: async (id: string): Promise<EducationalContentResponse> => {
    const { data } = await axiosInstance.get<EducationalContentResponse>(
      `/api/educational-content/${id}`
    );
    return data;
  },

  create: async (
    payload: CreateEducationalContentRequest
  ): Promise<EducationalContentResponse> => {
    const { data } = await authAxiosInstance.post<EducationalContentResponse>(
      "/api/educational-content",
      payload
    );
    return data;
  },

  like: async (id: string): Promise<void> => {
    await authAxiosInstance.post(`/api/educational-content/${id}/likes`);
  },

  unlike: async (id: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/educational-content/${id}/likes`);
  },

  save: async (id: string): Promise<void> => {
    await authAxiosInstance.post(`/api/educational-content/${id}/saves`);
  },

  unsave: async (id: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/educational-content/${id}/saves`);
  },

  getComments: async (id: string): Promise<CommentResponse[]> => {
    const { data } = await axiosInstance.get<CommentResponse[]>(
      `/api/educational-content/${id}/comments`
    );
    return data;
  },

  createComment: async (
    id: string,
    payload: CreateCommentRequest
  ): Promise<CommentResponse> => {
    const { data } = await authAxiosInstance.post<CommentResponse>(
      `/api/educational-content/${id}/comments`,
      payload
    );
    return data;
  },
};