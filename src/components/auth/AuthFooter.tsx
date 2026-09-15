import { useTranslation } from "react-i18next";

export function AuthFooter() {
  const { t } = useTranslation();

  return (
    <footer className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs text-text-tertiary">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-success" />
        <span>{t("auth.footer.status")}</span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="#privacy"
          className="transition-colors hover:text-text-primary">
          {t("auth.footer.privacy")}
        </a>

        <span>·</span>

        <a
          href="#protocol"
          className="transition-colors hover:text-text-primary">
          {t("auth.footer.protocol")}
        </a>

        <span>·</span>

        <a href="#audit" className="transition-colors hover:text-text-primary">
          {t("auth.footer.audit")}
        </a>
      </div>
    </footer>
  );
}
