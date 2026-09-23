import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../api/profile";
import { useAuthStore } from "../store/useAuthStore";
import { profileKeys } from "./useProfile";

export function useProfileSkills() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const queryClient = useQueryClient();

  const { data: profileSkills = [], isLoading } = useQuery({
    queryKey: profileKeys.skills(),
    queryFn: profileApi.getMySkills,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });

  const addMutation = useMutation({
    mutationFn: (skillId: string) => profileApi.addMySkill(skillId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.skills() });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (skillId: string) => profileApi.removeMySkill(skillId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.skills() });
    },
  });

  return {
    profileSkills,
    isLoading,
    addSkill: addMutation.mutateAsync,
    removeSkill: removeMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
}
