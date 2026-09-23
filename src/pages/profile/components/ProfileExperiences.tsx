import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Delete02Icon, Edit02Icon } from "@hugeicons/core-free-icons";
import type { ExperienceResponse } from "../../../api/profile";

interface ProfileExperiencesProps {
  experiences: ExperienceResponse[];
  isLoading: boolean;
  isError: boolean;
  onAdd: () => void;
  onEdit: (experience: ExperienceResponse) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function ProfileExperiences({
  experiences,
  isLoading,
  isError,
  onAdd,
  onEdit,
  onDelete,
  isDeleting,
}: ProfileExperiencesProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <div className="h-6 w-40 animate-pulse rounded bg-surface-soft" />
        <div className="mt-4 space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl bg-surface-soft"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <p className="text-sm text-error">{t("profile.experiences.loadError")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-text-primary">
            {t("profile.experiences.title")}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {t("profile.experiences.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          {t("profile.experiences.add")}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl border border-border bg-surface-soft p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-text-primary">
                    {exp.title || t("profile.experiences.untitled")}
                  </h3>
                  {exp.description && (
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {exp.description}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(exp)}
                    className="rounded-full p-2 text-text-secondary transition hover:bg-surface-2 hover:text-text-primary"
                    aria-label={t("profile.experiences.edit")}
                  >
                    <HugeiconsIcon icon={Edit02Icon} size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(exp.id)}
                    disabled={isDeleting}
                    className="rounded-full p-2 text-text-secondary transition hover:bg-error-soft hover:text-error disabled:opacity-50"
                    aria-label={t("profile.experiences.delete")}
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-tertiary">
            {t("profile.experiences.empty")}
          </p>
        )}
      </div>
    </div>
  );
}