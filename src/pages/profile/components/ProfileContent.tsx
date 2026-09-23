import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Delete02Icon, Edit02Icon } from "@hugeicons/core-free-icons";
import type { EducationalContentResponse } from "../../../api/profile";
import { useNavigate } from "react-router-dom";

interface ProfileContentProps {
  content: EducationalContentResponse[];
  isLoading: boolean;
  isError: boolean;
  onAdd: () => void;
  onEdit: (item: EducationalContentResponse) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function ProfileContent({
  content,
  isLoading,
  isError,
  onAdd,
  onEdit,
  onDelete,
  isDeleting,
}: ProfileContentProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <div className="h-6 w-48 animate-pulse rounded bg-surface-soft" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl bg-surface-soft"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
        <p className="text-sm text-error">{t("profile.content.loadError")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-text-primary">
            {t("profile.content.title")}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {t("profile.content.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-cta hover:bg-primary-hover"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          {t("profile.content.add")}
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {content.length > 0 ? (
          content.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/content/${item.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/content/${item.id}`);
              }}
              className="cursor-pointer rounded-xl border border-border bg-surface-soft p-4 transition hover:border-primary/40 hover:bg-surface-2"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                  {item.contentType || t("profile.content.fallbackType")}
                </p>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="rounded-full p-1.5 text-text-secondary transition hover:bg-surface-2 hover:text-text-primary"
                    aria-label={t("profile.content.edit")}
                  >
                    <HugeiconsIcon icon={Edit02Icon} size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    disabled={isDeleting}
                    className="rounded-full p-1.5 text-text-secondary transition hover:bg-error-soft hover:text-error disabled:opacity-50"
                    aria-label={t("profile.content.delete")}
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={15} />
                  </button>
                </div>
              </div>

              <h3 className="mt-2 text-sm font-semibold text-text-primary">
                {item.title || t("profile.content.untitled")}
              </h3>
              {item.description && (
                <p className="mt-2 line-clamp-3 text-sm text-text-secondary">
                  {item.description}
                </p>
              )}
              {item.contentUrl && (
                <a
                  href={item.contentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-xs font-semibold text-primary-text hover:text-primary"
                >
                  {t("profile.content.open")}
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-text-tertiary sm:col-span-2">
            {t("profile.content.empty")}
          </p>
        )}
      </div>
    </div>
  );
}