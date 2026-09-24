import { useTranslation } from "react-i18next";

export type FeedFilterKey = "curated" | "swap";

interface Props {
  active: FeedFilterKey;
  onChange: (key: FeedFilterKey) => void;
}

export default function FeedFilters({ active, onChange }: Props) {
  const { t } = useTranslation();

  const filters: { key: FeedFilterKey; labelKey: string }[] = [
    { key: "curated", labelKey: "feed.filters.curated" },
    { key: "swap", labelKey: "feed.filters.swap" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            active === f.key
              ? "bg-primary text-white shadow-sm"
              : "border border-border bg-surface-1 text-text-secondary hover:bg-surface-hover hover:text-text-primary"
          }`}
        >
          {t(f.labelKey)}
        </button>
      ))}
    </div>
  );
}