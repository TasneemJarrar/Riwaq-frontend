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

export interface CreateProgressRequest {
  learningDirectionId: string;
  level?: string | null;
  startedAt: string;
}

export interface UpdateProgressRequest {
  level?: string | null;
  startedAt?: string;
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

export interface CreateEducationalContentRequest {
  title: string | null;
  description: string | null;
  contentType: string | null;
  contentUrl: string | null;
}

export interface UpdateEducationalContentRequest {
  title: string | null;
  description: string | null;
  contentType: string | null;
  contentUrl: string | null;
}

/** Ratings */
export interface RatingResponse {
  id: string;
  score: number;
  review: string | null;
  rater: PublicUserProfileResponse;
  ratedUser: PublicUserProfileResponse;
  learningSessionId: string;
  createdAt: string;
}

/** Comments */
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
  content: string | null;
  parentCommentId?: string | null;
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

  getInterests: async (): Promise<InterestResponse[]> => {
    const { data } = await authAxiosInstance.get<InterestResponse[]>(
      "/api/interests"
    );

    return data;
  },

  getMyInterests: async (): Promise<InterestResponse[]> => {
    const { data } = await authAxiosInstance.get<InterestResponse[]>(
      "/api/profiles/me/interests"
    );
    return data;
  },

  addMyInterest: async (interestId: string): Promise<InterestResponse> => {
    const { data } = await authAxiosInstance.put<InterestResponse>(
      `/api/profiles/me/interests/${interestId}`
    );
    return data;
  },

  removeMyInterest: async (interestId: string): Promise<void> => {
    await authAxiosInstance.delete(
      `/api/profiles/me/interests/${interestId}`
    );
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

  createProgress: async (
    payload: CreateProgressRequest
  ): Promise<ProgressResponse> => {
    const { data } = await authAxiosInstance.post<ProgressResponse>(
      "/api/users/me/progress",
      payload
    );
    return data;
  },

  getProgressById: async (id: string): Promise<ProgressResponse> => {
    const { data } = await authAxiosInstance.get<ProgressResponse>(
      `/api/users/me/progress/${id}`
    );
    return data;
  },

  updateProgress: async (
    id: string,
    payload: UpdateProgressRequest
  ): Promise<ProgressResponse> => {
    const { data } = await authAxiosInstance.put<ProgressResponse>(
      `/api/users/me/progress/${id}`,
      payload
    );
    return data;
  },

  deleteProgress: async (id: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/users/me/progress/${id}`);
  },

  getLearningSessions: async (): Promise<LearningSessionResponse[]> => {
    const { data } = await authAxiosInstance.get<LearningSessionResponse[]>(
      "/api/learning-sessions"
    );

    return data;
  },

  getEducationalContent: async (): Promise<
    EducationalContentResponse[]
  > => {
    const { data } = await authAxiosInstance.get<
      EducationalContentResponse[]
    >("/api/educational-content");

    return data;
  },

  createEducationalContent: async (
    payload: CreateEducationalContentRequest
  ): Promise<EducationalContentResponse> => {
    const { data } =
      await authAxiosInstance.post<EducationalContentResponse>(
        "/api/educational-content",
        payload
      );

    return data;
  },

  updateEducationalContent: async (
    id: string,
    payload: UpdateEducationalContentRequest
  ): Promise<EducationalContentResponse> => {
    const { data } =
      await authAxiosInstance.patch<EducationalContentResponse>(
        `/api/educational-content/${id}`,
        payload
      );

    return data;
  },

  deleteEducationalContent: async (id: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/educational-content/${id}`);
  },

  getEducationalContentById: async (
    id: string
  ): Promise<EducationalContentResponse> => {
    const { data } =
      await authAxiosInstance.get<EducationalContentResponse>(
        `/api/educational-content/${id}`
      );

    return data;
  },

  likeContent: async (id: string): Promise<void> => {
    await authAxiosInstance.post(`/api/educational-content/${id}/likes`);
  },

  unlikeContent: async (id: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/educational-content/${id}/likes`);
  },

  saveContent: async (id: string): Promise<void> => {
    await authAxiosInstance.post(`/api/educational-content/${id}/saves`);
  },

  unsaveContent: async (id: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/educational-content/${id}/saves`);
  },

  repostContent: async (id: string): Promise<void> => {
    await authAxiosInstance.post(`/api/educational-content/${id}/reposts`);
  },

  unrepostContent: async (id: string): Promise<void> => {
    await authAxiosInstance.delete(
      `/api/educational-content/${id}/reposts`
    );
  },

  shareContent: async (id: string): Promise<void> => {
    await authAxiosInstance.post(`/api/educational-content/${id}/shares`);
  },

  getUserRatings: async (
    userId: string
  ): Promise<RatingResponse[]> => {
    const { data } = await authAxiosInstance.get<RatingResponse[]>(
      `/api/profiles/${userId}/ratings`
    );

    return data;
  },

  getComments: async (
    contentId: string
  ): Promise<CommentResponse[]> => {
    const { data } = await authAxiosInstance.get<CommentResponse[]>(
      `/api/educational-content/${contentId}/comments`
    );

    return data;
  },

  createComment: async (
    contentId: string,
    payload: CreateCommentRequest
  ): Promise<CommentResponse> => {
    const { data } = await authAxiosInstance.post<CommentResponse>(
      `/api/educational-content/${contentId}/comments`,
      payload
    );

    return data;
  },

  updateComment: async (
    commentId: string,
    payload: { content: string | null }
  ): Promise<CommentResponse> => {
    const { data } = await authAxiosInstance.patch<CommentResponse>(
      `/api/comments/${commentId}`,
      payload
    );

    return data;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/comments/${commentId}`);
  },
};