import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FeedComposer from "./components/FeedComposer";
import FeedFilters, {
  type FeedFilterKey,
} from "./components/FeedFilters";
import PostCard from "./components/PostCard";
import SwapRequestCard from "./components/SwapRequestCard";
import SuggestedSwapCard from "./components/SuggestedSwapCard";
import WeeklyGoalCard from "./components/WeeklyGoalCard";
import ActiveNodesCard from "./components/ActiveNodesCard";
import { useAllEducationalContent } from "../../hooks/useProfile";
import {
  usePostRecommendations,
  usePeopleRecommendations,
} from "../../hooks/useRecommendations";
import {
  connectionsApi,
  type ConnectionRequestResponse,
} from "../../api/connections";
import { connectionKeys } from "../../hooks/useConnections";
import type { EducationalContentResponse } from "../../api/profile";

type FeedPostItem = {
  post: EducationalContentResponse;
  label: string | null;
};

export default function FeedPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FeedFilterKey>("curated");
  const queryClient = useQueryClient();

  const { data: allPosts, isLoading: loadingList } = useAllEducationalContent();
  const { data: recommended, isLoading: loadingRec } =
    usePostRecommendations(12);
  const { data: peopleRec } = usePeopleRecommendations(4);

  const {
    data: receivedRequests = [],
    isLoading: loadingRequests,
  } = useQuery<ConnectionRequestResponse[]>({
    queryKey: [...connectionKeys.all, "received"],
    queryFn: connectionsApi.getReceived,
    enabled: filter === "swap",
    staleTime: 30_000,
  });

  const sendRequest = useMutation({
    mutationFn: (receiverUserId: string) =>
      connectionsApi.send(receiverUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: connectionKeys.all });
    },
  });

  const updateRequest = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "Accepted" | "Rejected";
    }) => connectionsApi.updateStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: connectionKeys.all });
    },
  });

  const posts: FeedPostItem[] =
    filter === "curated" && recommended?.items
      ? recommended.items.map((item) => ({
          post: item.post,
          label: item.primaryTopic
            ? t("feed.post.recommendedTopic", { topic: item.primaryTopic })
            : t("feed.post.recommended"),
        }))
      : (allPosts ?? []).map((post: EducationalContentResponse) => ({
          post,
          label: null,
        }));

  const isLoadingPosts = filter === "curated" ? loadingRec : loadingList;

  const pendingRequests = receivedRequests.filter(
    (r: ConnectionRequestResponse) => {
      const s = (r.status ?? "Pending").toLowerCase();
      return s === "pending" || s === "requested";
    }
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <FeedComposer />
          <FeedFilters active={filter} onChange={setFilter} />

          {filter === "curated" && (
            <>
              {isLoadingPosts ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-48 animate-pulse rounded-3xl bg-surface-2"
                    />
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="rounded-3xl border border-border bg-surface-2 p-10 text-center text-text-secondary">
                  {t("feed.empty")}
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map(({ post, label }) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      recommendationLabel={label}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {filter === "swap" && (
            <>
              {loadingRequests ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-28 animate-pulse rounded-3xl bg-surface-2"
                    />
                  ))}
                </div>
              ) : pendingRequests.length === 0 ? (
                <div className="rounded-3xl border border-border bg-surface-2 p-10 text-center text-text-secondary">
                  {t("feed.swap.empty", {
                    defaultValue: "No peer swap requests right now.",
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((req: ConnectionRequestResponse) => (
                    <SwapRequestCard
                      key={req.id}
                      request={req}
                      isUpdating={updateRequest.isPending}
                      onAccept={(id) =>
                        updateRequest.mutate({ id, status: "Accepted" })
                      }
                      onDecline={(id) =>
                        updateRequest.mutate({ id, status: "Rejected" })
                      }
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <aside className="space-y-5">
          <WeeklyGoalCard />

          <div className="rounded-3xl border border-border bg-surface-2 p-4 shadow-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">
                {t("feed.sidebar.suggestedSwaps")}
              </h3>
              <button
                type="button"
                className="text-xs font-medium text-primary-text hover:underline"
              >
                {t("feed.sidebar.viewAll")}
              </button>
            </div>

            <div className="space-y-3">
              {peopleRec?.recommendations &&
              peopleRec.recommendations.length > 0 ? (
                peopleRec.recommendations.map((item) => (
                  <SuggestedSwapCard
                    key={item.profile.userId}
                    item={item}
                    onRequestSwap={(userId) => sendRequest.mutate(userId)}
                    isLoading={sendRequest.isPending}
                  />
                ))
              ) : (
                <p className="text-sm text-text-tertiary">
                  {t("feed.sidebar.noSuggestions")}
                </p>
              )}
            </div>
          </div>

          <ActiveNodesCard />
        </aside>
      </div>
    </div>
  );
}