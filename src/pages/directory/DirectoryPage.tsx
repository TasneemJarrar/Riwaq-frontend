import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, FlashIcon } from "@hugeicons/core-free-icons";
import MentorCard from "./components/MentorCard";
import { usePeopleRecommendations } from "../../hooks/useRecommendations";
import { usePointsBalance } from "../../hooks/usePoints";
import {
  connectionsApi,
  type ConnectionRequestResponse,
} from "../../api/connections";
import { connectionKeys } from "../../hooks/useConnections";
import type { PersonRecommendationItem } from "../../api/recommendations";

type FilterKey = "all" | "shared" | "match";

const TOP_N = 20;

export default function DirectoryPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const { data: peopleData, isLoading } = usePeopleRecommendations(TOP_N);
  const { data: balance } = usePointsBalance();

  const { data: sentRequests = [] } = useQuery<ConnectionRequestResponse[]>({
    queryKey: [...connectionKeys.all, "sent"],
    queryFn: connectionsApi.getSent,
    staleTime: 30_000,
  });

  const sentUserIds = useMemo(() => {
    const ids = new Set<string>();
    for (const r of sentRequests) {
      const status = (r.status ?? "Pending").toLowerCase();
      if (
        status === "pending" ||
        status === "requested" ||
        status === "accepted"
      ) {
        const id =
          r.receiver?.userId ?? r.receiverUserId ?? r.sender?.userId ?? "";
        if (id) ids.add(id);
      }
    }
    return ids;
  }, [sentRequests]);

  const sendRequest = useMutation({
    mutationFn: (receiverUserId: string) =>
      connectionsApi.send(receiverUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: connectionKeys.all });
    },
  });

  const recommendations = peopleData?.recommendations ?? [];

  const filtered = useMemo(() => {
    let list: PersonRecommendationItem[] = [...recommendations];

    // Filter
    if (filter === "shared") {
      list = list.filter(
        (item) =>
          (item.sharedSkills?.length ?? 0) > 0 ||
          (item.sharedInterests?.length ?? 0) > 0
      );
    } else if (filter === "match") {
      list = [...list].sort(
        (a, b) => (b.similarityScore ?? 0) - (a.similarityScore ?? 0)
      );
    }

    // Search
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((item) => {
        const name = [item.profile.firstName, item.profile.lastName]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const bio = (item.profile.bio ?? "").toLowerCase();
        const direction = (
          item.profile.learningDirectionName ?? ""
        ).toLowerCase();
        const skills = (item.sharedSkills ?? []).join(" ").toLowerCase();
        const interests = (item.sharedInterests ?? []).join(" ").toLowerCase();
        return (
          name.includes(q) ||
          bio.includes(q) ||
          direction.includes(q) ||
          skills.includes(q) ||
          interests.includes(q)
        );
      });
    }

    return list;
  }, [recommendations, filter, search]);

  const filters: { key: FilterKey; label: string }[] = [
    {
      key: "all",
      label: t("discover.filters.all", {
        defaultValue: "All Mentors",
      }),
    },
    {
      key: "shared",
      label: t("discover.filters.shared", {
        defaultValue: "Looking for My Skills",
      }),
    },
    {
      key: "match",
      label: t("discover.filters.match", {
        defaultValue: "Best AI Match",
      }),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-text">
            {t("discover.badge", {
              defaultValue: "AI Skill Match Engine",
            })}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
            {t("discover.title", {
              defaultValue: "Peer Directory & Mutual Exchange",
            })}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
            {t("discover.subtitle", {
              defaultValue:
                "Algorithmic bi-directional match matrix. Pair with peers seeking the capabilities you teach.",
            })}
          </p>
        </div>

        {/* Quota / points */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <div className="rounded-2xl border border-border bg-surface-2 px-4 py-2.5 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">
              {t("discover.balance", { defaultValue: "Points balance" })}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-sm font-bold text-gamification-text">
              <HugeiconsIcon icon={FlashIcon} size={14} />
              {balance?.points ?? "—"}{" "}
              {t("profile.points", { defaultValue: "Points" })}
            </p>
          </div>
          <Link
            to="/points"
            className="rounded-full bg-gamification px-4 py-2.5 text-sm font-semibold text-white shadow-cta transition hover:opacity-90"
          >
            {t("discover.refill", { defaultValue: "Refill Quota" })}
          </Link>
        </div>
      </div>

      {/* Search + filters */}
      <div className="mt-6 rounded-3xl border border-border bg-surface-2 p-4 shadow-card sm:p-5">
        <div className="relative">
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("discover.searchPlaceholder", {
              defaultValue:
                "Search by skill (e.g. Python, Figma) or mentor name...",
            })}
            className="w-full rounded-xl border border-input-border bg-input-bg py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-input-focus focus:ring-4 focus:ring-input-focus-soft"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === f.key
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border bg-surface-soft text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              {f.label}
              {f.key === "all" && recommendations.length > 0 && (
                <span className="ml-1.5 opacity-80">
                  {recommendations.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-3xl bg-surface-2"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface-2 p-12 text-center text-sm text-text-secondary">
            {t("discover.empty", {
              defaultValue: "No mentors found. Try another search or filter.",
            })}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((item) => (
              <MentorCard
                key={item.profile.userId}
                item={item}
                isRequesting={sendRequest.isPending}
                alreadySent={sentUserIds.has(item.profile.userId)}
                onRequest={(userId) => sendRequest.mutate(userId)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer note */}
      <p className="mt-8 text-center text-xs text-text-tertiary">
        {t("discover.footer", {
          defaultValue:
            "Peer reciprocity: connect to teach and learn — no cash transactions.",
        })}
      </p>
    </div>
  );
}