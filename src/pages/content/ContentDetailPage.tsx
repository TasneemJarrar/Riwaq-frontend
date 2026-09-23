import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FavouriteIcon,
  Bookmark02Icon,
  Share08Icon,
  RepeatIcon,
  ArrowLeft01Icon,
  Edit02Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { profileApi } from "../../api/profile";
import type { CommentResponse } from "../../api/profile";
import {
  useEducationalContent,
  useContentComments,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
  useUpdateEducationalContent,
  useDeleteEducationalContent,
} from "../../hooks/useProfile";
import { useAuthStore } from "../../store/useAuthStore";
import ContentModal, {
  type ContentFormState,
} from "../profile/components/ContentModal";

export default function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const myUserId = useAuthStore((s) => s.user?.userId);

  const {
    data: post,
    isLoading,
    isError,
    refetch: refetchPost,
  } = useEducationalContent(id);

  const {
    data: comments = [],
    isLoading: commentsLoading,
  } = useContentComments(id);

  const createComment = useCreateComment(id ?? "");
  const updateComment = useUpdateComment(id ?? "");
  const deleteComment = useDeleteComment(id ?? "");
  const updateContent = useUpdateEducationalContent();
  const deleteContent = useDeleteEducationalContent();

  const isOwner = !!post && !!myUserId && post.userId === myUserId;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [sharedOnce, setSharedOnce] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState<CommentResponse | null>(
    null
  );
  const [editCommentText, setEditCommentText] = useState("");

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentForm, setContentForm] = useState<ContentFormState>({
    title: "",
    description: "",
    contentType: "",
    contentUrl: "",
  });

  const toggleLike = async () => {
    if (!id || busy) return;
    setBusy("like");
    try {
      if (liked) {
        await profileApi.unlikeContent(id);
        setLiked(false);
      } else {
        await profileApi.likeContent(id);
        setLiked(true);
      }
    } catch {
      // keep previous state
    } finally {
      setBusy(null);
    }
  };

  const toggleSave = async () => {
    if (!id || busy) return;
    setBusy("save");
    try {
      if (saved) {
        await profileApi.unsaveContent(id);
        setSaved(false);
      } else {
        await profileApi.saveContent(id);
        setSaved(true);
      }
    } catch {
      // ignore
    } finally {
      setBusy(null);
    }
  };

  const toggleRepost = async () => {
    if (!id || busy) return;
    setBusy("repost");
    try {
      if (reposted) {
        await profileApi.unrepostContent(id);
        setReposted(false);
      } else {
        await profileApi.repostContent(id);
        setReposted(true);
      }
    } catch {
      // ignore
    } finally {
      setBusy(null);
    }
  };

  const handleShare = async () => {
    if (!id || busy) return;
    setBusy("share");
    try {
      await profileApi.shareContent(id);
      setSharedOnce(true);
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({
          title: post?.title ?? "Riwaq",
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // cancelled or failed
    } finally {
      setBusy(null);
    }
  };

  const handleCommentSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!commentText.trim() || !id) return;
    await createComment.mutateAsync({
      content: commentText.trim(),
      parentCommentId: null,
    });
    setCommentText("");
  };

  const startEditComment = (comment: CommentResponse) => {
    setEditingComment(comment);
    setEditCommentText(comment.content ?? "");
  };

  const cancelEditComment = () => {
    setEditingComment(null);
    setEditCommentText("");
  };

  const saveEditComment = async () => {
    if (!editingComment) return;
    await updateComment.mutateAsync({
      commentId: editingComment.id,
      content: editCommentText.trim() || null,
    });
    cancelEditComment();
  };

  const handleDeleteComment = async (commentId: string) => {
    const ok = window.confirm(t("contentDetail.deleteCommentConfirm"));
    if (!ok) return;
    await deleteComment.mutateAsync(commentId);
    if (editingComment?.id === commentId) cancelEditComment();
  };

  const openEditPost = () => {
    if (!post) return;
    setContentForm({
      title: post.title ?? "",
      description: post.description ?? "",
      contentType: post.contentType ?? "",
      contentUrl: post.contentUrl ?? "",
    });
    setIsContentModalOpen(true);
  };

  const handlePostSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!id) return;
    await updateContent.mutateAsync({
      id,
      payload: {
        title: contentForm.title.trim() || null,
        description: contentForm.description.trim() || null,
        contentType: contentForm.contentType.trim() || null,
        contentUrl: contentForm.contentUrl.trim() || null,
      },
    });
    setIsContentModalOpen(false);
    await refetchPost();
  };

  const handleDeletePost = async () => {
    if (!id) return;
    const ok = window.confirm(t("contentDetail.deletePostConfirm"));
    if (!ok) return;
    await deleteContent.mutateAsync(id);
    navigate("/profile");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="h-64 animate-pulse rounded-3xl bg-surface-2" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center">
        <p className="text-sm text-error">{t("contentDetail.loadError")}</p>
        <Link
          to="/profile"
          className="mt-4 inline-flex text-sm font-semibold text-primary-text"
        >
          {t("contentDetail.back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-text-primary">
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            {t("contentDetail.back")}
          </Link>

          {isOwner && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={openEditPost}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-soft hover:text-text-primary"
              >
                <HugeiconsIcon icon={Edit02Icon} size={14} />
                {t("contentDetail.editPost")}
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                disabled={deleteContent.isPending}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-error-soft hover:text-error disabled:opacity-50"
              >
                <HugeiconsIcon icon={Delete02Icon} size={14} />
                {t("contentDetail.deletePost")}
              </button>
            </div>
          )}
        </div>

        <article className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-card">
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-text">
                {post.contentType || t("profile.content.fallbackType")}
              </span>
              <time className="text-xs text-text-tertiary">
                {new Date(post.createdAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </time>
            </div>

            <h1 className="mt-4 text-xl font-extrabold tracking-tight sm:text-2xl">
              {post.title || t("profile.content.untitled")}
            </h1>

            {post.description && (
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-text-secondary">
                {post.description}
              </p>
            )}

            {post.contentUrl && (
              <a
                href={post.contentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex break-all text-sm font-semibold text-primary-text hover:underline"
              >
                {post.contentUrl}
              </a>
            )}
          </div>

          <div className="grid grid-cols-4 border-t border-border">
            <button
              type="button"
              onClick={toggleLike}
              disabled={busy === "like"}
              className={`flex flex-col items-center gap-1 py-3 text-xs font-semibold transition hover:bg-surface-soft ${
                liked ? "text-error" : "text-text-secondary"
              }`}
            >
              <HugeiconsIcon icon={FavouriteIcon} size={20} />
              {t("contentDetail.like")}
            </button>

            <button
              type="button"
              onClick={toggleSave}
              disabled={busy === "save"}
              className={`flex flex-col items-center gap-1 py-3 text-xs font-semibold transition hover:bg-surface-soft ${
                saved ? "text-primary-text" : "text-text-secondary"
              }`}
            >
              <HugeiconsIcon icon={Bookmark02Icon} size={20} />
              {t("contentDetail.save")}
            </button>

            <button
              type="button"
              onClick={toggleRepost}
              disabled={busy === "repost"}
              className={`flex flex-col items-center gap-1 py-3 text-xs font-semibold transition hover:bg-surface-soft ${
                reposted ? "text-success-text" : "text-text-secondary"
              }`}
            >
              <HugeiconsIcon icon={RepeatIcon} size={20} />
              {t("contentDetail.repost")}
            </button>

            <button
              type="button"
              onClick={handleShare}
              disabled={busy === "share"}
              className={`flex flex-col items-center gap-1 py-3 text-xs font-semibold transition hover:bg-surface-soft ${
                sharedOnce ? "text-primary-text" : "text-text-secondary"
              }`}
            >
              <HugeiconsIcon icon={Share08Icon} size={20} />
              {t("contentDetail.share")}
            </button>
          </div>
        </article>

        <section className="mt-6 rounded-3xl border border-border bg-surface-2 p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-bold">{t("contentDetail.comments")}</h2>

          <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t("contentDetail.commentPlaceholder")}
              className="flex-1 rounded-full border border-input-border bg-input-bg px-4 py-2.5 text-sm outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
            <button
              type="submit"
              disabled={createComment.isPending || !commentText.trim()}
              className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
            >
              {t("contentDetail.postComment")}
            </button>
          </form>

          <div className="mt-5 space-y-3">
            {commentsLoading ? (
              <div className="h-16 animate-pulse rounded-xl bg-surface-soft" />
            ) : comments.length > 0 ? (
              comments.map((c) => {
                const canManageComment = !!myUserId && c.userId === myUserId;
                const isEditing = editingComment?.id === c.id;

                return (
                  <div
                    key={c.id}
                    className="rounded-xl border border-border bg-surface-soft p-3.5"
                  >
                    {isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          value={editCommentText}
                          onChange={(e) => setEditCommentText(e.target.value)}
                          rows={3}
                          className="w-full resize-none rounded-xl border border-input-border bg-input-bg px-3 py-2 text-sm outline-none focus:border-input-focus"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={cancelEditComment}
                            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary"
                          >
                            {t("common.close")}
                          </button>
                          <button
                            type="button"
                            onClick={saveEditComment}
                            disabled={updateComment.isPending}
                            className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                          >
                            {t("profile.saveChanges")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm leading-6 text-text-primary">
                            {c.content}
                          </p>
                          {canManageComment && (
                            <div className="flex shrink-0 gap-1">
                              <button
                                type="button"
                                onClick={() => startEditComment(c)}
                                className="rounded-full p-1.5 text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                                aria-label={t("contentDetail.editComment")}
                              >
                                <HugeiconsIcon icon={Edit02Icon} size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteComment(c.id)}
                                disabled={deleteComment.isPending}
                                className="rounded-full p-1.5 text-text-secondary hover:bg-error-soft hover:text-error disabled:opacity-50"
                                aria-label={t("contentDetail.deleteComment")}
                              >
                                <HugeiconsIcon icon={Delete02Icon} size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="mt-1.5 text-[11px] text-text-tertiary">
                          {new Date(c.createdAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-text-tertiary">
                {t("contentDetail.noComments")}
              </p>
            )}
          </div>
        </section>
      </main>

      {isContentModalOpen && (
        <ContentModal
          mode="edit"
          form={contentForm}
          setForm={setContentForm}
          isSaving={updateContent.isPending}
          onClose={() => setIsContentModalOpen(false)}
          onSubmit={handlePostSubmit}
        />
      )}
    </div>
  );
}