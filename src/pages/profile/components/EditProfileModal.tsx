import type { Dispatch, FormEvent, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import ModalHeader from "./ModalHeader";
import InputField from "./InputField";
import ModalActions from "./ModalActions";
import type { ProfileFormState } from "../ProfilePage";

interface EditProfileModalProps {
  form: ProfileFormState;
  setForm: Dispatch<SetStateAction<ProfileFormState>>;
  isUpdating: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

export default function EditProfileModal({
  form,
  setForm,
  isUpdating,
  onClose,
  onSubmit,
}: EditProfileModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <ModalHeader
          eyebrow={t("profile.editLabel")}
          title={t("profile.editProfile")}
          onClose={onClose}
        />

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label={t("profile.form.firstName")}
              value={form.firstName}
              onChange={(value) =>
                setForm((current) => ({ ...current, firstName: value }))
              }
            />
            <InputField
              label={t("profile.form.lastName")}
              value={form.lastName}
              onChange={(value) =>
                setForm((current) => ({ ...current, lastName: value }))
              }
            />
          </div>

          <InputField
            label={t("profile.form.university")}
            value={form.university}
            onChange={(value) =>
              setForm((current) => ({ ...current, university: value }))
            }
          />

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.form.bio")}
            </span>
            <textarea
              value={form.bio}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  bio: event.target.value,
                }))
              }
              rows={5}
              className="mt-1.5 w-full resize-none rounded-xl border border-input-border bg-input-bg px-3.5 py-3 text-sm text-text-primary outline-none transition focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
          </label>

          <ModalActions
            onCancel={onClose}
            loading={isUpdating}
            saveLabel={t("profile.saveChanges")}
          />
        </form>
      </div>
    </div>
  );
}