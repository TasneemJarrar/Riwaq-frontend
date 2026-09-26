import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ModalHeader from "./ModalHeader";
import ModalActions from "./ModalActions";

interface RateSessionModalProps {
  sessionTitle: string;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (payload: { score: number; review: string | null }) => void;
}

export default function RateSessionModal({
  sessionTitle,
  isSaving,
  onClose,
  onSubmit,
}: RateSessionModalProps) {
  const { t } = useTranslation();
  const [score, setScore] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      score,
      review: review.trim() || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <ModalHeader
          eyebrow={t("profile.sessions.title")}
          title={t("profile.sessions.rateTitle", {
            defaultValue: "Rate session",
          })}
          onClose={onClose}
        />

        <p className="mt-2 text-sm text-text-secondary">{sessionTitle}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.sessions.form.score", { defaultValue: "Score" })}
            </span>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setScore(n)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${
                    score >= n
                      ? "bg-gamification text-white"
                      : "border border-border bg-surface-soft text-text-tertiary"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.sessions.form.review", {
                defaultValue: "Review (optional)",
              })}
            </span>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-input-border bg-input-bg px-3.5 py-3 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
          </label>

          <ModalActions
            onCancel={onClose}
            loading={isSaving}
            saveLabel={t("profile.sessions.submitRating", {
              defaultValue: "Submit rating",
            })}
          />
        </form>
      </div>
    </div>
  );
}