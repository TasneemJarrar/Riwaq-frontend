import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  ShieldEllipsisIcon,
} from "@hugeicons/core-free-icons";

import {
  useReceivedConnectionRequests,
  useUpdateConnectionRequestStatus,
} from "../../../hooks/useConnections";

export default function EarnPointsSection() {
  const { t } = useTranslation();
  const {
    data: earnRequests = [],
    isLoading,
    isError,
  } = useReceivedConnectionRequests();
  const updateStatus = useUpdateConnectionRequestStatus();

  const handleAccept = (id: string) => {
    updateStatus.mutate({ id, status: "Accepted" });
  };

  return (
    <section className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
      <div>
        <h2 className="text-xl font-bold text-text-primary">
          {t("points.earnMore.title")}
        </h2>

        <p className="mt-1 text-sm leading-5 text-text-secondary">
          {t("points.earnMore.subtitle")}
        </p>
      </div>

      {/* Requests */}
      <div className="mt-6 space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface-soft p-4"
              >
                <div className="h-5 w-20 animate-pulse rounded-full bg-surface-1" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-surface-1" />
                <div className="mt-4 h-8 w-24 animate-pulse rounded-lg bg-surface-1" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-border bg-surface-soft p-4 text-center">
            <p className="text-sm text-error">
              Failed to load requests. Please try again.
            </p>
          </div>
        ) : earnRequests.length > 0 ? (
          earnRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-xl border border-border bg-surface-soft p-4 transition-colors hover:border-primary"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${request.tagClassName}`}
                >
                  {request.tag}
                </span>

                <span className="text-xs text-text-tertiary">
                  {request.eta}
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold leading-5 text-text-primary">
                {request.title}
              </p>

              <button
                type="button"
                disabled={updateStatus.isPending}
                onClick={() => handleAccept(request.id)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateStatus.isPending
                  ? "..."
                  : t("points.earnMore.accept")}

                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="h-3.5 w-3.5 rtl:rotate-180"
                />
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-border bg-surface-soft p-6 text-center">
            <p className="text-sm text-text-secondary">
              No pending connection requests right now.
            </p>
          </div>
        )}
      </div>

      {/* Trust Score (static until backend exposes it) */}
      <div className="mt-6 rounded-xl border border-border bg-surface-soft p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-soft text-success-text">
            <HugeiconsIcon icon={ShieldEllipsisIcon} className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-text-primary">
                {t("points.earnMore.trustScore", {
                  percent: 98.4,
                })}
              </p>
            </div>

            <p className="mt-1 text-xs leading-5 text-text-secondary">
              {t("points.earnMore.trustSubtitle", {
                percent: 5,
              })}
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-1">
          <div className="h-full w-[98.4%] rounded-full bg-success" />
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-success-text">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-4 w-4" />
          <span>{t("points.status")}</span>
        </div>
      </div>
    </section>
  );
}