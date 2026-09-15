import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sun01Icon,
  Moon02Icon,
  Mail01Icon,
  FlashIcon,
} from "@hugeicons/core-free-icons";
import useThemeStore from "../../hooks/useThemeStore";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useThemeStore();

  const navItems = [
    { label: t("nav.feed"), to: "/feed" },
    { label: t("nav.discover"), to: "/discover" },
    { label: t("nav.points"), to: "/points" },
    { label: t("nav.chats"), to: "/chat" },
    { label: t("nav.leaderboard"), to: "/leaderboard" },
  ];

  const switchLanguage = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-1">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <NavLink to="/feed" className="flex items-center gap-2">
            <img
              src="./src/assets/image-removebg-preview.png"
              alt="Riwaq Logo"
              className="h-8 w-8  object-cover"
            />
            <span className="text-xl font-bold tracking-tight text-text-primary">
              {t("brand")} <span className="text-amber-400">•</span>
            </span>
          </NavLink>

          <div className="flex items-center rounded-full border border-border bg-surface-soft p-1">
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${i18n.language === "en"
                ? "bg-surface-1 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
                }`}>
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLanguage("ar")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${i18n.language === "ar"
                ? "bg-surface-1 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
                }`}>
              AR
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-surface-soft hover:text-text-primary"
            aria-label={t("actions.toggleTheme")}>
            <HugeiconsIcon
              icon={mode === "dark" ? Sun01Icon : Moon02Icon}
              size={18}
            />
          </button>
        </div>

        <nav className="hidden items-center rounded-full border border-border bg-surface-soft/50 p-1.5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive
                  ? "bg-primary-soft text-primary-text shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
                }`
              }>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs text-text-secondary">
            <HugeiconsIcon icon={Mail01Icon} size={14} />
            <span>2/5 Left</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-500">
            <HugeiconsIcon icon={FlashIcon} size={14} />
            <span>350 Points</span>
          </div>

          <NavLink to="/profile" className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="User avatar"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-border"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-1" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}