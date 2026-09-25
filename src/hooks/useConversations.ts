import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  conversationsApi,
  type SendMessageRequest,
  type UpdateMessageRequest,
} from "../api/conversations";
import { useAuthStore } from "../store/useAuthStore";

export const conversationKeys = {
  all: ["conversations"] as const,
  list: () => [...conversationKeys.all, "list"] as const,
  detail: (id: string) => [...conversationKeys.all, "detail", id] as const,
  messages: (id: string) => [...conversationKeys.all, "messages", id] as const,
};

export function useConversations() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: conversationKeys.list(),
    queryFn: conversationsApi.getAll,
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}

export function useConversation(id: string | null) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: conversationKeys.detail(id ?? ""),
    queryFn: () => conversationsApi.getById(id!),
    enabled: isAuthenticated && !!id,
    staleTime: 30_000,
  });
}

export function useMessages(conversationId: string | null) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: conversationKeys.messages(conversationId ?? ""),
    queryFn: () => conversationsApi.getMessages(conversationId!),
    enabled: isAuthenticated && !!conversationId,
    staleTime: 10_000,
  });
}

export function useSendMessage(conversationId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessageRequest) => {
      if (!conversationId) {
        throw new Error("No conversation selected");
      }

      return conversationsApi.sendMessage(conversationId, payload);
    },
    onSuccess: () => {
      if (!conversationId) return;

      queryClient.invalidateQueries({
        queryKey: conversationKeys.messages(conversationId),
      });

      queryClient.invalidateQueries({
        queryKey: conversationKeys.list(),
      });
    },
  });
}

export function useUpdateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      messageId,
      payload,
    }: {
      messageId: string;
      payload: UpdateMessageRequest;
    }) => conversationsApi.updateMessage(messageId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: conversationKeys.all,
      });
    },
  });
}