import { useTranslation } from "react-i18next";
import type { ExperienceResponse } from "../../../api/profile";

interface ProfileExperiencesProps {
  experiences: ExperienceResponse[];
  isLoading: boolean;
  isError: boolean;
}

export default function ProfileExperiences({
  experiences,
  isLoading,
  isError,
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
      <h2 className="text-lg font-bold text-text-primary">
        {t("profile.experiences.title")}
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        {t("profile.experiences.subtitle")}
      </p>

      <div className="mt-5 space-y-3">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl border border-border bg-surface-soft p-4"
            >
              <h3 className="text-sm font-semibold text-text-primary">
                {exp.title || t("profile.experiences.untitled")}
              </h3>
              {exp.description && (
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {exp.description}
                </p>
              )}
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