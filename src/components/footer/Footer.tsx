import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="border-t border-border bg-surface-1 py-4 text-xs text-text-tertiary">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-6">
        <div>
          © {new Date().getFullYear()} Riwaq Inc. All rights reserved.
        </div>

        <div className="flex items-center gap-8">
          <Link
            to="/code-of-conduct"
            className="transition-colors hover:text-text-primary"
          >
            {t("footer.codeOfConduct", "Code of Conduct")}
          </Link>
          <Link
            to="/protocols"
            className="transition-colors hover:text-text-primary"
          >
            {t("footer.protocols", "Skill Verification Protocols")}
          </Link>
        </div>

        <div className="flex items-center rounded-full border border-border bg-surface-soft p-1">
          <button
            type="button"
            onClick={() => handleLanguageChange("en")}
            className={`rounded-full px-3 py-1 font-semibold transition-all ${
              i18n.language === "en"
                ? "bg-surface-1 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange("ar")}
            className={`rounded-full px-3 py-1 font-semibold transition-all ${
              i18n.language === "ar"
                ? "bg-surface-1 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            AR
          </button>
        </div>
      </div>
    </footer>
  );
}