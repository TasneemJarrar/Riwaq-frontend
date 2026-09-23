import { useTranslation } from "react-i18next";
import type { RatingResponse } from "../../../api/profile";

interface ProfileReviewsProps {
  ratings: RatingResponse[];
  isLoading: boolean;
  isError: boolean;
}

function Stars({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(5, score));
  return (
    <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary-text">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < clamped ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
      <span className="ms-1.5 text-xs text-text-secondary">{score}/5</span>
    </span>
  );
}

export default function ProfileReviews({
  ratings,
  isLoading,
  isError,
}: ProfileReviewsProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="mt-6 rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <div className="h-6 w-40 animate-pulse rounded bg-surface-soft" />
        <div className="mt-4 space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-surface-soft"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <p className="text-sm text-error">{t("profile.reviews.loadError")}</p>
      </div>
    );
  }

  return (
    <section className="mt-6 rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary-text">
        {t("profile.reviews.label")}
      </p>
      <h2 className="mt-1 text-xl font-extrabold">
        {t("profile.reviews.title")}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
        {t("profile.reviews.subtitle")}
      </p>

      <div className="mt-6 space-y-3">
        {ratings.length > 0 ? (
          ratings.map((rating) => {
            const raterName =
              `${rating.rater?.firstName ?? ""} ${rating.rater?.lastName ?? ""}`.trim() ||
              t("profile.unknownUser");

            return (
              <div
                key={rating.id}
                className="rounded-2xl border border-border bg-surface-soft p-4 sm:p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {raterName}
                    </p>
                    <p className="mt-1 text-xs text-text-tertiary">
                      {new Date(rating.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Stars score={rating.score} />
                </div>
                {rating.review && (
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {rating.review}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-text-tertiary">
            {t("profile.reviews.empty")}
          </p>
        )}
      </div>
    </section>
  );
}