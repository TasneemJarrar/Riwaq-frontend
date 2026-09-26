import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ModalHeader from "./ModalHeader";
import ModalActions from "./ModalActions";
import type { ConnectionResponse } from "../../../api/connections";

export interface SessionFormState {
  connectionId: string;
  title: string;
  description: string;
  scheduledAt: string;
  meetingUrl: string;
  status: string;
}

interface SessionModalProps {
  mode: "create" | "edit";
  form: SessionFormState;
  setForm: React.Dispatch<React.SetStateAction<SessionFormState>>;
  connections: ConnectionResponse[];
  myUserId?: string | null;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

function peerName(
  connection: ConnectionResponse,
  myUserId?: string | null
): string {
  const peer =
    connection.userAId === myUserId ? connection.userB : connection.userA;
  const name = [peer?.firstName, peer?.lastName].filter(Boolean).join(" ");
  return name || "Peer";
}

export default function SessionModal({
  mode,
  form,
  setForm,
  connections,
  myUserId,
  isSaving,
  onClose,
  onSubmit,
}: SessionModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
        <ModalHeader
          eyebrow={t("profile.sessions.title")}
          title={
            mode === "create"
              ? t("profile.sessions.scheduleTitle", {
                  defaultValue: "Schedule session",
                })
              : t("profile.sessions.editTitle", {
                  defaultValue: "Edit session",
                })
          }
          onClose={onClose}
        />

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === "create" && (
            <label className="block">
              <span className="text-xs font-semibold text-text-secondary">
                {t("profile.sessions.form.connection", {
                  defaultValue: "Connection",
                })}
              </span>
              <select
                required
                value={form.connectionId}
                onChange={(e) =>
                  setForm((c) => ({ ...c, connectionId: e.target.value }))
                }
                className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
              >
                <option value="">
                  {t("profile.sessions.form.selectConnection", {
                    defaultValue: "Select a peer…",
                  })}
                </option>
                {connections.map((conn) => (
                  <option key={conn.id} value={conn.id}>
                    {peerName(conn, myUserId)}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.sessions.form.title", { defaultValue: "Title" })}
            </span>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((c) => ({ ...c, title: e.target.value }))
              }
              className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.sessions.form.description", {
                defaultValue: "Description",
              })}
            </span>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((c) => ({ ...c, description: e.target.value }))
              }
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-input-border bg-input-bg px-3.5 py-3 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.sessions.form.scheduledAt", {
                defaultValue: "Date & time",
              })}
            </span>
            <input
              type="datetime-local"
              required={mode === "create"}
              value={form.scheduledAt}
              onChange={(e) =>
                setForm((c) => ({ ...c, scheduledAt: e.target.value }))
              }
              className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-text-secondary">
              {t("profile.sessions.form.meetingUrl", {
                defaultValue: "Meeting URL",
              })}
            </span>
            <input
              type="url"
              value={form.meetingUrl}
              onChange={(e) =>
                setForm((c) => ({ ...c, meetingUrl: e.target.value }))
              }
              placeholder="https://"
              className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
            />
          </label>

          {mode === "edit" && (
            <label className="block">
              <span className="text-xs font-semibold text-text-secondary">
                {t("profile.sessions.form.status", {
                  defaultValue: "Status",
                })}
              </span>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((c) => ({ ...c, status: e.target.value }))
                }
                className="mt-1.5 w-full rounded-xl border border-input-border bg-input-bg px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="InProgress">In progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
          )}

          <ModalActions
            onCancel={onClose}
            loading={isSaving}
            saveLabel={
              mode === "create"
                ? t("profile.sessions.schedule", {
                    defaultValue: "Schedule",
                  })
                : t("profile.saveChanges")
            }
          />
        </form>
      </div>
    </div>
  );
}