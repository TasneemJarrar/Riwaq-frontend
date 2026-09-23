import { useTranslation } from "react-i18next";
import type { LearningSessionResponse } from "../../../api/profile";

interface ProfileSessionsProps {
  sessions: LearningSessionResponse[];
  isLoading: boolean;
  isError: boolean;
}

export default function ProfileSessions({
  sessions,
  isLoading,
  isError,
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

  const active = sessions.filter((s) => {
    const status = (s.status ?? "").toLowerCase();
    return (
      !status ||
      status === "active" ||
      status === "scheduled" ||
      status === "in_progress" ||
      status === "pending"
    );
  });

  const list = active.length > 0 ? active : sessions.slice(0, 3);

  return (
    <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
      <h2 className="text-lg font-bold text-text-primary">
        {t("profile.sessions.title")}
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        {t("profile.sessions.subtitle")}
      </p>

      <div className="mt-5 space-y-3">
        {list.length > 0 ? (
          list.map((session) => (
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
              {session.meetingUrl && (
                <a
                  href={session.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-xs font-semibold text-primary-text hover:text-primary"
                >
                  {t("profile.sessions.openMeeting")}
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-text-tertiary">
            {t("profile.sessions.empty")}
          </p>
        )}
      </div>
    </div>
  );
}