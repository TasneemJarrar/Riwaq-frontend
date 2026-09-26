import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import type { ProgressResponse } from "../../../api/profile";

interface ProfileProgressProps {
  progress: ProgressResponse[];
  isLoading: boolean;
  isError: boolean;
  onAdd: () => void;
  onEdit: (item: ProgressResponse) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function ProfileProgress({
  progress,
  isLoading,
  isError,
  onAdd,
  onEdit,
  onDelete,
  isDeleting,
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-text-primary">
            {t("profile.progress.title")}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {t("profile.progress.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          {t("profile.progress.add", { defaultValue: "Add progress" })}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {progress.length > 0 ? (
          progress.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-border bg-surface-soft p-4 sm:flex-row sm:items-center sm:justify-between"
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

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-text">
                  {item.level || t("profile.progress.inProgress")}
                </span>

                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="text-xs font-semibold text-text-secondary hover:text-text-primary"
                >
                  {t("profile.edit")}
                </button>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => onDelete(item.id)}
                  className="text-xs font-semibold text-error hover:underline disabled:opacity-50"
                >
                  {t("profile.experiences.delete", {
                    defaultValue: "Delete",
                  })}
                </button>
              </div>
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