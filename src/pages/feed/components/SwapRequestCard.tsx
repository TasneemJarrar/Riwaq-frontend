import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { ConnectionRequestResponse } from "../../../api/connections";

interface Props {
  request: ConnectionRequestResponse;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isUpdating: boolean;
}

export default function SwapRequestCard({
  request,
  onAccept,
  onDecline,
  isUpdating,
}: Props) {
  const { t } = useTranslation();

  const sender = request.sender;
  const senderId = sender?.userId ?? request.senderUserId ?? "";

  const name =
    [sender?.firstName, sender?.lastName].filter(Boolean).join(" ") ||
    t("feed.post.userFallback", {
      id: (senderId || request.id).slice(0, 8),
    });

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  const profilePath = senderId ? `/users/${senderId}` : "#";

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-surface-2 p-4 shadow-card sm:p-5">
      <div className="flex items-start gap-3">
        <Link
          to={profilePath}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-text transition hover:ring-2 hover:ring-primary/40"
        >
          {initials}
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            to={profilePath}
            className="text-sm font-semibold text-text-primary hover:text-primary-text hover:underline"
          >
            {name}
          </Link>

          {sender?.learningDirectionName && (
            <p className="mt-0.5 text-xs text-text-tertiary">
              {sender.learningDirectionName}
            </p>
          )}

          <p className="mt-2 text-sm text-text-secondary">
            {t("feed.swap.wantsToConnect", {
              defaultValue: "Wants to connect / swap skills with you.",
            })}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onAccept(request.id)}
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
            >
              {t("feed.swap.accept", { defaultValue: "Accept" })}
            </button>
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onDecline(request.id)}
              className="rounded-full border border-border bg-surface-soft px-4 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-hover disabled:opacity-50"
            >
              {t("feed.swap.decline", { defaultValue: "Decline" })}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}