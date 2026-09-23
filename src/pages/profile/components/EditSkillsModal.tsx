import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  ArrowDown01Icon,
  Cancel01Icon,
  ShieldEllipsisIcon,
} from "@hugeicons/core-free-icons";
import ModalHeader from "./ModalHeader";

interface SkillItem {
  id: string;
  name: string | null;
}

interface LearningDirectionItem {
  id: string;
  name: string | null;
}

interface EditSkillsModalProps {
  selectedLearningDirectionId: string;
  learningDirections: LearningDirectionItem[];
  learningDirectionsLoading: boolean;
  isUpdatingLearningDirection: boolean;
  onLearningDirectionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  skillSearch: string;
  onSkillSearchChange: (value: string) => void;
  profileSkills: SkillItem[];
  filteredSkills: SkillItem[];
  profileSkillIds: Set<string>;
  learningDirectionLoading: boolean;
  isAdding: boolean;
  isRemoving: boolean;
  onAddSkill: (skillId: string) => void;
  onRemoveSkill: (skillId: string) => void;
  onClose: () => void;
}

export default function EditSkillsModal({
  selectedLearningDirectionId,
  learningDirections,
  learningDirectionsLoading,
  isUpdatingLearningDirection,
  onLearningDirectionChange,
  skillSearch,
  onSkillSearchChange,
  profileSkills,
  filteredSkills,
  profileSkillIds,
  learningDirectionLoading,
  isAdding,
  isRemoving,
  onAddSkill,
  onRemoveSkill,
  onClose,
}: EditSkillsModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <ModalHeader
          eyebrow={t("profile.skillsLabel")}
          title={t("profile.editSkills")}
          onClose={onClose}
        />

        {/* STEP 1 — Learning Direction */}
        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary-soft p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-text">
              1
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {t("profile.skillIWantToLearn")}
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                {t("profile.learningDirectionDescription")}
              </p>
            </div>
          </div>

          <div className="relative mt-4">
            <select
              value={selectedLearningDirectionId}
              onChange={onLearningDirectionChange}
              disabled={
                learningDirectionsLoading || isUpdatingLearningDirection
              }
              className="w-full appearance-none rounded-xl border border-input-border bg-input-bg px-3.5 py-3 pe-10 text-sm text-text-primary outline-none transition focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {learningDirectionsLoading
                  ? t("auth.placeholders.loadingLearningDirections")
                  : t("profile.selectLearningDirection")}
              </option>
              {learningDirections.map((direction) => (
                <option key={direction.id} value={direction.id}>
                  {direction.name}
                </option>
              ))}
            </select>

            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className="pointer-events-none absolute end-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
            />
          </div>

          {isUpdatingLearningDirection && (
            <p className="mt-2 text-xs text-text-tertiary">
              {t("profile.saving")}
            </p>
          )}
        </div>

        {/* STEP 2 — Skills */}
        <div className="mt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-sm font-bold text-text-secondary">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold">
                  {t("profile.skillsIHave")}
                </h3>
                <p className="mt-1 text-xs text-text-tertiary">
                  {t("profile.skillsHaveDescription")}
                </p>
              </div>
            </div>

            <input
              value={skillSearch}
              onChange={(event) => onSkillSearchChange(event.target.value)}
              disabled={!selectedLearningDirectionId}
              placeholder={t("profile.searchSkills")}
              className="w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none transition focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft disabled:cursor-not-allowed disabled:opacity-50 sm:w-64"
            />
          </div>

          {profileSkills.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold text-text-tertiary">
                {t("profile.skillsIHave")}
              </p>
              <div className="flex flex-wrap gap-2">
                {profileSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-soft py-1.5 ps-3.5 pe-2"
                  >
                    <span className="text-sm font-medium text-text-primary">
                      {skill.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveSkill(skill.id)}
                      disabled={isRemoving}
                      className="text-text-tertiary transition-colors hover:text-error disabled:opacity-50"
                      aria-label={`${t("common.remove")} ${skill.name}`}
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selectedLearningDirectionId ? (
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-surface-soft p-6 text-center">
              <p className="text-sm text-text-secondary">
                {t("profile.chooseDirectionFirst")}
              </p>
            </div>
          ) : learningDirectionLoading ? (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 animate-pulse rounded-xl bg-surface-soft"
                />
              ))}
            </div>
          ) : filteredSkills.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {filteredSkills.map((skill) => {
                const selected = profileSkillIds.has(skill.id);
                return (
                  <button
                    key={skill.id}
                    type="button"
                    disabled={selected || isAdding}
                    onClick={() => onAddSkill(skill.id)}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-start text-sm transition-colors ${
                      selected
                        ? "border-success/30 bg-success-soft text-success-text"
                        : "border-border bg-surface-soft text-text-secondary hover:border-primary hover:bg-primary-soft hover:text-primary-text"
                    } disabled:cursor-default`}
                  >
                    <span className="truncate">{skill.name}</span>
                    <HugeiconsIcon
                      icon={selected ? ShieldEllipsisIcon : Add01Icon}
                      size={15}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-surface-soft p-6 text-center">
              <p className="text-sm text-text-secondary">
                {t("profile.noSkillsFound")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover"
          >
            {t("common.close")}
          </button>
        </div>
      </div>
    </div>
  );
}