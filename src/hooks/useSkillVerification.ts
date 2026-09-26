import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  skillVerificationApi,
  type CreateSkillVerificationRequest,
  type UpdateSkillVerificationRequest,
} from "../api/skillVerification";
import { useAuthStore } from "../store/useAuthStore";

export const skillVerificationKeys = {
  all: ["skill-verification"] as const,
  sent: () => [...skillVerificationKeys.all, "sent"] as const,
  received: () => [...skillVerificationKeys.all, "received"] as const,
};

export function useSentSkillVerificationRequests() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: skillVerificationKeys.sent(),
    queryFn: skillVerificationApi.getSent,
    staleTime: 30_000,
    enabled: isAuthenticated,
  });
}

export function useReceivedSkillVerificationRequests() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: skillVerificationKeys.received(),
    queryFn: skillVerificationApi.getReceived,
    staleTime: 30_000,
    enabled: isAuthenticated,
  });
}

export function useCreateSkillVerificationRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSkillVerificationRequest) =>
      skillVerificationApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: skillVerificationKeys.all,
      });
    },
  });
}

export function useUpdateSkillVerificationRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSkillVerificationRequest;
    }) => skillVerificationApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: skillVerificationKeys.all,
      });
    },
  });
}