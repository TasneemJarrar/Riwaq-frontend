import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Cancel01Icon,
  ShieldEllipsisIcon,
} from "@hugeicons/core-free-icons";
import ModalHeader from "./ModalHeader";

interface SkillItem {
  id: string;
  name: string | null;
}

interface InterestItem {
  id: string;
  name: string | null;
}

interface EditSkillsModalProps {
  skillSearch: string;
  onSkillSearchChange: (value: string) => void;

  profileSkills: SkillItem[];
  filteredSkills: SkillItem[];
  profileSkillIds: Set<string>;
  skillsLoading: boolean;
  isAdding: boolean;
  isRemoving: boolean;
  onAddSkill: (skillId: string) => void;
  onRemoveSkill: (skillId: string) => void;

  profileInterests: InterestItem[];
  filteredInterests: InterestItem[];
  profileInterestIds: Set<string>;
  interestsLoading: boolean;
  isAddingInterest: boolean;
  isRemovingInterest: boolean;
  onAddInterest: (interestId: string) => void;
  onRemoveInterest: (interestId: string) => void;

  onClose: () => void;
}

export default function EditSkillsModal({
  skillSearch,
  onSkillSearchChange,

  profileSkills,
  filteredSkills,
  profileSkillIds,
  skillsLoading,
  isAdding,
  isRemoving,
  onAddSkill,
  onRemoveSkill,

  profileInterests,
  filteredInterests,
  profileInterestIds,
  interestsLoading,
  isAddingInterest,
  isRemovingInterest,
  onAddInterest,
  onRemoveInterest,

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

        {/* Skills */}
        <div className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-sm font-bold text-text-secondary">
                1
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
              onChange={(event) =>
                onSkillSearchChange(event.target.value)
              }
              placeholder={t("profile.searchSkills")}
              className="w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none transition focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft sm:w-64"
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
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={14}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skillsLoading ? (
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
                    disabled={isAdding || isRemoving}
                    onClick={() =>
                      selected
                        ? onRemoveSkill(skill.id)
                        : onAddSkill(skill.id)
                    }
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-start text-sm transition-colors ${selected
                      ? "border-success/30 bg-success-soft text-success-text"
                      : "border-border bg-surface-soft text-text-secondary hover:border-primary hover:bg-primary-soft hover:text-primary-text"
                      } disabled:opacity-50`}
                  >
                    <span className="truncate">{skill.name}</span>

                    <HugeiconsIcon
                      icon={selected ? Cancel01Icon : Add01Icon}
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

        {/* Interests */}
        <div className="mt-8">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-sm font-bold text-text-secondary">
              2
            </div>

            <div>
              <h3 className="text-sm font-bold">
                {t("profile.interests", {
                  defaultValue: "Interests",
                })}
              </h3>

              <p className="mt-1 text-xs text-text-tertiary">
                {t("profile.interestsDescription", {
                  defaultValue:
                    "Topics you are interested in learning about.",
                })}
              </p>
            </div>
          </div>

          {profileInterests.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold text-text-tertiary">
                {t("profile.yourInterests", {
                  defaultValue: "Your interests",
                })}
              </p>

              <div className="flex flex-wrap gap-2">
                {filteredInterests.map((interest) => {
                  const selected = profileInterestIds.has(interest.id);

                  return (
                    <button
                      key={interest.id}
                      type="button"
                      disabled={isAddingInterest || isRemovingInterest}
                      onClick={() =>
                        selected
                          ? onRemoveInterest(interest.id)
                          : onAddInterest(interest.id)
                      }
                      className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-start text-sm transition-colors ${selected
                          ? "border-success/30 bg-success-soft text-success-text"
                          : "border-border bg-surface-soft text-text-secondary hover:border-primary hover:bg-primary-soft hover:text-primary-text"
                        } disabled:opacity-50`}
                    >
                      <span className="truncate">{interest.name}</span>

                      <HugeiconsIcon
                        icon={selected ? Cancel01Icon : Add01Icon}
                        size={15}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {interestsLoading ? (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 animate-pulse rounded-xl bg-surface-soft"
                />
              ))}
            </div>
          ) : filteredInterests.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {filteredInterests.map((interest) => {
                const selected = profileInterestIds.has(
                  interest.id
                );

                return (
                  <button
                    key={interest.id}
                    type="button"
                    disabled={
                      selected || isAddingInterest
                    }
                    onClick={() =>
                      onAddInterest(interest.id)
                    }
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-start text-sm transition-colors ${selected
                      ? "border-success/30 bg-success-soft text-success-text"
                      : "border-border bg-surface-soft text-text-secondary hover:border-primary hover:bg-primary-soft hover:text-primary-text"
                      } disabled:cursor-default`}
                  >
                    <span className="truncate">
                      {interest.name}
                    </span>

                    <HugeiconsIcon
                      icon={
                        selected
                          ? ShieldEllipsisIcon
                          : Add01Icon
                      }
                      size={15}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-surface-soft p-6 text-center">
              <p className="text-sm text-text-secondary">
                {t("profile.noInterestsFound", {
                  defaultValue: "No interests found.",
                })}
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