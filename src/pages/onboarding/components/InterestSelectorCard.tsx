import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  HeartAddIcon,
  SearchIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

import type { InterestResponse } from "../../../api/profile";

interface InterestSelectorCardProps {
  interests: InterestResponse[];
  isLoading?: boolean;
  selectedInterests: InterestResponse[];
  onChange: (interests: InterestResponse[]) => void;
}

export function InterestSelectorCard({
  interests,
  isLoading = false,
  selectedInterests,
  onChange,
}: InterestSelectorCardProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const selectedIds = useMemo(
    () =>
      new Set(
        selectedInterests.map((interest) => interest.id)
      ),
    [selectedInterests]
  );

  const filteredInterests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return interests.filter((interest) => {
      const name = interest.name?.toLowerCase() ?? "";

      const matchesSearch =
        !query || name.includes(query);

      return matchesSearch && !selectedIds.has(interest.id);
    });
  }, [interests, search, selectedIds]);

  const addInterest = (interest: InterestResponse) => {
    if (selectedIds.has(interest.id)) {
      return;
    }

    onChange([...selectedInterests, interest]);
    setSearch("");
  };

  const removeInterest = (interestId: string) => {
    onChange(
      selectedInterests.filter(
        (interest) => interest.id !== interestId
      )
    );
  };

  return (
    <div className="rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gamification-soft text-gamification-text">
            <HugeiconsIcon
              icon={HeartAddIcon}
              size={20}
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-text-primary sm:text-lg">
              {t("onboarding.interests.title", {
                defaultValue: "Your interests",
              })}
            </h2>

            <p className="text-xs text-text-tertiary">
              {selectedInterests.length} selected
            </p>
          </div>
        </div>

        <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-text-secondary">
          {selectedInterests.length}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-text-secondary">
        {t("onboarding.interests.description", {
          defaultValue:
            "Choose the topics you're interested in exploring or learning more about.",
        })}
      </p>

      {/* Selected interests */}
      {selectedInterests.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Selected interests
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <div
                key={interest.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-gamification-soft px-3 py-1.5 text-xs font-semibold text-gamification-text"
              >
                <span>{interest.name}</span>

                <button
                  type="button"
                  onClick={() =>
                    removeInterest(interest.id)
                  }
                  aria-label={`Remove ${interest.name}`}
                  className="rounded-full p-0.5 transition-colors hover:bg-gamification/10"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={12}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mt-5">
        <HugeiconsIcon
          icon={SearchIcon}
          size={16}
          className="absolute start-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search interests..."
          className="w-full rounded-xl border border-input-border bg-input-bg py-2.5 ps-10 pe-4 text-sm text-text-primary outline-none transition-all placeholder:text-text-tertiary focus:border-input-focus focus:ring-2 focus:ring-input-focus-soft"
        />
      </div>

      {/* Available interests */}
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
        Available topics
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {isLoading ? (
          <p className="text-xs text-text-tertiary">
            {t("onboarding.learningMethod.loading")}
          </p>
        ) : filteredInterests.length > 0 ? (
          filteredInterests.map((interest) => (
            <button
              key={interest.id}
              type="button"
              onClick={() => addInterest(interest)}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary-text"
            >
              <HugeiconsIcon icon={Add01Icon} size={12} />
              {interest.name}
            </button>
          ))
        ) : (
          <p className="text-xs text-text-tertiary">
            {search
              ? "No interests found."
              : "All available interests are selected."}
          </p>
        )}
      </div>
    </div>
  );
}