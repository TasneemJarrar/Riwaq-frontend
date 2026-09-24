import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  connectionsApi,
  type ConnectionRequestResponse,
  type UpdateConnectionRequestStatusRequest,
} from "../api/connections";
import { useAuthStore } from "../store/useAuthStore";

export const connectionKeys = {
  all: ["connections"] as const,
  received: () => [...connectionKeys.all, "received"] as const,
  sent: () => [...connectionKeys.all, "sent"] as const,
  accepted: () => [...connectionKeys.all, "accepted"] as const,
};

export interface EarnRequestItem {
  id: string;
  tag: string;
  tagClassName: string;
  title: string;
  eta: string;
  status: string | null;
  senderName: string;
}

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `~${Math.max(1, diffMins)} mins`;
  if (diffHours < 24) return `~${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function displayName(
  user: ConnectionRequestResponse["sender"] | null | undefined
): string {
  if (!user) return "Someone";
  const first = user.firstName?.trim() ?? "";
  const last = user.lastName?.trim() ?? "";
  const full = `${first} ${last}`.trim();
  return full || "Someone";
}

export function mapReceivedToEarnRequest(
  req: ConnectionRequestResponse
): EarnRequestItem {
  const name = displayName(req.sender);
  const direction = req.sender?.learningDirectionName?.trim();

  const tag = direction || "Connection";
  const title = direction
    ? `${name} wants to connect · ${direction}`
    : `${name} wants to connect with you`;

  const tagClassName =
    tag.toLowerCase().includes("design") || tag.toLowerCase().includes("ui")
      ? "bg-gamification-soft text-gamification-text"
      : "bg-success-soft text-success-text";

  return {
    id: req.id,
    tag,
    tagClassName,
    title,
    eta: formatRelativeDate(req.createdAt),
    status: req.status,
    senderName: name,
  };
}

export function useReceivedConnectionRequests() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: connectionKeys.received(),
    queryFn: connectionsApi.getReceived,
    staleTime: 30_000,
    enabled: isAuthenticated,
    select: (data: ConnectionRequestResponse[]) => {
      const pending = data.filter((r) => {
        const s = (r.status ?? "").toLowerCase();
        return (
          !s ||
          s === "pending" ||
          s === "sent" ||
          s === "requested" ||
          s === "open"
        );
      });
      const source = pending.length > 0 ? pending : data;
      return source.map(mapReceivedToEarnRequest);
    },
  });
}

export function useUpdateConnectionRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: UpdateConnectionRequestStatusRequest["status"];
    }) => connectionsApi.updateStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: connectionKeys.all });
    },
  });
}

export function useSentConnectionRequests() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: connectionKeys.sent(),
    queryFn: connectionsApi.getSent,
    staleTime: 15_000,
    enabled: isAuthenticated,
  });
}

export function useAcceptedConnections() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: connectionKeys.accepted(),
    queryFn: connectionsApi.getConnections,
    staleTime: 15_000,
    enabled: isAuthenticated,
  });
}

export function useSendConnectionRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (receiverUserId: string) => connectionsApi.send(receiverUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: connectionKeys.all });
    },
  });
}