import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  GraduationScrollIcon,
  SearchIcon,
  Target01Icon,
} from "@hugeicons/core-free-icons";
import { SkillChip } from "./SkillChip";
import {
  ProficiencyModal,
  type Proficiency,
} from "./ProficiencyModal";
import type { Skill } from "../../../api/learningDirections";

export interface SelectedTeachSkill {
  skill: Skill;
  proficiency: Proficiency;
}

export interface SelectedLearnSkill {
  skill: Skill;
  priority: "highPriority" | "secondary" | "emerging";
}

interface SkillSelectorCardProps {
  mode: "teach" | "learn";
  skills: Skill[];
  isLoading?: boolean;
  selectedTeachSkills?: SelectedTeachSkill[];
  selectedLearnSkills?: SelectedLearnSkill[];
  onTeachChange?: (skills: SelectedTeachSkill[]) => void;
  onLearnChange?: (skills: SelectedLearnSkill[]) => void;
}

export function SkillSelectorCard({
  mode,
  skills,
  isLoading = false,
  selectedTeachSkills = [],
  selectedLearnSkills = [],
  onTeachChange,
  onLearnChange,
}: SkillSelectorCardProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [pendingSkill, setPendingSkill] = useState<Skill | null>(null);

  const isTeach = mode === "teach";

  const selectedIds = isTeach
    ? selectedTeachSkills.map((item) => item.skill.id)
    : selectedLearnSkills.map((item) => item.skill.id);

  const filteredSkills = useMemo(() => {
    const q = search.trim().toLowerCase();
    return skills.filter((skill) => {
      const name = skill.name?.toLowerCase() ?? "";
      const matchesSearch = !q || name.includes(q);
      return matchesSearch && !selectedIds.includes(skill.id);
    });
  }, [skills, search, selectedIds]);

  const removeSkill = (skillId: string) => {
    if (isTeach) {
      onTeachChange?.(
        selectedTeachSkills.filter((item) => item.skill.id !== skillId)
      );
    } else {
      onLearnChange?.(
        selectedLearnSkills.filter((item) => item.skill.id !== skillId)
      );
    }
  };

  const handleProficiencySelect = (proficiency: Proficiency) => {
    if (!pendingSkill) return;
    const exists = selectedTeachSkills.some(
      (item) => item.skill.id === pendingSkill.id
    );
    if (!exists) {
      onTeachChange?.([
        ...selectedTeachSkills,
        { skill: pendingSkill, proficiency },
      ]);
    }
    setPendingSkill(null);
    setSearch("");
  };

  const addLearnSkill = (skill: Skill) => {
    onLearnChange?.([
      ...selectedLearnSkills,
      { skill, priority: "secondary" },
    ]);
    setSearch("");
  };

  return (
    <>
      <div className="rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isTeach
                  ? "bg-primary-soft text-primary-text"
                  : "bg-gamification-soft text-gamification-text"
              }`}
            >
              <HugeiconsIcon
                icon={isTeach ? GraduationScrollIcon : Target01Icon}
                size={20}
              />
            </div>
            <h2 className="text-base font-bold text-text-primary sm:text-lg">
              {t(
                isTeach
                  ? "onboarding.teach.title"
                  : "onboarding.learn.title"
              )}
            </h2>
          </div>
          <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-text-secondary">
            {t(
              isTeach
                ? "onboarding.teach.selected"
                : "onboarding.learn.goals",
              {
                count: isTeach
                  ? selectedTeachSkills.length
                  : selectedLearnSkills.length,
              }
            )}
          </span>
        </div>

        <p className="mt-3 text-sm text-text-secondary">
          {t(
            isTeach
              ? "onboarding.teach.description"
              : "onboarding.learn.description"
          )}
        </p>

        <div className="relative mt-5">
          <HugeiconsIcon
            icon={SearchIcon}
            size={16}
            className="absolute start-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t(
              isTeach
                ? "onboarding.teach.searchPlaceholder"
                : "onboarding.learn.searchPlaceholder"
            )}
            className="w-full rounded-xl border border-input-border bg-input-bg py-2.5 ps-10 pe-4 text-sm text-text-primary outline-none transition-all placeholder:text-text-tertiary focus:border-input-focus focus:ring-2 focus:ring-input-focus-soft"
          />
        </div>

        {selectedIds.length > 0 && (
          <>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              {t(
                isTeach
                  ? "onboarding.teach.currentOfferings"
                  : "onboarding.learn.targetDisciplines"
              )}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {isTeach
                ? selectedTeachSkills.map((item) => (
                    <SkillChip
                      key={item.skill.id}
                      name={item.skill.name ?? ""}
                      proficiency={item.proficiency}
                      onRemove={() => removeSkill(item.skill.id)}
                    />
                  ))
                : selectedLearnSkills.map((item) => (
                    <SkillChip
                      key={item.skill.id}
                      name={item.skill.name ?? ""}
                      onRemove={() => removeSkill(item.skill.id)}
                    />
                  ))}
            </div>
          </>
        )}

        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          {t(
            isTeach
              ? "onboarding.teach.availableSkills"
              : "onboarding.learn.availableSkills"
          )}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {isLoading ? (
            <p className="text-xs text-text-tertiary">
              {t("onboarding.learningMethod.loading")}
            </p>
          ) : (
            <>
              {filteredSkills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() =>
                    isTeach
                      ? setPendingSkill(skill)
                      : addLearnSkill(skill)
                  }
                  className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary-text"
                >
                  <HugeiconsIcon icon={Add01Icon} size={12} />
                  {skill.name}
                </button>
              ))}
              {filteredSkills.length === 0 && (
                <p className="text-xs text-text-tertiary">
                  {t("onboarding.noSkillsFound")}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {pendingSkill && (
        <ProficiencyModal
          skillName={pendingSkill.name ?? ""}
          onSelect={handleProficiencySelect}
          onClose={() => setPendingSkill(null)}
        />
      )}
    </>
  );
}