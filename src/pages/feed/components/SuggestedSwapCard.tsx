import type { PersonRecommendationItem } from "../../../api/recommendations";

interface Props {
  item: PersonRecommendationItem;
  onRequestSwap: (userId: string) => void;
  isLoading?: boolean;
}

export default function SuggestedSwapCard({
  item,
  onRequestSwap,
  isLoading,
}: Props) {
  const { profile, similarityScore, sharedSkills } = item;
  const name =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Peer";

  const matchPercent = Math.round(similarityScore * 100);

  return (
    <div className="rounded-xl border border-border bg-surface-2 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-text">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{name}</p>
            <p className="text-xs text-text-tertiary">
              {profile.learningDirectionName || "Member"}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success-text">
          {matchPercent}% Match
        </span>
      </div>

      {sharedSkills && sharedSkills.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {sharedSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded bg-surface-soft px-1.5 py-0.5 text-[10px] text-text-secondary"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={isLoading}
        onClick={() => onRequestSwap(profile.userId)}
        className="w-full rounded-full bg-primary py-2 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-50"
      >
        Request Swap
      </button>
    </div>
  );
}