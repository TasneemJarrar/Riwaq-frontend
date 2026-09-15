import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#0f141d] py-4 text-xs text-slate-400">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div>
          © {new Date().getFullYear()} Riwaq Inc. All rights reserved.
        </div>

        <div className="flex items-center gap-8">
          <Link
            to="/code-of-conduct"
            className="transition-colors hover:text-slate-200"
          >
            {t("footer.codeOfConduct", "Code of Conduct")}
          </Link>
          <Link
            to="/protocols"
            className="transition-colors hover:text-slate-200"
          >
            {t("footer.protocols", "Skill Verification Protocols")}
          </Link>
        </div>

        <div className="flex items-center rounded-full border border-slate-800 bg-slate-900/60 p-1">
          <button
            type="button"
            onClick={() => handleLanguageChange("en")}
            className={`rounded-full px-3 py-1 font-semibold transition-all ${
              i18n.language === "en"
                ? "bg-slate-800 text-slate-100 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange("ar")}
            className={`rounded-full px-3 py-1 font-semibold transition-all ${
              i18n.language === "ar"
                ? "bg-slate-800 text-slate-100 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            AR
          </button>
        </div>
      </div>
    </footer>
  );
}