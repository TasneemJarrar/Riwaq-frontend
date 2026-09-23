import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GraduationCapIcon,
  Mail01Icon,
  ShieldEllipsisIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";

interface ProfileHeaderProps {
  displayName: string;
  initials: string;
  photoURL: string | null | undefined;
  email: string | null | undefined;
  university: string | null | undefined;
  onEditProfile: () => void;
}

export default function ProfileHeader({
  displayName,
  initials,
  photoURL,
  email,
  university,
  onEditProfile,
}: ProfileHeaderProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative h-32 bg-primary-soft sm:h-40">
        <div className="absolute -start-10 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -end-10 -bottom-24 h-64 w-64 rounded-full bg-success/10 blur-3xl" />
      </div>

      <div className="relative px-5 sm:px-8">
        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-surface-2 bg-surface-soft text-2xl font-extrabold text-primary-text shadow-card sm:h-28 sm:w-28">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                  {displayName || t("profile.unknownUser")}
                </h1>

                <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success-text">
                  <HugeiconsIcon icon={ShieldEllipsisIcon} size={13} />
                  {t("profile.verified")}
                </span>
              </div>

              {email && (
                <div className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
                  <HugeiconsIcon icon={Mail01Icon} size={15} />
                  {email}
                </div>
              )}

              {university && (
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-text-secondary">
                  <HugeiconsIcon icon={GraduationCapIcon} size={15} />
                  {university}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onEditProfile}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-hover"
          >
            <HugeiconsIcon icon={UserIcon} size={16} />
            {t("profile.editProfile")}
          </button>
        </div>
      </div>
    </>
  );
}