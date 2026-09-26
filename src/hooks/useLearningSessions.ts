import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  learningSessionsApi,
  type CreateLearningSessionRequest,
  type UpdateLearningSessionRequest,
  type CreateRatingRequest,
} from "../api/learningSessions";
import { useAuthStore } from "../store/useAuthStore";
import { profileKeys } from "./useProfile";

export const learningSessionKeys = {
  all: ["learning-sessions"] as const,
  list: () => [...learningSessionKeys.all, "list"] as const,
  detail: (id: string) => [...learningSessionKeys.all, "detail", id] as const,
};

export function useLearningSessions() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: learningSessionKeys.list(),
    queryFn: learningSessionsApi.getAll,
    staleTime: 30_000,
    enabled: isAuthenticated,
  });
}

export function useLearningSession(id: string | null | undefined) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: learningSessionKeys.detail(id ?? ""),
    queryFn: () => learningSessionsApi.getById(id!),
    enabled: isAuthenticated && Boolean(id),
    staleTime: 30_000,
  });
}

export function useCreateLearningSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLearningSessionRequest) =>
      learningSessionsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learningSessionKeys.all });
      queryClient.invalidateQueries({ queryKey: profileKeys.sessions() });
    },
  });
}

export function useUpdateLearningSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateLearningSessionRequest;
    }) => learningSessionsApi.update(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: learningSessionKeys.all });
      queryClient.invalidateQueries({
        queryKey: learningSessionKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: profileKeys.sessions() });
    },
  });
}

export function useRateLearningSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      payload,
    }: {
      sessionId: string;
      payload: CreateRatingRequest;
    }) => learningSessionsApi.rate(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learningSessionKeys.all });
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
}