import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  FlashIcon,
  ShieldEllipsisIcon,
} from "@hugeicons/core-free-icons";

interface ProfileStatsProps {
  points: number;
  skillsCount: number;
  learningDirectionName?: string | null;
}

export default function ProfileStats({
  points,
  skillsCount,
  learningDirectionName,
}: ProfileStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-border bg-surface-soft p-4">
        <div className="flex items-center gap-2 text-text-tertiary">
          <HugeiconsIcon icon={FlashIcon} size={16} />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {t("profile.points")}
          </span>
        </div>
        <p className="mt-2 text-2xl font-extrabold">{points}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface-soft p-4">
        <div className="flex items-center gap-2 text-text-tertiary">
          <HugeiconsIcon icon={ShieldEllipsisIcon} size={16} />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {t("profile.skillsCount")}
          </span>
        </div>
        <p className="mt-2 text-2xl font-extrabold">{skillsCount}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface-soft p-4">
        <div className="flex items-center gap-2 text-text-tertiary">
          <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {t("profile.learningDirection")}
          </span>
        </div>
        <p className="mt-2 truncate text-base font-bold">
          {learningDirectionName ?? t("profile.notSet")}
        </p>
      </div>
    </div>
  );
}