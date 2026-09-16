import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import type { Proficiency } from "./ProficiencyModal";

interface SkillChipProps {
  name: string;
  proficiency?: Proficiency;
  onRemove: () => void;
}

export function SkillChip({
  name,
  proficiency,
  onRemove,
}: SkillChipProps) {
  const { t } = useTranslation();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-soft py-1.5 ps-3.5 pe-2 text-sm font-medium text-text-primary">
      <span>{name}</span>

      {proficiency && (
        <span className="rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success-text">
          {t(`onboarding.proficiency.levels.${proficiency}`)}
        </span>
      )}

      <button
        type="button"
        onClick={onRemove}
        className="text-text-tertiary transition-colors hover:text-error"
        aria-label={`${t("common.remove")} ${name}`}
      >
        <HugeiconsIcon icon={Cancel01Icon} size={14} />
      </button>
    </div>
  );
}