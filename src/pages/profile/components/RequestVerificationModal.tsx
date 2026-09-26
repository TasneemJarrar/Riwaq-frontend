import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useSkills } from "../../../hooks/useLearningDirections";
import { useCreateSkillVerificationRequest } from "../../../hooks/useSkillVerification";

interface RequestVerificationModalProps {
  mentorUserId: string;
  mentorName: string;
  onClose: () => void;
}

export default function RequestVerificationModal({
  mentorUserId,
  mentorName,
  onClose,
}: RequestVerificationModalProps) {
  const { t } = useTranslation();
  const { data: skills = [], isLoading } = useSkills();
  const createRequest = useCreateSkillVerificationRequest();

  const [selectedSkillId, setSelectedSkillId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedSkillId) return;

    setError(null);

    try {
      await createRequest.mutateAsync({
        mentorUserId,
        skillId: selectedSkillId,
      });
      onClose();
    } catch (err) {
      console.error(err);
      setError(
        t("profile.verification.requestFailed", {
          defaultValue: "Could not send verification request. Try again.",
        })
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-text">
              {t("profile.verification.label", {
                defaultValue: "Skill verification",
              })}
            </p>
            <h2 className="mt-1 text-lg font-extrabold text-text-primary">
              {t("profile.verification.requestTitle", {
                defaultValue: "Request verification",
              })}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {t("profile.verification.requestSubtitle", {
                name: mentorName,
                defaultValue: `Ask ${mentorName} to verify one of your skills.`,
              })}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-text-tertiary hover:bg-surface-soft hover:text-text-primary"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-tertiary">
              {t("profile.verification.selectSkill", {
                defaultValue: "Skill to verify",
              })}
            </label>

            <select
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(e.target.value)}
              disabled={isLoading || createRequest.isPending}
              className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft disabled:opacity-60"
            >
              <option value="">
                {isLoading
                  ? t("auth.placeholders.loadingLearningDirections")
                  : t("profile.verification.chooseSkill", {
                      defaultValue: "Choose a skill…",
                    })}
              </option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-sm text-error">{error}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm font-semibold text-text-secondary hover:text-text-primary"
            >
              {t("common.cancel", { defaultValue: "Cancel" })}
            </button>

            <button
              type="submit"
              disabled={!selectedSkillId || createRequest.isPending}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createRequest.isPending
                ? t("profile.saving", { defaultValue: "Saving…" })
                : t("profile.verification.sendRequest", {
                    defaultValue: "Send request",
                  })}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}