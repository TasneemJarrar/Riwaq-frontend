import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Edit02Icon,
  FlashIcon,
  ShieldEllipsisIcon,
} from "@hugeicons/core-free-icons";
import { useMyProfile } from "../../../hooks/useProfile";
import {
  useSkills,
  useUpdateLearningDirection,
} from "../../../hooks/useLearningDirections";

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

  const [isEditing, setIsEditing] = useState(false);

  const { data: profile } = useMyProfile();
  const { data: allSkills = [], isLoading: skillsLoading } = useSkills();
  const {
    mutateAsync: updateLearningDirection,
    isPending: isUpdating,
  } = useUpdateLearningDirection();

  const learningDirectionId = profile?.learningDirectionId ?? null;

  const handleChange = async (skillId: string) => {
    if (!skillId || skillId === learningDirectionId) {
      setIsEditing(false);
      return;
    }

    try {
      await updateLearningDirection(skillId);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update learning direction:", error);
    }
  };

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {/* Points */}
      <div className="rounded-2xl border border-border bg-surface-soft p-4">
        <div className="flex items-center gap-2 text-text-tertiary">
          <HugeiconsIcon icon={FlashIcon} size={16} />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {t("profile.points")}
          </span>
        </div>
        <p className="mt-2 text-2xl font-extrabold">{points}</p>
      </div>

      {/* Skills count */}
      <div className="rounded-2xl border border-border bg-surface-soft p-4">
        <div className="flex items-center gap-2 text-text-tertiary">
          <HugeiconsIcon icon={ShieldEllipsisIcon} size={16} />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {t("profile.skillsCount")}
          </span>
        </div>
        <p className="mt-2 text-2xl font-extrabold">{skillsCount}</p>
      </div>

      {/* Learning direction — editable */}
      <div className="rounded-2xl border border-border bg-surface-soft p-4">
        <div className="flex items-center justify-between gap-2 text-text-tertiary">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">
              {t("profile.learningDirection")}
            </span>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-surface-2 hover:text-primary-text"
              aria-label={t("profile.editLearningDirection", {
                defaultValue: "Edit learning direction",
              })}
            >
              <HugeiconsIcon icon={Edit02Icon} size={14} />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="mt-2 space-y-2">
            <select
              autoFocus
              value={learningDirectionId ?? ""}
              onChange={(e) => void handleChange(e.target.value)}
              disabled={skillsLoading || isUpdating}
              className="w-full rounded-xl border border-input-border bg-input-bg px-3 py-2 text-sm text-text-primary outline-none transition focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {skillsLoading
                  ? t("auth.placeholders.loadingLearningDirections")
                  : t("profile.selectLearningDirection")}
              </option>
              {allSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              {isUpdating && (
                <span className="text-xs text-text-tertiary">
                  {t("profile.saving")}
                </span>
              )}
              {!isUpdating && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs font-medium text-text-tertiary hover:text-text-primary"
                >
                  {t("common.cancel", { defaultValue: "Cancel" })}
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-2 truncate text-base font-bold">
            {learningDirectionName ?? t("profile.notSet")}
          </p>
        )}
      </div>
    </div>
  );
}