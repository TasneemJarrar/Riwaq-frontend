import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

export default function ExchangeSection() {
  const { t } = useTranslation();

  const getFeatureList = (key: string) => {
    return t(key, { returnObjects: true }) as string[];
  };

  const tiers = [
    {
      id: "starter",
      tag: t("points.exchange.tiers.starter.tag"),
      name: t("points.exchange.tiers.starter.name"),
      description: t("points.exchange.tiers.starter.description"),
      requests: t("points.exchange.tiers.starter.requests"),
      features: getFeatureList(
        "points.exchange.tiers.starter.features"
      ),
      notIncluded: t(
        "points.exchange.tiers.starter.notIncluded"
      ),
      cta: t("points.exchange.tiers.starter.cta", {
        points: 100,
      }),
      price: 100,
      original: null,
      recommended: false,
      label: "Single Slot",
      badgeClassName:
        "bg-surface-soft text-text-secondary",
      buttonClassName:
        "border border-border bg-surface-1 text-text-primary hover:border-primary hover:text-primary-text",
    },
    {
      id: "momentum",
      tag: t("points.exchange.tiers.momentum.tag"),
      name: t("points.exchange.tiers.momentum.name"),
      description: t("points.exchange.tiers.momentum.description"),
      requests: t("points.exchange.tiers.momentum.requests"),
      features: getFeatureList(
        "points.exchange.tiers.momentum.features"
      ),
      notIncluded: null,
      cta: t("points.exchange.tiers.momentum.cta", {
        points: 250,
      }),
      price: 250,
      original: 300,
      recommended: true,
      label: "High Velocity",
      badgeClassName:
        "bg-primary-soft text-primary-text",
      buttonClassName:
        "border border-border bg-surface-1 text-text-primary hover:border-primary hover:text-primary-text",
    },
    {
      id: "mastery",
      tag: t("points.exchange.tiers.mastery.tag", {
        points: 100,
      }),
      name: t("points.exchange.tiers.mastery.name"),
      description: t("points.exchange.tiers.mastery.description"),
      requests: t("points.exchange.tiers.mastery.requests"),
      features: getFeatureList(
        "points.exchange.tiers.mastery.features"
      ),
      notIncluded: null,
      cta: t("points.exchange.tiers.mastery.cta", {
        points: 400,
      }),
      price: 400,
      original: 500,
      recommended: false,
      label: "Cohort Scale",
      badgeClassName:
        "bg-gamification-soft text-gamification-text",
      buttonClassName:
        "border border-border bg-surface-1 text-text-primary hover:border-primary hover:text-primary-text",
    },
  ];

  return (
    <section className="mt-12">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-text">
          {t("points.selectTier")}
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-text-primary">
          {t("points.exchange.title")}
        </h2>

        <p className="max-w-2xl text-sm leading-6 text-text-secondary">
          {t("points.exchange.subtitle")}
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative flex flex-col rounded-2xl border border-border bg-surface-1 p-6 ${
              tier.recommended
                ? "shadow-elevated"
                : "shadow-card"
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-3 start-20 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                {t("points.exchange.recommended", {
                  points: 50,
                })}
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${tier.badgeClassName}`}
              >
                {tier.tag}
              </span>

              <span className="text-xs font-medium text-text-tertiary">
                {tier.label}
              </span>
            </div>

            <h3 className="mt-5 text-xl font-bold text-text-primary">
              {tier.name}
            </h3>

            <p className="mt-2 min-h-12 text-sm leading-5 text-text-secondary">
              {tier.description}
            </p>

            <div className="mt-6 flex items-end gap-2">
              <span className="text-3xl font-bold text-text-primary">
                {tier.price}
              </span>

              <span className="pb-1 text-sm font-medium text-text-tertiary">
                PTS
              </span>

              {tier.original && (
                <span className="pb-1 text-sm text-text-disabled line-through">
                  {tier.original}
                </span>
              )}
            </div>

            <div className="mt-6 rounded-xl bg-surface-soft p-4">
              <p className="text-sm font-semibold text-text-primary">
                {tier.requests}
              </p>

              <ul className="mt-4 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.notIncluded && (
                <p className="mt-4 text-xs text-text-tertiary">
                  {tier.notIncluded}
                </p>
              )}
            </div>

            <button
              type="button"
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${tier.buttonClassName}`}>
              {tier.cta}

              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="h-4 w-4 rtl:rotate-180"
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}