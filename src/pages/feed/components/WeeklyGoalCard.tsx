import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMyLearningSessions } from "../../../hooks/useProfile";

const WEEKLY_TARGET = 3;
const REWARD_POINTS = 150;

function startOfWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - diff);
  return date;
}

function endOfWeek(d: Date) {
  const start = startOfWeek(d);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return end;
}

function formatResetsIn(end: Date) {
  const ms = end.getTime() - Date.now();
  if (ms <= 0) return "0h";
  const totalHours = Math.floor(ms / 3_600_000);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
}

function isCompletedStatus(status: string | null) {
  if (!status) return false;
  const s = status.toLowerCase();
  return (
    s === "completed" ||
    s === "done" ||
    s === "finished" ||
    s === "complete"
  );
}

export default function WeeklyGoalCard() {
  const { t } = useTranslation();
  const { data: sessions = [], isLoading } = useMyLearningSessions();

  const { completed, remaining, percent, resetsLabel, goalReached } =
    useMemo(() => {
      const now = new Date();
      const weekStart = startOfWeek(now);
      const weekEnd = endOfWeek(now);

      const thisWeek = sessions.filter((s) => {
        const when = new Date(s.scheduledAt || s.createdAt || s.updatedAt);
        return when >= weekStart && when < weekEnd;
      });

      const withStatus = thisWeek.filter((s) => s.status != null);
      const completedCount =
        withStatus.length > 0
          ? withStatus.filter((s) => isCompletedStatus(s.status)).length
          : thisWeek.length;

      const clamped = Math.min(completedCount, WEEKLY_TARGET);
      const remainingCount = Math.max(0, WEEKLY_TARGET - clamped);

      return {
        completed: clamped,
        remaining: remainingCount,
        percent: Math.round((clamped / WEEKLY_TARGET) * 100),
        resetsLabel: formatResetsIn(weekEnd),
        goalReached: clamped >= WEEKLY_TARGET,
      };
    }, [sessions]);

  const size = 56;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="rounded-3xl border border-border bg-surface-2 p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          {t("feed.sidebar.weeklyGoal")}
        </h3>
        <span className="text-[11px] text-text-tertiary">
          {t("feed.sidebar.resetsInPrefix", {
            defaultValue: "Resets in {{time}}",
            time: resetsLabel,
          })}
        </span>
      </div>

      {isLoading ? (
        <div className="h-16 animate-pulse rounded-xl bg-surface-soft" />
      ) : (
        <div className="flex items-center gap-4">
          <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={stroke}
                className="text-border"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="text-primary transition-[stroke-dashoffset] duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-primary">
              {completed}/{WEEKLY_TARGET}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            {goalReached ? (
              <>
                <p className="text-sm font-semibold text-success-text">
                  {t("feed.sidebar.goalComplete", {
                    defaultValue: "Weekly goal complete!",
                  })}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-text-secondary">
                  {t("feed.sidebar.goalCompleteDesc", {
                    defaultValue:
                      "You hit {{target}} sessions this week. +{{points}} points unlocked.",
                    target: WEEKLY_TARGET,
                    points: REWARD_POINTS,
                  })}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-text-primary">
                  {remaining === 1
                    ? t("feed.sidebar.sessionAway")
                    : t("feed.sidebar.sessionsAway", {
                        defaultValue: "{{count}} sessions away",
                        count: remaining,
                      })}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-text-secondary">
                  {t("feed.sidebar.sessionAwayDesc", {
                    defaultValue:
                      "Complete your third 1-on-1 swap session to unlock +{{points}} platform points.",
                    points: REWARD_POINTS,
                  })}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}