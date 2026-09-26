import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import type { LearningSessionResponse } from "../../../api/profile";

interface ProfileSessionsProps {
  sessions: LearningSessionResponse[];
  isLoading: boolean;
  isError: boolean;
  onSchedule: () => void;
  onEdit: (session: LearningSessionResponse) => void;
  onComplete: (session: LearningSessionResponse) => void;
  onRate: (session: LearningSessionResponse) => void;
  isUpdating?: boolean;
}

export default function ProfileSessions({
  sessions,
  isLoading,
  isError,
  onSchedule,
  onEdit,
  onComplete,
  onRate,
  isUpdating,
}: ProfileSessionsProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <div className="h-6 w-48 animate-pulse rounded bg-surface-soft" />
        <div className="mt-4 h-24 animate-pulse rounded-xl bg-surface-soft" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <p className="text-sm text-error">{t("profile.sessions.loadError")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-text-primary">
            {t("profile.sessions.title")}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {t("profile.sessions.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={onSchedule}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          {t("profile.sessions.schedule", { defaultValue: "Schedule" })}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {sessions.length > 0 ? (
          sessions.map((session) => {
            const status = (session.status ?? "Scheduled").toLowerCase();
            const canComplete =
              status === "scheduled" ||
              status === "inprogress" ||
              status === "in_progress" ||
              status === "pending" ||
              status === "";
            const canRate =
              status === "completed" || status === "complete";

            return (
              <div
                key={session.id}
                className="rounded-xl border border-border bg-surface-soft p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">
                      {session.title || t("profile.sessions.untitled")}
                    </h3>
                    {session.description && (
                      <p className="mt-1 text-sm text-text-secondary">
                        {session.description}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-text-tertiary">
                      {new Date(session.scheduledAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success-text">
                    {session.status || t("profile.sessions.scheduled")}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {session.meetingUrl && (
                    <a
                      href={session.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-primary-text hover:text-primary"
                    >
                      {t("profile.sessions.openMeeting")}
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => onEdit(session)}
                    className="text-xs font-semibold text-text-secondary hover:text-text-primary"
                  >
                    {t("profile.edit", { defaultValue: "Edit" })}
                  </button>

                  {canComplete && (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => onComplete(session)}
                      className="text-xs font-semibold text-success-text hover:underline disabled:opacity-50"
                    >
                      {t("profile.sessions.markComplete", {
                        defaultValue: "Mark complete",
                      })}
                    </button>
                  )}

                  {canRate && (
                    <button
                      type="button"
                      onClick={() => onRate(session)}
                      className="text-xs font-semibold text-gamification-text hover:underline"
                    >
                      {t("profile.sessions.rate", {
                        defaultValue: "Rate",
                      })}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-text-tertiary">
            {t("profile.sessions.empty")}
          </p>
        )}
      </div>
    </div>
  );
}