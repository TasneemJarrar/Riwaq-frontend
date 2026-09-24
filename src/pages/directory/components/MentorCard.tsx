import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { PersonRecommendationItem } from "../../../api/recommendations";

interface Props {
  item: PersonRecommendationItem;
  onRequest: (userId: string) => void;
  isRequesting: boolean;
  alreadySent: boolean;
}

export default function MentorCard({
  item,
  onRequest,
  isRequesting,
  alreadySent,
}: Props) {
  const { t } = useTranslation();
  const { profile, similarityScore, sharedSkills, sharedInterests } = item;

  const name =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    t("profile.unknownUser");

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  const matchPercent = Math.round((similarityScore ?? 0) * 100);
  const teaches = (sharedSkills ?? []).slice(0, 4);
  const seeks = (sharedInterests ?? []).slice(0, 4);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-2 p-5 shadow-card">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link
          to={`/users/${profile.userId}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-text transition hover:ring-2 hover:ring-primary/40"
        >
          {initials}
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/users/${profile.userId}`}
              className="text-base font-bold text-text-primary hover:text-primary-text hover:underline"
            >
              {name}
            </Link>
            {matchPercent > 0 && (
              <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary-text">
                {t("discover.match", {
                  defaultValue: "{{percent}}% AI Match",
                  percent: matchPercent,
                })}
              </span>
            )}
          </div>

          {profile.learningDirectionName && (
            <p className="mt-0.5 text-xs text-text-tertiary">
              {profile.learningDirectionName}
              {profile.university ? ` · ${profile.university}` : ""}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
        {profile.bio?.trim() || t("profile.noBio")}
      </p>

      {/* TEACHES */}
      {teaches.length > 0 && (
        <div className="mt-4">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-success-text">
            {t("discover.teaches", { defaultValue: "Teaches" })}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {teaches.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-medium text-text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SEEKS */}
      {seeks.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gamification-text">
            {t("discover.seeks", { defaultValue: "Seeks" })}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {seeks.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-medium text-text-secondary"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 mt-5">
        <p className="text-[11px] text-text-tertiary">
          {t("discover.consumesRequest", {
            defaultValue: "Uses 1 connection request",
          })}
        </p>

        <button
          type="button"
          disabled={alreadySent || isRequesting}
          onClick={() => onRequest(profile.userId)}
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-cta transition hover:bg-primary-hover disabled:opacity-60"
        >
          {alreadySent
            ? t("discover.requestSent", { defaultValue: "Request sent" })
            : t("discover.sendRequest", {
                defaultValue: "Send Connection Request",
              })}
        </button>
      </div>
    </article>
  );
}