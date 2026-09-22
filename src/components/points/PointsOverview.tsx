import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FlashIcon,
  ArrowRight01Icon,
  GraduationScrollIcon,
  ShieldEllipsisIcon,
  TrendingUpIcon,
} from "@hugeicons/core-free-icons";
import { usePointsBalance, usePointsStats } from "../../hooks/usePoints";

export default function PointsOverview() {
  const { t } = useTranslation();
  const { data: balanceData, isLoading: balanceLoading, isError: balanceError } =
    usePointsBalance();
  const {
    lifetimeEarned,
    pointsRedeemed,
    redeemedCount,
    isLoading: statsLoading,
  } = usePointsStats();

  const balance = balanceData?.points ?? 0;
  const isLoading = balanceLoading || statsLoading;

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success-text">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              {t("points.status")}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("points.heading")}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
            {t("points.subheading")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-1 px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary-text"
          >
            <HugeiconsIcon
              icon={ShieldEllipsisIcon}
              className="h-4 w-4"
            />
            {t("points.exchangeRules")}
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-hover"
          >
            <HugeiconsIcon
              icon={FlashIcon}
              className="h-4 w-4"
            />
            {t("points.teachToEarn")}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Balance Card */}
        <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">
                {t("points.balance.label")}
              </p>

              <div className="mt-3 flex items-baseline gap-2">
                {isLoading ? (
                  <span className="h-10 w-24 animate-pulse rounded-lg bg-surface-soft" />
                ) : balanceError ? (
                  <span className="text-2xl font-bold text-error">—</span>
                ) : (
                  <span className="text-4xl font-bold tracking-tight text-text-primary">
                    {balance.toLocaleString()}
                  </span>
                )}

                <span className="text-sm font-medium text-text-tertiary">
                  {t("points.balance.unit")}
                </span>
              </div>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
              <HugeiconsIcon
                icon={FlashIcon}
                className="h-5 w-5"
              />
            </div>
          </div>

          <p className="mt-3 text-xs leading-5 text-text-secondary">
            {t("points.balance.earnHint")}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-text-secondary">
                {t("points.balance.quotaLabel")}
              </span>

              <span className="font-medium text-text-primary">
                {t("points.balance.quotaValue", {
                  used: 2,
                  total: 5,
                })}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-surface-soft">
              <div className="h-full w-[40%] rounded-full bg-primary" />
            </div>

            <p className="mt-2 text-xs text-text-tertiary">
              {t("points.balance.quotaReset", {
                days: 11,
              })}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          {/* Lifetime Earned */}
          <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-soft text-success-text">
                <HugeiconsIcon
                  icon={TrendingUpIcon}
                  className="h-5 w-5"
                />
              </div>

              <div>
                <p className="text-sm text-text-secondary">
                  {t("points.stats.lifetimeEarned")}
                </p>

                {isLoading ? (
                  <div className="mt-1 h-8 w-20 animate-pulse rounded-lg bg-surface-soft" />
                ) : (
                  <p className="mt-1 text-2xl font-bold text-text-primary">
                    {lifetimeEarned.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-5 text-xs font-medium text-success-text">
              {t("points.stats.lifetimeGrowth", {
                percent: 12,
              })}
            </p>
          </div>

          {/* Points Redeemed */}
          <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gamification-soft text-gamification-text">
                <HugeiconsIcon
                  icon={GraduationScrollIcon}
                  className="h-5 w-5"
                />
              </div>

              <div>
                <p className="text-sm text-text-secondary">
                  {t("points.stats.pointsRedeemed")}
                </p>

                {isLoading ? (
                  <div className="mt-1 h-8 w-20 animate-pulse rounded-lg bg-surface-soft" />
                ) : (
                  <p className="mt-1 text-2xl font-bold text-text-primary">
                    {pointsRedeemed.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-5 text-xs text-text-tertiary">
              {t("points.stats.redeemedCount", {
                count: redeemedCount,
              })}
            </p>
          </div>

          {/* Exchange Ratio */}
          <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card sm:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-text-secondary">
                  {t("points.stats.exchangeRatio")}
                </p>

                <p className="mt-1 text-2xl font-bold text-text-primary">
                  {t("points.stats.exchangeRatioValue", {
                    points: 100,
                  })}
                </p>
              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-text sm:flex">
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="h-5 w-5 rtl:rotate-180"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How Points Work */}
      <div className="mt-8 rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {t("points.howItWorks.title")}
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              {t("points.teachToEarn")}
            </p>
          </div>

          <span className="w-fit rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success-text">
            {t("points.howItWorks.free")}
          </span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-soft text-xs font-bold text-success-text">
              01
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                {t("points.howItWorks.step1Title")}
              </h3>

              <p className="mt-1 text-sm leading-5 text-text-secondary">
                {t("points.howItWorks.step1Desc")}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gamification-soft text-xs font-bold text-gamification-text">
              02
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                {t("points.howItWorks.step2Title")}
              </h3>

              <p className="mt-1 text-sm leading-5 text-text-secondary">
                {t("points.howItWorks.step2Desc")}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xs font-bold text-primary-text">
              03
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                {t("points.howItWorks.step3Title")}
              </h3>

              <p className="mt-1 text-sm leading-5 text-text-secondary">
                {t("points.howItWorks.step3Desc")}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-text transition-colors hover:text-primary"
        >
          {t("points.howItWorks.learnMore")}

          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="h-4 w-4 rtl:rotate-180"
          />
        </button>
      </div>
    </>
  );
}
