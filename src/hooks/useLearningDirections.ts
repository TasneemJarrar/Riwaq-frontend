import { useQuery } from "@tanstack/react-query";
import {
  getLearningDirections,
  getLearningDirection,
} from "../api/learningDirections";

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