import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  profileApi,
  type UpdateProfileRequest,
  type CreateExperienceRequest,
  type UpdateExperienceRequest,
  type CreateEducationalContentRequest,
  type UpdateEducationalContentRequest,
  type CreateCommentRequest,
  type CreateProgressRequest,
  type UpdateProgressRequest,
} from "../api/profile";
import { useAuthStore } from "../store/useAuthStore";
import { pointsApi } from "../api/points";

export const profileKeys = {
  all: ["profile"] as const,
  me: () => [...profileKeys.all, "me"] as const,
  skills: () => [...profileKeys.all, "skills"] as const,
  interests: () => [...profileKeys.all, "interests"] as const,
  experiences: () => [...profileKeys.all, "experiences"] as const,
  progress: () => [...profileKeys.all, "progress"] as const,
  sessions: () => [...profileKeys.all, "sessions"] as const,
  content: () => [...profileKeys.all, "content"] as const,
  points: () => [...profileKeys.all, "points"] as const,
  ratings: (userId: string) => [...profileKeys.all, "ratings", userId] as const,
};

export function useMyProfile() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: profileApi.getMe,
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileRequest) => profileApi.updateMe(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me() });
    },
  });
}

export function useMySkills() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: profileKeys.skills(),
    queryFn: profileApi.getMySkills,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}

export function useMyInterests() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: profileKeys.interests(),
    queryFn: profileApi.getMyInterests,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}

export function useAddMyInterest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interestId: string) =>
      profileApi.addMyInterest(interestId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.interests(),
      });
    },
  });
}

export function useRemoveMyInterest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interestId: string) =>
      profileApi.removeMyInterest(interestId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.interests(),
      });
    },
  });
}

export function useMyExperiences() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: profileKeys.experiences(),
    queryFn: profileApi.getMyExperiences,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}

export function useMyProgress() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: profileKeys.progress(),
    queryFn: profileApi.getMyProgress,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}

export function useMyLearningSessions() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: profileKeys.sessions(),
    queryFn: profileApi.getLearningSessions,
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}

export function useMyEducationalContent() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userId = useAuthStore((s) => s.user?.userId);

  return useQuery({
    queryKey: profileKeys.content(),
    queryFn: profileApi.getEducationalContent,
    enabled: isAuthenticated,
    staleTime: 60_000,
    select: (all) =>
      userId ? all.filter((item) => item.userId === userId) : all,
  });
}

export function useMyPointsBalance() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: profileKeys.points(),
    queryFn: pointsApi.getBalance,
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}

export function useUserRatings(userId: string | null | undefined) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: profileKeys.ratings(userId ?? ""),
    queryFn: () => profileApi.getUserRatings(userId!),
    enabled: isAuthenticated && !!userId,
    staleTime: 60_000,
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateExperienceRequest) =>
      profileApi.createExperience(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.experiences() });
    },
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateExperienceRequest;
    }) => profileApi.updateExperience(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.experiences() });
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => profileApi.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.experiences() });
    },
  });
}

export function useCreateEducationalContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEducationalContentRequest) =>
      profileApi.createEducationalContent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.content() });
    },
  });
}

export function useUpdateEducationalContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateEducationalContentRequest;
    }) => profileApi.updateEducationalContent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.content() });
    },
  });
}

export function useDeleteEducationalContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => profileApi.deleteEducationalContent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.content() });
    },
  });
}

export const contentKeys = {
  detail: (id: string) => ["content", "detail", id] as const,
  comments: (id: string) => ["content", "comments", id] as const,
};

export function useEducationalContent(id: string | undefined) {
  return useQuery({
    queryKey: contentKeys.detail(id ?? ""),
    queryFn: () => profileApi.getEducationalContentById(id!),
    enabled: !!id,
  });
}

export function useContentComments(id: string | undefined) {
  return useQuery({
    queryKey: contentKeys.comments(id ?? ""),
    queryFn: () => profileApi.getComments(id!),
    enabled: !!id,
  });
}

export function useCreateComment(contentId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCommentRequest) =>
      profileApi.createComment(contentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: contentKeys.comments(contentId),
      });
    },
  });
}

export function useUpdateComment(contentId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string | null;
    }) => profileApi.updateComment(commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: contentKeys.comments(contentId),
      });
    },
  });
}

export function useDeleteComment(contentId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => profileApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: contentKeys.comments(contentId),
      });
    },
  });
}

export function usePublicProfile(userId: string | undefined) {
  return useQuery({
    queryKey: [...profileKeys.all, "public", userId ?? ""],
    queryFn: () => profileApi.getPublic(userId!),
    enabled: !!userId,
    staleTime: 60_000,
  });
}

export function useAllEducationalContent() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...profileKeys.content(), "all"],
    queryFn: profileApi.getEducationalContent,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}

export function useCreateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProgressRequest) =>
      profileApi.createProgress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.progress() });
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProgressRequest;
    }) => profileApi.updateProgress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.progress() });
    },
  });
}

export function useDeleteProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => profileApi.deleteProgress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.progress() });
    },
  });
}