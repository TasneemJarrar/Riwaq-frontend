import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Calendar01Icon, FlashIcon, ShieldEllipsisIcon, StarIcon, Timer02Icon, Add01Icon } from "@hugeicons/core-free-icons";
import { mockSkills } from "../../data/mockSkills";
import {
  SkillSelectorCard,
  type SelectedLearnSkill,
  type SelectedTeachSkill,
} from "../../components/onboarding/SkillSelectorCard";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthFooter } from "../../components/auth/AuthFooter";

export default function OnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [teachSkills, setTeachSkills] = useState<SelectedTeachSkill[]>([]);
  const [learnSkills, setLearnSkills] = useState<SelectedLearnSkill[]>([]);
  const [weeklyHours, setWeeklyHours] = useState<1 | 2 | 4>(2);

  const teachNames = useMemo(
    () =>
      teachSkills
        .map((item) => item.skill.name)
        .slice(0, 2)
        .join(" & "),
    [teachSkills]
  );

  const handleComplete = () => {
    const onboardingData = {
      teachSkills: teachSkills.map((item) => ({
        skillId: item.skill.id,
        proficiency: item.proficiency,
      })),
      learnSkills: learnSkills.map((item) => ({
        skillId: item.skill.id,
        priority: item.priority,
      })),
      weeklyHours,
    };

    console.log("Onboarding Payload:", onboardingData);

    navigate("/feed");
  };

  const synergySuggestions = [
    "TypeScript",
    "React",
    "UI/UX Design",
  ];

  return (<>

    <AuthHeader />
    <div className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary-text">
          <HugeiconsIcon icon={FlashIcon} size={14} />
          <span>{t("onboarding.algorithmBadge")}</span>
        </div>

        {/* Heading */}
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
              {t("onboarding.heading")}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
              {t("onboarding.subheading")}
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

        {/* Skill Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <SkillSelectorCard
            mode="teach"
            skills={mockSkills}
            selectedTeachSkills={teachSkills}
            onTeachChange={setTeachSkills}
          />

          <SkillSelectorCard
            mode="learn"
            skills={mockSkills}
            selectedLearnSkills={learnSkills}
            onLearnChange={setLearnSkills}
          />
        </div>

        {/* Weekly Commitment */}
        <div className="mt-6 rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-soft text-success">
                <HugeiconsIcon icon={Calendar01Icon} size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {t("onboarding.weeklyCommitment.title")}
                </p>

                <p className="text-xs text-text-tertiary">
                  {t("onboarding.weeklyCommitment.recommended", {
                    hours: "2.0",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-border bg-surface-1 p-1 w-fit">
              {[1, 2, 4].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() =>
                    setWeeklyHours(hours as 1 | 2 | 4)
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${weeklyHours === hours
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  {hours === 2
                    ? t("onboarding.weeklyCommitment.hours", {
                      hours: "2.0",
                    })
                    : t("onboarding.weeklyCommitment.hours", {
                      hours,
                    })}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Verification */}
        <div className="mt-6 rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-soft text-success">
                <HugeiconsIcon
                  icon={ShieldEllipsisIcon}
                  size={18}
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {t("onboarding.skillVerification.label")}
                </p>

                <p className="mt-1 text-xs text-text-tertiary">
                  {t("onboarding.skillVerification.description")}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-gamification-soft px-3 py-1 text-xs font-semibold text-gamification-text">
              {t("onboarding.skillVerification.tier")}
            </span>
          </div>
        </div>

        {/* AI Synergy Engine */}
        {teachSkills.length > 0 && (
          <div className="mt-6 rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-text">
                  <HugeiconsIcon icon={StarIcon} size={18} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-text-primary">
                      {t("onboarding.synergy.title")}
                    </h3>

                    <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-text">
                      {t("onboarding.synergy.badge")}
                    </span>
                  </div>

                  <p className="mt-1 max-w-md text-sm leading-relaxed text-text-secondary">
                    {t("onboarding.synergy.description", {
                      skills: teachNames || "—",
                    })}
                  </p>
                </div>
              </div>

              {/* Suggested Skills */}
              <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
                {synergySuggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary-text"
                  >
                    <HugeiconsIcon icon={Add01Icon} size={12} />
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-surface-2 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/feed")}
            className="text-sm font-medium text-text-tertiary transition-colors hover:text-text-primary"
          >
            {t("onboarding.actions.skip")}
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-gamification-soft px-3.5 py-1.5 text-xs font-semibold text-gamification-text">
            <HugeiconsIcon icon={FlashIcon} size={14} />
            {t("onboarding.actions.karma", {
              points: 50,
            })}
          </span>

          <button
            type="button"
            onClick={handleComplete}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-hover"
          >
            {t("onboarding.actions.complete")}

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
