import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

interface SkillItem {
  id: string;
  name: string | null;
}

interface LearningDirectionItem {
  id: string;
  name: string | null;
  description?: string | null;
}

interface ProfileSkillsSectionProps {
  profileSkills: SkillItem[];
  profileSkillsLoading: boolean;
  currentLearningDirection?: LearningDirectionItem;
  onEditSkills: () => void;
}

export default function ProfileSkillsSection({
  profileSkills,
  profileSkillsLoading,
  currentLearningDirection,
  onEditSkills,
}: ProfileSkillsSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="mt-6 rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-text">
            {t("profile.skillsLabel")}
          </p>
          <h2 className="mt-1 text-xl font-extrabold">
            {t("profile.skillsTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
            {t("profile.skillsDescription")}
          </p>
        </div>

        <button
          type="button"
          onClick={onEditSkills}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          {t("profile.editSkills")}
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface-soft p-5">
          <h3 className="text-sm font-bold">{t("profile.skillsIHave")}</h3>

          {profileSkillsLoading ? (
            <div className="mt-4 h-10 animate-pulse rounded-xl bg-surface-2" />
          ) : profileSkills.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {profileSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border border-border bg-surface-2 px-3.5 py-2 text-sm font-medium text-text-primary"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-text-tertiary">
              {t("profile.noSkills")}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface-soft p-5">
          <h3 className="text-sm font-bold">
            {t("profile.skillIWantToLearn")}
          </h3>

          {currentLearningDirection ? (
            <>
              <span className="mt-4 inline-flex rounded-full bg-primary-soft px-3.5 py-2 text-sm font-semibold text-primary-text">
                {currentLearningDirection.name}
              </span>
              {currentLearningDirection.description && (
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {currentLearningDirection.description}
                </p>
              )}
            </>
          ) : (
            <p className="mt-4 text-sm text-text-tertiary">
              {t("profile.noLearningDirection")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}