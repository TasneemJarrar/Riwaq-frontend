import authAxiosInstance from "./authAxiosInstance";
import type { EducationalContentResponse, PublicUserProfileResponse } from "./profile";

export interface PostRecommendationItem {
  post: EducationalContentResponse;
  rank: number;
  score: number;
  reasonCodes: string[] | null;
  primaryTopic: string | null;
}

export interface PostRecommendationResponse {
  requestId: string | null;
  modelVersion: string | null;
  count: number;
  items: PostRecommendationItem[] | null;
}

export interface PersonRecommendationItem {
  rank: number;
  profile: PublicUserProfileResponse;
  similarityScore: number;
  sharedSkills: string[] | null;
  sharedInterests: string[] | null;
  sameLearningDirection: boolean;
}

export interface PersonRecommendationResponse {
  requestId: string | null;
  profileId: string | null;
  processingStatus: string | null;
  processedAt: string;
  recommendations: PersonRecommendationItem[] | null;
  recommendationCount: number;
  lowConfidence: boolean;
}

export const recommendationsApi = {
  getPostRecommendations: async (
    limit = 10
  ): Promise<PostRecommendationResponse> => {
    const { data } = await authAxiosInstance.post<PostRecommendationResponse>(
      `/api/v1/recommendations/posts?limit=${limit}`
    );
    return data;
  },

  getPeopleRecommendations: async (
    topN = 5
  ): Promise<PersonRecommendationResponse> => {
    const { data } = await authAxiosInstance.get<PersonRecommendationResponse>(
      `/api/recommendations/people?topN=${topN}`
    );
    return data;
  },
};