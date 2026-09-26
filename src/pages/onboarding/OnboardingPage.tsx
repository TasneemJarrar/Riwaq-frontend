import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowRight01Icon,
  FlashIcon,
  Timer02Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";

import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthFooter } from "../../components/auth/AuthFooter";

import { useSkills } from "../../hooks/useLearningDirections";

import {
  selectLearningDirection,
} from "../../api/learningDirections";

import { profileApi } from "../../api/profile";

import { TopicMultiSelectCard } from "./components/TopicMultiSelectCard";

type Step =
  | "direction"
  | "skills"
  | "interests";

export default function OnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data: topics = [],
    isLoading: topicsLoading,
    isError: topicsError,
    refetch: refetchTopics,
  } = useSkills();

  const [step, setStep] =
    useState<Step>("direction");

  const [selectedDirection, setSelectedDirection] =
    useState<string | null>(null);

  const [selectedSkills, setSelectedSkills] =
    useState<string[]>([]);

  const [selectedInterests, setSelectedInterests] =
    useState<string[]>([]);

  const [isSaving, setIsSaving] =
    useState(false);

  const handleDirectionContinue = () => {
    if (!selectedDirection) return;

    setStep("skills");
  };

  const handleSkillsContinue = () => {
    setStep("interests");
  };

  const handleBack = () => {
    if (step === "interests") {
      setStep("skills");
      return;
    }

    if (step === "skills") {
      setStep("direction");
      return;
    }

    navigate("/feed");
  };

  const handleFinish = async () => {
  if (!selectedDirection) return;

  try {
    setIsSaving(true);

    await selectLearningDirection(selectedDirection);

    const existingSkills = await profileApi.getMySkills().catch(() => []);
    const existingSkillIds = new Set(existingSkills.map((s) => s.id));

    const skillsToAdd = selectedSkills.filter(
      (id) => !existingSkillIds.has(id)
    );

    await Promise.all(
      skillsToAdd.map((skillId) => profileApi.addMySkill(skillId))
    );

    const availableInterests = await profileApi
      .getInterests()
      .catch(() => []);

    if (availableInterests.length > 0) {
      const interestIdSet = new Set(availableInterests.map((i) => i.id));
      const existingInterests = await profileApi
        .getMyInterests()
        .catch(() => []);
      const existingInterestIds = new Set(
        existingInterests.map((i) => i.id)
      );

      const interestsToAdd = selectedInterests.filter(
        (id) =>
          interestIdSet.has(id) && !existingInterestIds.has(id)
      );

      await Promise.all(
        interestsToAdd.map((id) => profileApi.addMyInterest(id))
      );
    }

    navigate("/feed");
  } catch (error) {
    console.error("Onboarding failed:", error);
  } finally {
    setIsSaving(false);
  }
};

  const stepNumber =
    step === "direction"
      ? 1
      : step === "skills"
        ? 2
        : 3;

  return (
    <>
      <AuthHeader />

      <div className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary-text">
            <HugeiconsIcon
              icon={FlashIcon}
              size={14}
            />

            <span>
              {t(
                "onboarding.algorithmBadge"
              )}
            </span>
          </div>

          {/* Header */}
          <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-text-tertiary">
                Step {stepNumber} of 3
              </p>

              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
                {step === "direction" &&
                  "What do you want to learn?"}

                {step === "skills" &&
                  "What can you teach?"}

                {step === "interests" &&
                  "What are you interested in?"}
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                {step === "direction" &&
                  "Choose one topic you want to focus on first."}

                {step === "skills" &&
                  "Choose the topics you already know and can teach."}

                {step === "interests" &&
                  "Choose the topics you are interested in exploring."}
              </p>
            </div>

            {/* Matching */}
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-surface-2 px-5 py-3 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-soft text-success">
                <HugeiconsIcon
                  icon={Timer02Icon}
                  size={18}
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  Matching
                </p>

                <p className="text-sm font-bold text-text-primary">
                  Personalized
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((number) => (
              <div
                key={number}
                className={`h-2 rounded-full ${number <= stepNumber
                    ? "bg-primary"
                    : "bg-surface-soft"
                  }`}
              />
            ))}
          </div>

          {/* ================================================= */}
          {/* STEP 1 - LEARNING DIRECTION                       */}
          {/* ================================================= */}

          {step === "direction" && (
            <div className="mt-8">
              {topicsLoading && (
                <div className="rounded-3xl border border-border bg-surface-2 p-8 text-center shadow-card">
                  <p className="text-sm text-text-secondary">
                    Loading topics...
                  </p>
                </div>
              )}

              {topicsError && (
                <div className="rounded-3xl border border-border bg-surface-2 p-8 text-center shadow-card">
                  <p className="text-sm text-error">
                    We couldn't load the topics.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      refetchTopics()
                    }
                    className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white"
                  >
                    Try again
                  </button>
                </div>
              )}

              {!topicsLoading &&
                !topicsError &&
                topics.length === 0 && (
                  <div className="rounded-3xl border border-border bg-surface-2 p-8 text-center shadow-card">
                    <p className="text-sm font-semibold text-text-primary">
                      No topics are available.
                    </p>

                    <p className="mt-2 text-sm text-text-tertiary">
                      The skills endpoint returned no
                      topics.
                    </p>
                  </div>
                )}

              {!topicsLoading &&
                !topicsError &&
                topics.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {topics.map((topic) => {
                      const isSelected =
                        selectedDirection ===
                        topic.id;

                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() =>
                            setSelectedDirection(
                              topic.id
                            )
                          }
                          className={`group rounded-3xl border p-6 text-start shadow-card transition-all ${isSelected
                              ? "border-primary bg-primary-soft"
                              : "border-border bg-surface-2 hover:border-primary/50"
                            }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-text">
                              <HugeiconsIcon
                                icon={FlashIcon}
                                size={20}
                              />
                            </div>

                            {isSelected && (
                              <HugeiconsIcon
                                icon={
                                  CheckmarkCircle01Icon
                                }
                                size={22}
                                className="text-primary"
                              />
                            )}
                          </div>

                          <h2 className="mt-5 text-base font-bold text-text-primary">
                            {topic.name}
                          </h2>

                          {topic.description && (
                            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                              {topic.description}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>
          )}

          {/* ================================================= */}
          {/* STEP 2 - SKILLS                                   */}
          {/* ================================================= */}

          {step === "skills" && (
            <div className="mt-8">
              <TopicMultiSelectCard
                title="Your skills"
                description="Choose the topics you already know and can teach to other users."
                items={topics}
                selectedIds={selectedSkills}
                onChange={setSelectedSkills}
                isLoading={topicsLoading}
              />
            </div>
          )}

          {/* ================================================= */}
          {/* STEP 3 - INTERESTS                                */}
          {/* ================================================= */}

          {step === "interests" && (
            <div className="mt-8">
              <TopicMultiSelectCard
                title="Your interests"
                description="Choose the topics you are interested in. These are separate from your skills and learning direction."
                items={topics}
                selectedIds={selectedInterests}
                onChange={setSelectedInterests}
                isLoading={topicsLoading}
              />
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-surface-2 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="text-sm font-medium text-text-tertiary transition-colors hover:text-text-primary"
            >
              {step === "direction"
                ? t(
                  "onboarding.actions.skip"
                )
                : "Back"}
            </button>

            <button
              type="button"
              disabled={
                isSaving ||
                (step === "direction" &&
                  !selectedDirection)
              }
              onClick={() => {
                if (
                  step === "direction"
                ) {
                  handleDirectionContinue();
                  return;
                }

                if (step === "skills") {
                  handleSkillsContinue();
                  return;
                }

                handleFinish();
              }}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving
                ? "Saving..."
                : step === "interests"
                  ? "Finish"
                  : "Continue"}

              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                className="rtl:rotate-180"
              />
            </button>
          </div>
        </div>
      </div>

      <AuthFooter />
    </>
  );
}