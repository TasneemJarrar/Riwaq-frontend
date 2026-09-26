import authAxiosInstance from "./authAxiosInstance";
import type { PublicUserProfileResponse, SkillResponse } from "./profile";

export interface SkillVerificationRequestResponse {
  id: string;
  requester: PublicUserProfileResponse;
  mentor: PublicUserProfileResponse;
  skill: SkillResponse;
  status: string | null;
  score: number | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillVerificationRequest {
  mentorUserId: string;
  skillId: string;
}

export interface UpdateSkillVerificationRequest {
  status?: string | null;
  note?: string | null;
}

export const skillVerificationApi = {
  create: async (
    payload: CreateSkillVerificationRequest
  ): Promise<SkillVerificationRequestResponse> => {
    const { data } =
      await authAxiosInstance.post<SkillVerificationRequestResponse>(
        "/api/skill-verification-requests",
        payload
      );
    return data;
  },

  getSent: async (): Promise<SkillVerificationRequestResponse[]> => {
    const { data } = await authAxiosInstance.get<
      SkillVerificationRequestResponse[]
    >("/api/skill-verification-requests/sent");
    return data;
  },

  getReceived: async (): Promise<SkillVerificationRequestResponse[]> => {
    const { data } = await authAxiosInstance.get<
      SkillVerificationRequestResponse[]
    >("/api/skill-verification-requests/received");
    return data;
  },

  update: async (
    id: string,
    payload: UpdateSkillVerificationRequest
  ): Promise<SkillVerificationRequestResponse> => {
    const { data } =
      await authAxiosInstance.patch<SkillVerificationRequestResponse>(
        `/api/skill-verification-requests/${id}`,
        payload
      );
    return data;
  },
};