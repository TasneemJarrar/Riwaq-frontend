import type { Dispatch, FormEvent, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import ModalHeader from "./ModalHeader";
import InputField from "./InputField";
import ModalActions from "./ModalActions";

export interface ContentFormState {
  title: string;
  description: string;
  contentType: string;
  contentUrl: string;
}

const CONTENT_TYPES = [
  "Text",
  "Image",
  "Video",
  "File",
  "ExternalLink",
] as const;

interface ContentModalProps {
  mode: "create" | "edit";
  form: ContentFormState;
  setForm: Dispatch<SetStateAction<ContentFormState>>;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

export default function ContentModal({
  mode,
  form,
  setForm,
  isSaving,
  onClose,
  onSubmit,
}: ContentModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <ModalHeader
          eyebrow={t("profile.content.title")}
          title={
            mode === "create"
              ? t("profile.content.addTitle")
              : t("profile.content.editTitle")
          }
          onClose={onClose}
        />

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <InputField
            label={t("profile.content.form.title")}
            value={form.title}
            onChange={(value) =>
              setForm((current) => ({ ...current, title: value }))
            }
          />

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.content.form.contentType")}
            </span>
            <select
              value={form.contentType}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  contentType: event.target.value,
                }))
              }
              required
              className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-3 text-sm text-text-primary outline-none transition focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            >
              <option value="" disabled>
                {t("profile.content.form.contentTypePlaceholder")}
              </option>
              {CONTENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`profile.content.types.${type}`, { defaultValue: type })}
                </option>
              ))}
            </select>
          </label>

          <InputField
            label={t("profile.content.form.contentUrl")}
            value={form.contentUrl}
            onChange={(value) =>
              setForm((current) => ({ ...current, contentUrl: value }))
            }
          />

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.content.form.description")}
            </span>
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              rows={4}
              className="mt-1.5 w-full resize-none rounded-xl border border-input-border bg-input-bg px-3.5 py-3 text-sm text-text-primary outline-none transition focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
          </label>

          <ModalActions
            onCancel={onClose}
            loading={isSaving}
            saveLabel={
              mode === "create"
                ? t("profile.content.add")
                : t("profile.saveChanges")
            }
          />
        </form>
      </div>
    </div>
  );
}