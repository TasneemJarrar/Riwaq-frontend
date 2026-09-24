import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCreateEducationalContent } from "../../../hooks/useProfile";
import { useAuthStore } from "../../../store/useAuthStore";
import type { ContentFormState } from "../../profile/components/ContentModal";
import ContentModal from "../../profile/components/ContentModal";


const emptyForm: ContentFormState = {
  title: "",
  description: "",
  contentType: "",
  contentUrl: "",
};

export default function FeedComposer() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const createPost = useCreateEducationalContent();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ContentFormState>(emptyForm);

  const openModal = () => {
    setForm(emptyForm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setForm(emptyForm);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.contentType) return;

    await createPost.mutateAsync({
      title: form.title.trim() || null,
      description: form.description.trim() || null,
      contentType: form.contentType || null,
      contentUrl: form.contentUrl.trim() || null,
    });

    closeModal();
  };

  return (
    <>
      {/* clickable bar */}
      <div className="rounded-3xl border border-border bg-surface-2 p-3 shadow-card sm:p-4">
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary-text transition hover:ring-2 hover:ring-primary/40"
            aria-label={t("profile.editProfile")}
            onClick={(e) => e.stopPropagation()}
          >
            {user?.displayName?.[0]?.toUpperCase() ?? "U"}
          </Link>

          <button
            type="button"
            onClick={openModal}
            className="flex-1 rounded-full border border-border bg-surface-soft px-4 py-2.5 text-left text-sm text-text-tertiary transition hover:border-primary/40 hover:text-text-secondary"
          >
            {t("feed.composer.placeholder")}
          </button>

          <button
            type="button"
            onClick={openModal}
            className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-cta transition hover:bg-primary-hover"
          >
            {t("feed.composer.publish")}
          </button>
        </div>
      </div>

      {/* add content modal */}
      {isOpen && (
        <ContentModal
          mode="create"
          form={form}
          setForm={setForm}
          isSaving={createPost.isPending}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}