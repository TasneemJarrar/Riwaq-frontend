import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi, type UpdateProfileRequest } from "../api/profile";
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