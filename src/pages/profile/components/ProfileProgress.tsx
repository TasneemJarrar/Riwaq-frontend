import { useTranslation } from "react-i18next";
import type { ProgressResponse } from "../../../api/profile";

interface ProfileProgressProps {
  progress: ProgressResponse[];
  isLoading: boolean;
  isError: boolean;
}

export default function ProfileProgress({
  progress,
  isLoading,
  isError,
}: ProfileProgressProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <div className="h-6 w-40 animate-pulse rounded bg-surface-soft" />
        <div className="mt-4 h-16 animate-pulse rounded-xl bg-surface-soft" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <p className="text-sm text-error">{t("profile.progress.loadError")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
      <h2 className="text-lg font-bold text-text-primary">
        {t("profile.progress.title")}
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        {t("profile.progress.subtitle")}
      </p>

      <div className="mt-5 space-y-3">
        {progress.length > 0 ? (
          progress.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 rounded-xl border border-border bg-surface-soft p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {item.learningDirectionName ||
                    t("profile.progress.fallbackDirection")}
                </p>
                <p className="mt-1 text-xs text-text-tertiary">
                  {t("profile.progress.started", {
                    date: new Date(item.startedAt).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    ),
                  })}
                </p>
              </div>
              <span className="w-fit rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-text">
                {item.level || t("profile.progress.inProgress")}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-tertiary">
            {t("profile.progress.empty")}
          </p>
        )}
      </div>
    </div>
  );
}