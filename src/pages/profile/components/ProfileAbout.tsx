import { useTranslation } from "react-i18next";

interface ProfileAboutProps {
  bio: string | null | undefined;
  onEdit: () => void;
}

export default function ProfileAbout({ bio, onEdit }: ProfileAboutProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface-soft p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">{t("profile.aboutTitle")}</h2>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold text-primary-text hover:underline"
        >
          {t("profile.edit")}
        </button>
      </div>

      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text-secondary">
        {bio || t("profile.noBio")}
      </p>
    </div>
  );
}