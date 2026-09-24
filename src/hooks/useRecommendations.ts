import { useQuery } from "@tanstack/react-query";
import { recommendationsApi } from "../api/recommendations";
import { useAuthStore } from "../store/useAuthStore";

export const recommendationKeys = {
  all: ["recommendations"] as const,
  posts: (limit: number) => [...recommendationKeys.all, "posts", limit] as const,
  people: (topN: number) => [...recommendationKeys.all, "people", topN] as const,
};

export function usePostRecommendations(limit = 10) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: recommendationKeys.posts(limit),
    queryFn: () => recommendationsApi.getPostRecommendations(limit),
    staleTime: 2 * 60_000,
    enabled: isAuthenticated,
  });
}

export function usePeopleRecommendations(topN = 5) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: recommendationKeys.people(topN),
    queryFn: () => recommendationsApi.getPeopleRecommendations(topN),
    staleTime: 2 * 60_000,
    enabled: isAuthenticated,
  });
}