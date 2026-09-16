import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Globe02Icon,
  Sun03Icon,
  Moon02Icon,
} from "@hugeicons/core-free-icons";
import logo from "../../assets/navbars/riwaq-logo.png";

export function AuthHeader() {
  const { i18n, t } = useTranslation();
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  const toggleMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <div className="flex items-center gap-3">
        <img className="h-8 w-8 object-cover" src={logo} alt="Brand Icon" />

        <span className="text-xl font-bold tracking-tight text-text-primary">
          {t("brand")}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-border bg-surface-soft px-3.5 py-1 text-xs text-text-secondary md:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          <span>{t("auth.zeroPayProtocol")}</span>
        </div>

        <button
          type="button"
          onClick={toggleMode}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-soft text-text-secondary transition-colors hover:border-primary hover:text-text-primary"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <HugeiconsIcon
            icon={isDark ? Sun03Icon : Moon02Icon}
            className="h-4 w-4"
          />
        </button>

        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-2 rounded-full border border-border bg-surface-soft px-3.5 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-text-primary"
        >
          <HugeiconsIcon icon={Globe02Icon} className="h-3.5 w-3.5" />
          {i18n.language === "ar" ? "English" : "العربية"}
        </button>
      </div>
    </header>
  );
}