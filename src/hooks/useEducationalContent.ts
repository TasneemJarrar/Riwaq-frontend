import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  educationalContentApi,
  type CreateEducationalContentRequest,
} from "../api/educationalContent";

export const contentKeys = {
  all: ["educational-content"] as const,
  list: () => [...contentKeys.all, "list"] as const,
  detail: (id: string) => [...contentKeys.all, "detail", id] as const,
  comments: (id: string) => [...contentKeys.all, "comments", id] as const,
};

export function useEducationalContentList() {
  return useQuery({
    queryKey: contentKeys.list(),
    queryFn: educationalContentApi.getAll,
    staleTime: 60_000,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEducationalContentRequest) =>
      educationalContentApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
    },
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => educationalContentApi.like(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
    },
  });
}

export function useUnlikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => educationalContentApi.unlike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
    },
  });
}

export function useSavePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => educationalContentApi.save(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
    },
  });
}

export function useUnsavePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => educationalContentApi.unsave(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
    },
  });
}