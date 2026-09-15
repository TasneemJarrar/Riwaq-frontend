import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Globe02Icon } from "@hugeicons/core-free-icons";

export function AuthHeader() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <img className="h-8 w-8  object-cover" src="./src/assets/image-removebg-preview.png" alt="Brand Icon" />

        {/* Brand Name */}
        <span className="text-xl font-bold tracking-tight text-text-primary">
          {t("brand")}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Protocol Status */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface-soft px-3.5 py-1 text-xs text-text-secondary">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          <span>{t("auth.zeroPayProtocol")}</span>
        </div>

        {/* Language Switcher */}
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
