import authAxiosInstance from "./authAxiosInstance";
import type { RatingResponse } from "./profile";

export interface LearningSessionResponse {
  id: string;
  connectionId: string;
  title: string | null;
  description: string | null;
  scheduledAt: string;
  meetingUrl: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLearningSessionRequest {
  connectionId: string;
  title?: string | null;
  description?: string | null;
  scheduledAt: string;
  meetingUrl?: string | null;
}

export interface UpdateLearningSessionRequest {
  title?: string | null;
  description?: string | null;
  scheduledAt?: string | null;
  meetingUrl?: string | null;
  status?: string | null;
}

export interface CreateRatingRequest {
  score: number;
  review?: string | null;
}

export const learningSessionsApi = {
  getAll: async (): Promise<LearningSessionResponse[]> => {
    const { data } = await authAxiosInstance.get<LearningSessionResponse[]>(
      "/api/learning-sessions"
    );
    return data;
  },

  getById: async (id: string): Promise<LearningSessionResponse> => {
    const { data } = await authAxiosInstance.get<LearningSessionResponse>(
      `/api/learning-sessions/${id}`
    );
    return data;
  },

  create: async (
    payload: CreateLearningSessionRequest
  ): Promise<LearningSessionResponse> => {
    const { data } = await authAxiosInstance.post<LearningSessionResponse>(
      "/api/learning-sessions",
      payload
    );
    return data;
  },

  update: async (
    id: string,
    payload: UpdateLearningSessionRequest
  ): Promise<LearningSessionResponse> => {
    const { data } = await authAxiosInstance.patch<LearningSessionResponse>(
      `/api/learning-sessions/${id}`,
      payload
    );
    return data;
  },

  rate: async (
    sessionId: string,
    payload: CreateRatingRequest
  ): Promise<RatingResponse> => {
    const { data } = await authAxiosInstance.post<RatingResponse>(
      `/api/learning-sessions/${sessionId}/ratings`,
      payload
    );
    return data;
  },
};