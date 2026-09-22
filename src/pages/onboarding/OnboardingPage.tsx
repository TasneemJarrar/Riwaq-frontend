import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, FlashIcon, Timer02Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthFooter } from "../../components/auth/AuthFooter";
import { useLearningDirections } from "../../hooks/useLearningDirections";
import { selectLearningDirection } from "../../api/learningDirections";

export default function OnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: learningDirections, isLoading, isError } = useLearningDirections();
  console.log("Learning Directions:", learningDirections);
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    if (!selectedDirection) return;

    try {
      setIsSaving(true);

      await selectLearningDirection(selectedDirection);

      console.log("Selected learning direction:", selectedDirection);

      // Next step will be added here.
    } catch (error) {
      console.error("Failed to select learning direction:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <AuthHeader />

      <div className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary-text">
            <HugeiconsIcon icon={FlashIcon} size={14} />
            <span>{t("onboarding.algorithmBadge")}</span>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
                {t("onboarding.learningMethod.title")}
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                {t("onboarding.learningMethod.description")}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2 px-5 py-3 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-soft text-success">
                <HugeiconsIcon icon={Timer02Icon} size={18} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  {t("onboarding.pairingVelocity.label")}
                </p>

                <p className="text-sm font-bold text-text-primary">
                  {t("onboarding.pairingVelocity.value")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {isLoading && (
              <div className="rounded-3xl border border-border bg-surface-2 p-8 text-center shadow-card">
                <p className="text-sm text-text-secondary">
                  {t("onboarding.learningMethod.loading")}
                </p>
              </div>
            )}

            {isError && (
              <div className="rounded-3xl border border-border bg-surface-2 p-8 text-center shadow-card">
                <p className="text-sm text-error">
                  {t("onboarding.learningMethod.error")}
                </p>
              </div>
            )}

            {!isLoading && !isError && (
              <div className="grid gap-4 sm:grid-cols-2">
                {learningDirections?.map((direction) => {
                  const isSelected = selectedDirection === direction.id;

                  return (
                    <button
                      key={direction.id}
                      type="button"
                      onClick={() => setSelectedDirection(direction.id)}
                      className={`group rounded-3xl border p-6 text-start shadow-card transition-all ${
                        isSelected
                          ? "border-primary bg-primary-soft"
                          : "border-border bg-surface-2 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-text">
                          <HugeiconsIcon icon={FlashIcon} size={20} />
                        </div>

                        {isSelected && (
                          <HugeiconsIcon
                            icon={CheckmarkCircle01Icon}
                            size={22}
                            className="text-primary"
                          />
                        )}
                      </div>

                      <h2 className="mt-5 text-base font-bold text-text-primary">
                        {direction.name}
                      </h2>

                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {direction.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-surface-2 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => navigate("/feed")}
              className="text-sm font-medium text-text-tertiary transition-colors hover:text-text-primary"
            >
              {t("onboarding.actions.skip")}
            </button>

            <button
              type="button"
              disabled={!selectedDirection || isSaving}
              onClick={handleContinue}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving
                ? t("onboarding.learningMethod.saving")
                : t("onboarding.learningMethod.continue")}

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