import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Share08Icon,
  ShieldEllipsisIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";

import { usePublicProfile, useUserRatings } from "../../hooks/useProfile";
import { useAuthStore } from "../../store/useAuthStore";

import {
  useSentConnectionRequests,
  useAcceptedConnections,
  useSendConnectionRequest,
  useDeleteConnection,
} from "../../hooks/useConnections";

import RequestVerificationModal from "./components/RequestVerificationModal";

export default function PublicProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const myUserId = useAuthStore((s) => s.user?.userId);

  const [shared, setShared] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

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
  const deleteConnection = useDeleteConnection();

  if (myUserId && userId === myUserId) {
    return <Navigate to="/profile" replace />;
  }

  const connection = acceptedConnections.find(
    (c) => c.userAId === userId || c.userBId === userId
  );

  const isConnected = Boolean(connection);

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

  const learningDirection = profile?.learningDirectionName?.trim();
  const university = profile?.university?.trim();
  const bio = profile?.bio?.trim();

  const hasPublicDetails = Boolean(learningDirection || university);
  const hasBio = Boolean(bio);

  const avgRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, rating) => sum + rating.score, 0) /
          ratings.length
        ).toFixed(1)
      : null;

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "?";

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: displayName || "Riwaq",
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }

      setShared(true);
    } catch {
      // User cancelled sharing.
    }
  };

  const handleConnect = () => {
    if (!userId || isConnected || isPending || sendRequest.isPending) {
      return;
    }

    sendRequest.mutate(userId);
  };

  const handleRemoveConnection = () => {
    if (!connection?.id || deleteConnection.isPending) {
      return;
    }

    deleteConnection.mutate(connection.id);
  };

  const handleMessage = () => {
    navigate(`/chat?userId=${userId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-surface-2" />

          <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-surface-2">
            <div className="h-64 animate-pulse bg-surface-2" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 text-center">
        <p className="text-sm text-error">
          {t("profile.error.description")}
        </p>

        <Link
          to="/feed"
          className="mt-4 inline-flex text-sm font-semibold text-primary-text"
        >
          {t("contentDetail.back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-text-primary">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Back */}
        <Link
          to="/feed"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          {t("contentDetail.back")}
        </Link>

        {/* Profile card */}
        <section className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-card">
          {/* Profile header */}
          <div className="bg-gradient-to-br from-primary-soft/40 to-surface-2 px-5 py-7 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* User identity */}
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-soft text-2xl font-bold text-primary-text ring-4 ring-surface-2 sm:h-24 sm:w-24">
                  {initials}
                </div>

                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {displayName}
                  </h1>

                  {learningDirection && (
                    <p className="mt-1 text-sm font-medium text-text-secondary">
                      {learningDirection}
                    </p>
                  )}

                  {university && (
                    <p className="mt-1 text-sm text-text-tertiary">
                      {university}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {/* Share */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-1 px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-soft hover:text-text-primary"
                >
                  <HugeiconsIcon icon={Share08Icon} size={16} />

                  {shared
                    ? `${t("feed.post.share")} ✓`
                    : t("feed.post.share")}
                </button>

                {/* Request skill verification */}
                <button
                  type="button"
                  onClick={() => setIsVerifyOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-1 px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-soft hover:text-text-primary"
                >
                  <HugeiconsIcon icon={ShieldEllipsisIcon} size={16} />
                  {t("profile.verification.request", {
                    defaultValue: "Verify skill",
                  })}
                </button>

                {/* Relationship action */}
                {relationshipLoading ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center rounded-full border border-border bg-surface-1 px-5 py-2 text-sm font-semibold text-text-secondary opacity-60"
                  >
                    …
                  </button>
                ) : isConnected ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleMessage}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-hover"
                    >
                      Message
                    </button>

                    <button
                      type="button"
                      onClick={handleRemoveConnection}
                      disabled={deleteConnection.isPending}
                      className="inline-flex items-center rounded-full border border-error bg-surface-1 px-4 py-2 text-sm font-semibold text-error transition-colors hover:bg-error/5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deleteConnection.isPending
                        ? t("profile.removingConnection")
                        : t("profile.removeConnection")}
                    </button>
                  </div>
                ) : isPending ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center rounded-full border border-border bg-surface-1 px-5 py-2 text-sm font-semibold text-text-secondary opacity-80"
                  >
                    Pending
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={sendRequest.isPending || !userId}
                    onClick={handleConnect}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
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

          {/* Public profile details */}
          {hasPublicDetails && (
            <div className="border-t border-border px-5 py-5 sm:px-8">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {learningDirection && (
                  <div className="rounded-2xl bg-surface-soft px-4 py-3">
                    <p className="text-xs font-medium text-text-tertiary">
                      {t("profile.learningDirection")}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-text-primary">
                      {learningDirection}
                    </p>
                  </div>
                )}

                {university && (
                  <div className="rounded-2xl bg-surface-soft px-4 py-3">
                    <p className="text-xs font-medium text-text-tertiary">
                      University
                    </p>

                    <p className="mt-1 text-sm font-semibold text-text-primary">
                      {university}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* About */}
          {hasBio && (
            <div className="border-t border-border px-5 py-5 sm:px-8">
              <h2 className="text-sm font-semibold text-text-primary">
                {t("profile.aboutTitle")}
              </h2>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-text-secondary">
                {bio}
              </p>
            </div>
          )}

          {/* Empty profile state */}
          {!hasPublicDetails && !hasBio && ratings.length === 0 && (
            <div className="border-t border-border px-5 py-8 text-center sm:px-8">
              <p className="text-sm text-text-tertiary">
                No additional profile information yet.
              </p>
            </div>
          )}

          {/* Rating summary */}
          {avgRating && (
            <div className="border-t border-border px-5 py-5 sm:px-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-4 py-2">
                <span className="text-sm font-bold text-gamification-text">
                  ★ {avgRating}
                </span>

                <span className="text-xs text-text-tertiary">
                  {ratings.length} {t("profile.tabs.reviews")}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Reviews */}
        {!ratingsLoading && ratings.length > 0 && (
          <section className="mt-6 rounded-3xl border border-border bg-surface-2 p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">
                {t("profile.tabs.reviews")}
              </h2>

              {avgRating && (
                <span className="text-sm font-semibold text-gamification-text">
                  ★ {avgRating}
                </span>
              )}
            </div>

            <div className="mt-4 space-y-4">
              {ratings.map((rating) => {
                const raterName = [
                  rating.rater?.firstName,
                  rating.rater?.lastName,
                ]
                  .filter(Boolean)
                  .join(" ")
                  .trim() || t("profile.unknownUser");

                return (
                  <div
                    key={rating.id}
                    className="rounded-2xl border border-border bg-surface-soft p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-text-primary">
                        {raterName}
                      </p>
                      <span className="text-sm font-bold text-gamification-text">
                        ★ {rating.score}
                      </span>
                    </div>

                    {rating.review && (
                      <p className="mt-2 text-sm leading-6 text-text-secondary">
                        {rating.review}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {isVerifyOpen && userId && (
        <RequestVerificationModal
          mentorUserId={userId}
          mentorName={displayName}
          onClose={() => setIsVerifyOpen(false)}
        />
      )}
    </div>
  );
}