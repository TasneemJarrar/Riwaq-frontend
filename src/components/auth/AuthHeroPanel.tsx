import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  RefreshIcon,
  TrendingUpIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";

export function AuthHeroPanel() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-6 lg:border-r lg:border-border">
      <div>
        {/* Protocol Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-soft px-3.5 py-1 text-xs text-primary">
          <HugeiconsIcon icon={RefreshIcon} className="h-3.5 w-3.5" />
          <span>{t("auth.decentralizedExchange")}</span>
        </div>

        {/* Hero Title */}
        <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
          {t("auth.heroTitlePrefix")}{" "}
          <span className="bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent underline decoration-primary/40 underline-offset-8">
            {t("auth.heroTitleHighlight")}
          </span>
          .
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary">
          {t("auth.heroSubtitle")}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {/* Active Exchanges Metric Card */}
          <div className="rounded-2xl border border-border bg-surface-2 p-5 shadow-card">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-text-tertiary">
              <span>{t("auth.activeExchanges")}</span>

              <HugeiconsIcon
                icon={RefreshIcon}
                className="h-4 w-4 text-success"
              />
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-text-primary">
                14,280+
              </span>

              <span className="flex items-center text-xs font-semibold text-success">
                <HugeiconsIcon
                  icon={TrendingUpIcon}
                  className="mr-0.5 h-3 w-3"
                />
                +18.4%
              </span>
            </div>

            {/* Activity Chart */}
            <div className="mt-4 flex h-8 items-end gap-1">
              {[40, 35, 55, 45, 60, 50, 75, 65, 90, 80, 100].map(
                (val, i) => (
                  <div
                    key={i}
                    style={{ height: `${val}%` }}
                    className="w-full rounded-t bg-success/40 transition-colors hover:bg-success"
                  />
                )
              )}
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface-2 p-5 shadow-card">
            <div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex text-gamification">
                  {[...Array(5)].map((_, i) => (
                    <HugeiconsIcon
                      key={i}
                      icon={StarIcon}
                      className="h-3.5 w-3.5 fill-current"
                    />
                  ))}
                </div>

                <span className="text-[11px] font-medium text-text-tertiary">
                  React ⇄ Figma
                </span>
              </div>

              <p className="mt-3 text-xs italic leading-relaxed text-text-secondary">
                “{t("auth.testimonialQuote").replace(/^“|”$/g, "")}”
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Alex Rivera"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/30"
              />

              <div>
                <p className="text-xs font-semibold text-text-primary">
                  Alex Rivera
                </p>
                <p className="text-[11px] text-text-tertiary">Ex-Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Metrics Footer */}
      <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-xs text-text-tertiary">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span>{t("auth.realTimeMatches")}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>{t("auth.avgResponseTime")}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gamification" />
          <span>{t("auth.fulfillmentRate")}</span>
        </div>
      </div>
    </div>
  );
}