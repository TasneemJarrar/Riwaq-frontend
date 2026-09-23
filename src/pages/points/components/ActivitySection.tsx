import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  FlashIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";

import { usePointsTransactions } from "../../../hooks/usePoints";
import type { ActivityType } from "../../../api/points";

type ActivityFilter = "all" | "earned" | "spent";

export default function ActivitySection() {
  const { t } = useTranslation();
  const { data: activityItems = [], isLoading, isError } =
    usePointsTransactions();

  const [filter, setFilter] = useState<ActivityFilter>("all");

  const filteredItems = useMemo(() => {
    if (filter === "all") {
      return activityItems;
    }

    if (filter === "earned") {
      return activityItems.filter((item) => item.type !== "spent");
    }

    return activityItems.filter((item) => item.type === "spent");
  }, [filter, activityItems]);

  const activityIcon = (type: ActivityType) => {
    if (type === "spent") {
      return RefreshIcon;
    }

    if (type === "bonus") {
      return FlashIcon;
    }

    return CheckmarkCircle02Icon;
  };

  const activityIconClasses = (type: ActivityType) => {
    if (type === "spent") {
      return "bg-gamification-soft text-gamification-text";
    }

    if (type === "bonus") {
      return "bg-primary-soft text-primary-text";
    }

    return "bg-success-soft text-success-text";
  };

  return (
    <section className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card lg:col-span-2">
      <div>
        <h2 className="text-xl font-bold text-text-primary">
          {t("points.activity.title")}
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          {t("points.activity.subtitle")}
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {[
          {
            value: "all" as const,
            label: t("points.activity.filters.all"),
          },
          {
            value: "earned" as const,
            label: t("points.activity.filters.earned"),
          },
          {
            value: "spent" as const,
            label: t("points.activity.filters.spent"),
          },
        ].map((item) => {
          const active = filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "bg-surface-soft text-text-secondary hover:bg-primary-soft hover:text-primary-text"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Activity List */}
      <div className="mt-5 divide-y divide-border">
        {isLoading ? (
          <div className="space-y-4 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-surface-soft" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-surface-soft" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-surface-soft" />
                </div>
                <div className="h-4 w-16 animate-pulse rounded bg-surface-soft" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-10 text-center">
            <p className="text-sm text-error">
              Failed to load activity. Please try again.
            </p>
          </div>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const Icon = activityIcon(item.type);

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activityIconClasses(
                    item.type
                  )}`}
                >
                  <HugeiconsIcon
                    icon={Icon}
                    className="h-5 w-5"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {item.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-text-tertiary">
                    {item.meta}
                  </p>
                </div>

                <div className="shrink-0 text-end">
                  <p
                    className={`text-sm font-bold ${
                      item.amount > 0
                        ? "text-success-text"
                        : "text-text-primary"
                    }`}
                  >
                    {item.amount > 0 ? "+" : ""}
                    {item.amount} PTS
                  </p>

                  <p className="mt-1 text-xs text-text-tertiary">
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm text-text-secondary">
              No activity found.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-text-tertiary">
          {t("points.activity.showing", {
            shown: filteredItems.length,
            total: activityItems.length,
          })}
        </p>

        <button
          type="button"
          className="text-xs font-semibold text-primary-text hover:text-primary"
        >
          {t("points.activity.download")}
        </button>
      </div>
    </section>
  );
}
