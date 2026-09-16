import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";

export type Proficiency =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

interface ProficiencyModalProps {
  skillName: string;
  value?: Proficiency;
  onSelect: (value: Proficiency) => void;
  onClose: () => void;
}

const proficiencyOptions: Proficiency[] = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
];

export function ProficiencyModal({
  skillName,
  value,
  onSelect,
  onClose,
}: ProficiencyModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-2 p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              {t("onboarding.proficiency.title")}
            </p>

            <h3 className="mt-1 text-xl font-bold text-text-primary">
              {skillName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-text-tertiary transition-colors hover:text-text-primary"
            aria-label={t("common.close")}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {t("onboarding.proficiency.description")}
        </p>

        <div className="mt-5 space-y-2">
          {proficiencyOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                value === option
                  ? "border-primary bg-primary-soft text-primary-text"
                  : "border-border bg-surface-soft text-text-secondary hover:border-primary hover:text-text-primary"
              }`}
            >
              <div>
                <p className="text-sm font-semibold">
                  {t(`onboarding.proficiency.levels.${option}`)}
                </p>

                <p className="mt-0.5 text-xs text-text-tertiary">
                  {t(`onboarding.proficiency.descriptions.${option}`)}
                </p>
              </div>

              <span
                className={`h-4 w-4 rounded-full border ${
                  value === option
                    ? "border-primary bg-primary ring-4 ring-primary/20"
                    : "border-border"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={!value}
          onClick={() => value && onSelect(value)}
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("onboarding.proficiency.confirm")}
        </button>
      </div>
    </div>
  );
}