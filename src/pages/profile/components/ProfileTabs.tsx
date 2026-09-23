import { useTranslation } from "react-i18next";

export type ProfileTab = "reviews" | "skills" | "content" | "history";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onChange: (tab: ProfileTab) => void;
}

export default function ProfileTabs({ activeTab, onChange }: ProfileTabsProps) {
  const { t } = useTranslation();

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "reviews", label: t("profile.tabs.reviews") },
    { key: "skills", label: t("profile.tabs.skills") },
    { key: "content", label: t("profile.tabs.content") },
    { key: "history", label: t("profile.tabs.history") },
  ];

  return (
    <div className="mt-6 overflow-x-auto border-b border-border">
      <div className="flex min-w-max gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`rounded-t-2xl px-5 py-3.5 text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "bg-primary-soft text-primary-text"
                : "text-text-secondary hover:bg-surface-soft hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}