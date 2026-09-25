import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Add01Icon,
  SearchIcon,
  GraduationScrollIcon,
} from "@hugeicons/core-free-icons";

export interface Topic {
  id: string;
  name: string | null;
  description: string | null;
}

interface Props {
  title: string;
  description: string;
  items: Topic[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  isLoading?: boolean;
}

export function TopicMultiSelectCard({
  title,
  description,
  items,
  selectedIds,
  onChange,
  isLoading = false,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const name = item.name?.toLowerCase() ?? "";

      const matchesSearch =
        !query || name.includes(query);

      const notSelected =
        !selectedIds.includes(item.id);

      return matchesSearch && notSelected;
    });
  }, [items, search, selectedIds]);

  const selectedItems = items.filter((item) =>
    selectedIds.includes(item.id)
  );

  const addItem = (id: string) => {
    if (selectedIds.includes(id)) return;

    onChange([...selectedIds, id]);
    setSearch("");
  };

  const removeItem = (id: string) => {
    onChange(
      selectedIds.filter(
        (selectedId) => selectedId !== id
      )
    );
  };

  return (
    <div className="rounded-3xl border border-border bg-surface-2 p-6 shadow-card sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-text">
            <HugeiconsIcon
              icon={GraduationScrollIcon}
              size={20}
            />
          </div>

          <h2 className="text-base font-bold text-text-primary sm:text-lg">
            {title}
          </h2>
        </div>

        <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-text-secondary">
          {selectedIds.length}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>

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
          placeholder="Search topics..."
          className="w-full rounded-xl border border-input-border bg-input-bg py-2.5 ps-10 pe-4 text-sm text-text-primary outline-none transition-all placeholder:text-text-tertiary focus:border-input-focus focus:ring-2 focus:ring-input-focus-soft"
        />
      </div>

      {/* Selected */}
      {selectedItems.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Selected
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  removeItem(item.id)
                }
                className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-text transition-colors hover:bg-primary/20"
              >
                {item.name}

                <span className="ms-1.5 opacity-60">
                  ×
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Available */}
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          Available topics
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {isLoading ? (
            <p className="text-xs text-text-tertiary">
              Loading topics...
            </p>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  addItem(item.id)
                }
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary-text"
              >
                <HugeiconsIcon
                  icon={Add01Icon}
                  size={12}
                />

                {item.name}
              </button>
            ))
          ) : (
            <p className="text-xs text-text-tertiary">
              {search
                ? "No matching topics found."
                : "No more topics available."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}