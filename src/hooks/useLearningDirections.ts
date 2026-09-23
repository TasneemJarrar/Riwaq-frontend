import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLearningDirections,
  getLearningDirection,
  getSkills,
  selectLearningDirection,
} from "../api/learningDirections";
import { profileKeys } from "./useProfile";

export const useLearningDirections = () =>
  useQuery({
    queryKey: ["learning-directions"],
    queryFn: getLearningDirections,
  });

export const useLearningDirection = (id: string | null) =>
  useQuery({
    queryKey: ["learning-direction", id],
    queryFn: () => getLearningDirection(id!),
    enabled: !!id,
  });

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
    staleTime: 5 * 60_000,
  });

export function useUpdateLearningDirection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillId: string) => selectLearningDirection(skillId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me() });
    },
  });
}