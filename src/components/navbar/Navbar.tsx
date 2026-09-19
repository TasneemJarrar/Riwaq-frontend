import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun01Icon, Moon02Icon, Mail01Icon, FlashIcon, Menu01Icon, Cancel01Icon, UserIcon, Logout01Icon } from "@hugeicons/core-free-icons";
import useThemeStore from "../../hooks/useThemeStore";
import logo from "../../assets/navbars/riwaq-logo.png";
import { useLogout } from "../../hooks/useLogout";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = useLogout();

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/feed"
            className="flex items-center gap-1.5 sm:gap-2"
            onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="Riwaq Logo" className="h-7 w-7 sm:h-8 sm:w-8 object-cover shrink-0" />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-text-primary truncate">
              {t("brand")} <span className="hidden text-amber-400 sm:inline">•</span>
            </span>
          </NavLink>

          {/* Language switcher */}
          <div className="hidden items-center rounded-full border border-border bg-surface-soft p-1 sm:flex">
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
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-surface-soft hover:text-text-primary"
            aria-label={t("actions.toggleTheme")}
          >
            <HugeiconsIcon icon={mode === "dark" ? Sun01Icon : Moon02Icon} size={18} />
          </button>
        </div>

        {/* Desktop nav links */}
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
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Mail badge */}
          <div className="hidden items-center gap-1.5 rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs text-text-secondary sm:flex">
            <HugeiconsIcon icon={Mail01Icon} size={14} />
            <span>2/5 Left</span>
          </div>

          {/* Points badge */}
          <div className="flex items-center gap-1 rounded-full bg-gamification-soft px-2.5 sm:px-3 py-1.5 text-xs font-medium text-gamification-text shrink-0">
            <HugeiconsIcon icon={FlashIcon} size={14} />
            <span>
              350<span className="hidden sm:inline"> Points</span>
            </span>
          </div>

          <NavLink to="/profile" className="relative hidden shrink-0 sm:block">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft ring-2 ring-border">
              <HugeiconsIcon icon={UserIcon} size={18} className="text-text-secondary" />
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface-1" />
          </NavLink>

          <button
            type="button"
            onClick={logout}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-error hover:text-error sm:flex"
            aria-label="Logout"
          >
            <HugeiconsIcon icon={Logout01Icon} size={18} />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary hover:text-text-primary md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <HugeiconsIcon icon={isMenuOpen ? Cancel01Icon : Menu01Icon} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-surface-1 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive
                  ? "bg-primary-soft text-primary-text"
                  : "text-text-secondary hover:bg-surface-soft hover:text-text-primary"
                }`
              }>
              {item.label}
            </NavLink>
          ))}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2.5 border-t border-border pt-3">
            <NavLink
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-soft ring-2 ring-border">
                <HugeiconsIcon icon={UserIcon} size={14} className="text-text-secondary" />
              </div>
              Profile
            </NavLink>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-2 text-sm font-medium text-text-secondary"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-soft ring-2 ring-border">
                <HugeiconsIcon icon={Logout01Icon} size={14} />
              </div>
              Logout
            </button>

            <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs text-text-secondary">
              <HugeiconsIcon icon={Mail01Icon} size={14} />
              <span>2/5 Left</span>
            </div>

            <div className="flex items-center rounded-full border border-border bg-surface-soft p-1">
              <button
                type="button"
                onClick={() => switchLanguage("en")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${i18n.language === "en"
                  ? "bg-surface-1 text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage("ar")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${i18n.language === "ar"
                  ? "bg-surface-1 text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                AR
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}