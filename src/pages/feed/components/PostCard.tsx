import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FavouriteIcon,
  Bookmark02Icon,
  RepeatIcon,
  Comment01Icon,
} from "@hugeicons/core-free-icons";
import type { EducationalContentResponse } from "../../../api/profile";
import { profileApi } from "../../../api/profile";
import {
  useContentComments,
  usePublicProfile,
} from "../../../hooks/useProfile";
import { useAuthStore } from "../../../store/useAuthStore";

interface Props {
  post: EducationalContentResponse;
  recommendationLabel?: string | null;
}

function timeAgo(iso: string) {
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function isConflictError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    (err as { response?: { status?: number } }).response?.status === 409
  );
}

export default function PostCard({ post, recommendationLabel }: Props) {
  const { t } = useTranslation();
  const myUserId = useAuthStore((s) => s.user?.userId);

  const { data: author } = usePublicProfile(post.userId);
  const { data: comments = [] } = useContentComments(post.id);
  const commentCount = comments.length;

  const authorName =
    [author?.firstName, author?.lastName].filter(Boolean).join(" ") ||
    t("feed.post.userFallback", { id: post.userId.slice(0, 8) });

  const initials =
    authorName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || post.userId.slice(0, 2).toUpperCase();

  const authorPath =
    myUserId && post.userId === myUserId
      ? "/profile"
      : `/users/${post.userId}`;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const toggleLike = async () => {
    if (busy) return;
    setBusy("like");
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
    try {
      if (next) await profileApi.likeContent(post.id);
      else await profileApi.unlikeContent(post.id);
    } catch (err) {
      if (!isConflictError(err)) {
        setLiked(!next);
        setLikeCount((c) => (next ? Math.max(0, c - 1) : c + 1));
      }
    } finally {
      setBusy(null);
    }
  };

  const toggleSave = async () => {
    if (busy) return;
    setBusy("save");
    const next = !saved;
    setSaved(next);
    try {
      if (next) await profileApi.saveContent(post.id);
      else await profileApi.unsaveContent(post.id);
    } catch (err) {
      if (!isConflictError(err)) setSaved(!next);
    } finally {
      setBusy(null);
    }
  };

  const toggleRepost = async () => {
    if (busy) return;
    setBusy("repost");
    const next = !reposted;
    setReposted(next);
    try {
      if (next) await profileApi.repostContent(post.id);
      else await profileApi.unrepostContent(post.id);
    } catch (err) {
      if (!isConflictError(err)) setReposted(!next);
    } finally {
      setBusy(null);
    }
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-card">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to={authorPath}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-text transition hover:ring-2 hover:ring-primary/40"
            >
              {initials}
            </Link>
            <div>
              <Link
                to={authorPath}
                className="text-sm font-semibold text-text-primary hover:text-primary-text hover:underline"
              >
                {authorName}
              </Link>
              <p className="text-xs text-text-tertiary">
                {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-text">
            {post.contentType || t("feed.post.fallbackType")}
          </span>
        </div>

        {recommendationLabel && (
          <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary-subtle px-2.5 py-1 text-[11px] font-medium text-primary-text">
            ✦ {recommendationLabel}
          </p>
        )}

        <Link to={`/content/${post.id}`} className="mt-4 block">
          <h3 className="text-lg font-extrabold tracking-tight text-text-primary sm:text-xl">
            {post.title || t("feed.post.untitled")}
          </h3>

          {post.description && (
            <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm leading-7 text-text-secondary">
              {post.description}
            </p>
          )}

          {post.contentUrl && (
            <span className="mt-3 inline-block break-all text-sm font-semibold text-primary-text">
              {post.contentUrl}
            </span>
          )}
        </Link>
      </div>

      <div className="grid grid-cols-4 border-t border-border">
        <button
          type="button"
          onClick={toggleLike}
          disabled={busy === "like"}
          className={`flex flex-col items-center gap-0.5 py-3 text-xs font-semibold transition hover:bg-surface-soft ${
            liked ? "text-error" : "text-text-secondary"
          }`}
        >
          <HugeiconsIcon icon={FavouriteIcon} size={18} />
          <span className="flex items-center gap-1">
            {t("feed.post.like")}
            {likeCount > 0 && (
              <span className="text-[11px] opacity-80">{likeCount}</span>
            )}
          </span>
        </button>

        <Link
          to={`/content/${post.id}`}
          className="flex flex-col items-center gap-0.5 py-3 text-xs font-semibold text-text-secondary transition hover:bg-surface-soft"
        >
          <HugeiconsIcon icon={Comment01Icon} size={18} />
          <span className="flex items-center gap-1">
            {t("feed.post.comment")}
            {commentCount > 0 && (
              <span className="text-[11px] opacity-80">{commentCount}</span>
            )}
          </span>
        </Link>

        <button
          type="button"
          onClick={toggleRepost}
          disabled={busy === "repost"}
          className={`flex flex-col items-center gap-0.5 py-3 text-xs font-semibold transition hover:bg-surface-soft ${
            reposted ? "text-success-text" : "text-text-secondary"
          }`}
        >
          <HugeiconsIcon icon={RepeatIcon} size={18} />
          {t("feed.post.repost")}
        </button>

        <button
          type="button"
          onClick={toggleSave}
          disabled={busy === "save"}
          className={`flex flex-col items-center gap-0.5 py-3 text-xs font-semibold transition hover:bg-surface-soft ${
            saved ? "text-primary-text" : "text-text-secondary"
          }`}
        >
          <HugeiconsIcon icon={Bookmark02Icon} size={18} />
          {t("feed.post.save")}
        </button>
      </div>
    </article>
  );
}