import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Share08Icon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { usePublicProfile, useUserRatings } from "../../hooks/useProfile";
import { useAuthStore } from "../../store/useAuthStore";
import {
  useSentConnectionRequests,
  useAcceptedConnections,
  useSendConnectionRequest,
} from "../../hooks/useConnections";

export default function PublicProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const myUserId = useAuthStore((s) => s.user?.userId);
  const [shared, setShared] = useState(false);

  const {
    data: profile,
    isLoading,
    isError,
  } = usePublicProfile(userId);

  const { data: ratings = [], isLoading: ratingsLoading } =
    useUserRatings(userId);

  const { data: sentRequests = [], isLoading: sentLoading } =
    useSentConnectionRequests();
  const { data: acceptedConnections = [], isLoading: connectionsLoading } =
    useAcceptedConnections();
  const sendRequest = useSendConnectionRequest();

  // Redirect if viewing own profile
  if (myUserId && userId === myUserId) {
    return <Navigate to="/profile" replace />;
  }

  // Relationship status
  const isConnected = acceptedConnections.some(
    (c) => c.userAId === userId || c.userBId === userId
  );

  const isPending = sentRequests.some((r) => {
    const receiverId = r.receiverUserId ?? r.receiver?.userId ?? null;
    const status = (r.status ?? "").toLowerCase();
    const isPendingStatus =
      !status ||
      status === "pending" ||
      status === "sent" ||
      status === "requested" ||
      status === "open";

    return receiverId === userId && isPendingStatus;
  });

  const relationshipLoading = sentLoading || connectionsLoading;

  const displayName = profile
    ? [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
      t("profile.unknownUser")
    : "";

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: displayName || "Riwaq", url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
    } catch {
      // user cancelled
    }
  };

  const handleConnect = () => {
    if (!userId || isConnected || isPending || sendRequest.isPending) return;
    sendRequest.mutate(userId);
  };

  const handleMessage = () => {
    navigate(`/chat?userId=${userId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="h-72 animate-pulse rounded-3xl bg-surface-2" />
          <div className="h-40 animate-pulse rounded-3xl bg-surface-2" />
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 text-center">
        <p className="text-sm text-error">{t("profile.error.description")}</p>
        <Link
          to="/feed"
          className="mt-4 inline-flex text-sm font-semibold text-primary-text"
        >
          {t("contentDetail.back")}
        </Link>
      </div>
    );
  }

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const avgRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        ).toFixed(1)
      : null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-text-primary">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Link
          to="/feed"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          {t("contentDetail.back")}
        </Link>

        <section className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-card">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-primary-soft/40 to-surface-2 px-5 pb-6 pt-8 sm:px-8 sm:pt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-soft text-2xl font-bold text-primary-text ring-4 ring-surface-2 sm:h-24 sm:w-24">
                  {initials || "?"}
                </div>
                <div className="pb-1">
                  <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {displayName}
                  </h1>
                  {profile.learningDirectionName && (
                    <p className="mt-1 text-sm text-text-secondary">
                      {profile.learningDirectionName}
                    </p>
                  )}
                  {profile.university && (
                    <p className="mt-0.5 text-xs text-text-tertiary">
                      {profile.university}
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-1 px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-surface-soft hover:text-text-primary"
                >
                  <HugeiconsIcon icon={Share08Icon} size={16} />
                  {shared
                    ? `${t("feed.post.share")} ✓`
                    : t("feed.post.share")}
                </button>

                {relationshipLoading ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-1 px-4 py-2 text-sm font-semibold text-text-secondary opacity-60"
                  >
                    …
                  </button>
                ) : isConnected ? (
                  <button
                    type="button"
                    onClick={handleMessage}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover"
                  >
                    Message
                  </button>
                ) : isPending ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-1 px-4 py-2 text-sm font-semibold text-text-secondary opacity-80"
                  >
                    Pending
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={sendRequest.isPending || !userId}
                    onClick={handleConnect}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover disabled:opacity-60"
                  >
                    <HugeiconsIcon icon={UserAdd01Icon} size={16} />
                    {sendRequest.isPending
                      ? "Sending…"
                      : t("feed.sidebar.requestSwap")}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 border-t border-border px-5 py-4 sm:grid-cols-3 sm:px-8">
            <div className="rounded-2xl bg-surface-soft px-4 py-3 text-center">
              <p className="text-lg font-bold text-gamification-text">
                {profile.points}
              </p>
              <p className="text-xs text-text-tertiary">{t("profile.points")}</p>
            </div>
            {avgRating && (
              <div className="rounded-2xl bg-surface-soft px-4 py-3 text-center">
                <p className="text-lg font-bold text-text-primary">
                  ★ {avgRating}
                </p>
                <p className="text-xs text-text-tertiary">
                  {ratings.length} {t("profile.tabs.reviews")}
                </p>
              </div>
            )}
            {profile.learningDirectionName && (
              <div className="col-span-2 rounded-2xl bg-surface-soft px-4 py-3 text-center sm:col-span-1">
                <p className="truncate text-sm font-semibold text-text-primary">
                  {profile.learningDirectionName}
                </p>
                <p className="text-xs text-text-tertiary">
                  {t("profile.learningDirection")}
                </p>
              </div>
            )}
          </div>

          {/* About */}
          <div className="border-t border-border px-5 py-5 sm:px-8">
            <h2 className="text-sm font-semibold text-text-primary">
              {t("profile.aboutTitle")}
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-text-secondary">
              {profile.bio?.trim() || t("profile.noBio")}
            </p>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-6 rounded-3xl border border-border bg-surface-2 p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-bold">{t("profile.tabs.reviews")}</h2>

          {ratingsLoading ? (
            <div className="mt-4 h-20 animate-pulse rounded-xl bg-surface-soft" />
          ) : ratings.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {ratings.slice(0, 8).map((r) => {
                const raterName =
                  [r.rater.firstName, r.rater.lastName]
                    .filter(Boolean)
                    .join(" ") || t("profile.unknownUser");

                return (
                  <li
                    key={r.id}
                    className="rounded-xl border border-border bg-surface-soft p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-text-primary">
                        {raterName}
                      </span>
                      <span className="text-xs font-medium text-gamification-text">
                        ★ {r.score}
                      </span>
                    </div>
                    {r.review && (
                      <p className="mt-1.5 text-sm leading-6 text-text-secondary">
                        {r.review}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-text-tertiary">
              {t("profile.comingSoon.reviews")}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}