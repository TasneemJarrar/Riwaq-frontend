import { useTranslation } from "react-i18next";
import type { EducationalContentResponse } from "../../../api/profile";

interface ProfileContentProps {
  content: EducationalContentResponse[];
  isLoading: boolean;
  isError: boolean;
}

export default function ProfileContent({
  content,
  isLoading,
  isError,
}: ProfileContentProps) {
  const { t } = useTranslation();

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
      <h2 className="text-lg font-bold text-text-primary">
        {t("profile.content.title")}
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        {t("profile.content.subtitle")}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {content.length > 0 ? (
          content.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-surface-soft p-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                {item.contentType || t("profile.content.fallbackType")}
              </p>
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