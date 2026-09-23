import { useTranslation } from "react-i18next";

interface ModalActionsProps {
  onCancel: () => void;
  loading: boolean;
  saveLabel: string;
}

export default function ModalActions({
  onCancel,
  loading,
  saveLabel,
}: ModalActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-secondary hover:bg-surface-soft hover:text-text-primary"
      >
        {t("common.close")}
      </button>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? t("profile.saving") : saveLabel}
      </button>
    </div>
  );
}