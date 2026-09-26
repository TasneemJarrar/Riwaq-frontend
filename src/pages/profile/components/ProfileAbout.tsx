import { useTranslation } from "react-i18next";

interface ProfileAboutProps {
  bio: string | null | undefined;
}

export default function ProfileAbout({ bio }: ProfileAboutProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface-soft p-5">
      <h2 className="text-sm font-bold">{t("profile.aboutTitle")}</h2>

      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text-secondary">
        {bio || t("profile.noBio")}
      </p>
    </div>
  );
}