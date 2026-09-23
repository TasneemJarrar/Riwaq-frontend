import authAxiosInstance from "./authAxiosInstance";

/** Users */
export interface UserProfileResponse {
  userId: string;
  firebaseUid: string | null;
  points: number;
  learningDirectionId: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  university: string | null;
}

export interface UpdateProfileRequest {
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  university: string | null;
}

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

/** Skills / Interests */
export interface SkillResponse {
  id: string;
  name: string | null;
  description: string | null;
}

export interface InterestResponse {
  id: string;
  name: string | null;
  description: string | null;
}

/** Experiences */
export interface ExperienceResponse {
  id: string;
  userId: string;
  title: string | null;
  description: string | null;
}

export interface CreateExperienceRequest {
  title: string | null;
  description: string | null;
}

export interface UpdateExperienceRequest {
  title: string | null;
  description: string | null;
}

/** Progress */
export interface ProgressResponse {
  id: string;
  learningDirectionId: string;
  learningDirectionName: string | null;
  level: string | null;
  startedAt: string;
  updatedAt: string;
}

/** Learning sessions */
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

/** Educational content */
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

export const profileApi = {
  getMe: async (): Promise<UserProfileResponse> => {
    const { data } = await authAxiosInstance.get<UserProfileResponse>(
      "/api/users/me"
    );
    return data;
  },

  updateMe: async (
    payload: UpdateProfileRequest
  ): Promise<UserProfileResponse> => {
    const { data } = await authAxiosInstance.put<UserProfileResponse>(
      "/api/users/me",
      payload
    );
    return data;
  },

  getPublic: async (id: string): Promise<PublicUserProfileResponse> => {
    const { data } = await authAxiosInstance.get<PublicUserProfileResponse>(
      `/api/users/${id}`
    );
    return data;
  },

  getMySkills: async (): Promise<SkillResponse[]> => {
    const { data } = await authAxiosInstance.get<SkillResponse[]>(
      "/api/profiles/me/skills"
    );
    return data;
  },

  addMySkill: async (skillId: string): Promise<SkillResponse> => {
    const { data } = await authAxiosInstance.put<SkillResponse>(
      `/api/profiles/me/skills/${skillId}`
    );
    return data;
  },

  removeMySkill: async (skillId: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/profiles/me/skills/${skillId}`);
  },

  getMyInterests: async (): Promise<InterestResponse[]> => {
    const { data } = await authAxiosInstance.get<InterestResponse[]>(
      "/api/profiles/me/interests"
    );
    return data;
  },

  getMyExperiences: async (): Promise<ExperienceResponse[]> => {
    const { data } = await authAxiosInstance.get<ExperienceResponse[]>(
      "/api/profiles/me/experiences"
    );
    return data;
  },

  createExperience: async (
    payload: CreateExperienceRequest
  ): Promise<ExperienceResponse> => {
    const { data } = await authAxiosInstance.post<ExperienceResponse>(
      "/api/profiles/me/experiences",
      payload
    );
    return data;
  },

  updateExperience: async (
    id: string,
    payload: UpdateExperienceRequest
  ): Promise<ExperienceResponse> => {
    const { data } = await authAxiosInstance.put<ExperienceResponse>(
      `/api/profiles/me/experiences/${id}`,
      payload
    );
    return data;
  },

  deleteExperience: async (id: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/profiles/me/experiences/${id}`);
  },

  getMyProgress: async (): Promise<ProgressResponse[]> => {
    const { data } = await authAxiosInstance.get<ProgressResponse[]>(
      "/api/users/me/progress"
    );
    return data;
  },

  getLearningSessions: async (): Promise<LearningSessionResponse[]> => {
    const { data } = await authAxiosInstance.get<LearningSessionResponse[]>(
      "/api/learning-sessions"
    );
    return data;
  },

  getEducationalContent: async (): Promise<EducationalContentResponse[]> => {
    const { data } = await authAxiosInstance.get<EducationalContentResponse[]>(
      "/api/educational-content"
    );
    return data;
  },
};