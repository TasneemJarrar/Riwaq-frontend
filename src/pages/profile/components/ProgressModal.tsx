import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ModalHeader from "./ModalHeader";
import ModalActions from "./ModalActions";

export interface ProgressFormState {
  learningDirectionId: string;
  level: string;
  startedAt: string; 
}

interface SkillOption {
  id: string;
  name: string | null;
}

interface ProgressModalProps {
  mode: "create" | "edit";
  form: ProgressFormState;
  setForm: React.Dispatch<React.SetStateAction<ProgressFormState>>;
  skills: SkillOption[];
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function ProgressModal({
  mode,
  form,
  setForm,
  skills,
  isSaving,
  onClose,
  onSubmit,
}: ProgressModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <ModalHeader
          eyebrow={t("profile.progress.title")}
          title={
            mode === "create"
              ? t("profile.progress.addTitle", {
                  defaultValue: "Add progress",
                })
              : t("profile.progress.editTitle", {
                  defaultValue: "Edit progress",
                })
          }
          onClose={onClose}
        />

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === "create" && (
            <label className="block">
              <span className="text-xs font-semibold text-text-secondary">
                {t("profile.learningDirection")}
              </span>
              <select
                required
                value={form.learningDirectionId}
                onChange={(e) =>
                  setForm((c) => ({
                    ...c,
                    learningDirectionId: e.target.value,
                  }))
                }
                className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
              >
                <option value="">
                  {t("profile.selectLearningDirection", {
                    defaultValue: "Select topic…",
                  })}
                </option>
                {skills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.progress.level", { defaultValue: "Level" })}
            </span>
            <select
              value={form.level}
              onChange={(e) =>
                setForm((c) => ({ ...c, level: e.target.value }))
              }
              className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            >
              <option value="">
                {t("profile.progress.inProgress")}
              </option>
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.progress.startedAt", {
                defaultValue: "Started on",
              })}
            </span>
            <input
              type="date"
              required={mode === "create"}
              value={form.startedAt}
              onChange={(e) =>
                setForm((c) => ({ ...c, startedAt: e.target.value }))
              }
              className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
          </label>

          <ModalActions
            onCancel={onClose}
            loading={isSaving}
            saveLabel={
              mode === "create"
                ? t("profile.progress.add", { defaultValue: "Add" })
                : t("profile.saveChanges")
            }
          />
        </form>
      </div>
    </div>
  );
}