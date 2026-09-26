import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShieldEllipsisIcon } from "@hugeicons/core-free-icons";
import {
  useReceivedSkillVerificationRequests,
  useSentSkillVerificationRequests,
  useUpdateSkillVerificationRequest,
} from "../../../hooks/useSkillVerification";

function displayName(user: {
  firstName?: string | null;
  lastName?: string | null;
}): string {
  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    "Someone"
  );
}

function statusClass(status: string | null | undefined): string {
  const s = (status ?? "").toLowerCase();
  if (s === "approved") return "bg-success-soft text-success-text";
  if (s === "rejected") return "bg-error-soft text-error";
  if (s === "cancelled") return "bg-surface-2 text-text-tertiary";
  return "bg-primary-soft text-primary-text";
}

export default function SkillVerificationSection() {
  const { t } = useTranslation();

  const {
    data: received = [],
    isLoading: receivedLoading,
  } = useReceivedSkillVerificationRequests();

  const {
    data: sent = [],
    isLoading: sentLoading,
  } = useSentSkillVerificationRequests();

  const updateRequest = useUpdateSkillVerificationRequest();

  const pendingReceived = received.filter((r) => {
    const s = (r.status ?? "Pending").toLowerCase();
    return s === "pending" || s === "" || s === "open";
  });

  const handleUpdate = (
    id: string,
    status: "Approved" | "Rejected" | "Cancelled"
  ) => {
    updateRequest.mutate({ id, payload: { status } });
  };

  return (
    <section className="mt-6 rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
          <HugeiconsIcon icon={ShieldEllipsisIcon} size={20} />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-text-primary">
            {t("profile.verification.title", {
              defaultValue: "Skill verification",
            })}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {t("profile.verification.subtitle", {
              defaultValue:
                "Requests you received as a mentor, and requests you sent.",
            })}
          </p>
        </div>
      </div>

      {/* Received */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-text-primary">
          {t("profile.verification.received", {
            defaultValue: "Received",
          })}
        </h3>

        {receivedLoading ? (
          <div className="mt-3 h-16 animate-pulse rounded-xl bg-surface-soft" />
        ) : pendingReceived.length === 0 ? (
          <p className="mt-3 text-sm text-text-tertiary">
            {t("profile.verification.noReceived", {
              defaultValue: "No pending verification requests.",
            })}
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {pendingReceived.map((req) => (
              <div
                key={req.id}
                className="rounded-2xl border border-border bg-surface-soft p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-text-primary">
                    {displayName(req.requester)} ·{" "}
                    {req.skill?.name ?? "Skill"}
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusClass(req.status)}`}
                  >
                    {req.status ?? "Pending"}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={updateRequest.isPending}
                    onClick={() => handleUpdate(req.id, "Approved")}
                    className="rounded-full bg-success px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
                  >
                    {t("profile.verification.approve", {
                      defaultValue: "Approve",
                    })}
                  </button>
                  <button
                    type="button"
                    disabled={updateRequest.isPending}
                    onClick={() => handleUpdate(req.id, "Rejected")}
                    className="rounded-full border border-error px-4 py-1.5 text-xs font-semibold text-error hover:bg-error/5 disabled:opacity-50"
                  >
                    {t("profile.verification.reject", {
                      defaultValue: "Reject",
                    })}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sent */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-text-primary">
          {t("profile.verification.sent", {
            defaultValue: "Sent",
          })}
        </h3>

        {sentLoading ? (
          <div className="mt-3 h-16 animate-pulse rounded-xl bg-surface-soft" />
        ) : sent.length === 0 ? (
          <p className="mt-3 text-sm text-text-tertiary">
            {t("profile.verification.noSent", {
              defaultValue: "You haven't requested any verifications yet.",
            })}
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {sent.map((req) => {
              const s = (req.status ?? "Pending").toLowerCase();
              const canCancel =
                s === "pending" || s === "" || s === "open";

              return (
                <div
                  key={req.id}
                  className="rounded-2xl border border-border bg-surface-soft p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">
                      {req.skill?.name ?? "Skill"} →{" "}
                      {displayName(req.mentor)}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusClass(req.status)}`}
                    >
                      {req.status ?? "Pending"}
                    </span>
                  </div>

                  {req.note && (
                    <p className="mt-2 text-xs text-text-secondary">
                      {req.note}
                    </p>
                  )}

                  {canCancel && (
                    <button
                      type="button"
                      disabled={updateRequest.isPending}
                      onClick={() => handleUpdate(req.id, "Cancelled")}
                      className="mt-3 text-xs font-semibold text-text-tertiary hover:text-error disabled:opacity-50"
                    >
                      {t("profile.verification.cancel", {
                        defaultValue: "Cancel request",
                      })}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}