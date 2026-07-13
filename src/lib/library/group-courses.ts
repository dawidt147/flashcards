import type { LibrarySetGroupData, LibrarySetItem } from "@/types/interfaces";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const WEEK_MS = 7 * DAY_MS;

type DateGroupKey =
  | { kind: "minutesAgo" }
  | { kind: "today" }
  | { kind: "thisWeek" }
  | { kind: "monthYear"; month: number; year: number };

function getDateGroupKey(creationTime: number): DateGroupKey {
  const now = Date.now();
  const diff = now - creationTime;

  if (diff < HOUR_MS) {
    return { kind: "minutesAgo" };
  }

  const created = new Date(creationTime);
  const nowDate = new Date(now);

  if (created.toDateString() === nowDate.toDateString()) {
    return { kind: "today" };
  }

  if (diff < WEEK_MS) {
    return { kind: "thisWeek" };
  }

  return {
    kind: "monthYear",
    month: created.getMonth(),
    year: created.getFullYear(),
  };
}

function groupKeyToId(key: DateGroupKey): string {
  if (key.kind === "monthYear") {
    return `monthYear:${key.year}-${key.month}`;
  }

  return key.kind;
}

function getGroupSortOrder(key: DateGroupKey): number {
  if (key.kind === "minutesAgo") return 0;
  if (key.kind === "today") return 1;
  if (key.kind === "thisWeek") return 2;

  return 3 + (9999 - key.year) * 12 + (12 - key.month);
}

type GroupLabelResolver = (key: DateGroupKey) => string;

export function groupLibrarySets(
  items: Array<LibrarySetItem>,
  resolveLabel: GroupLabelResolver
): Array<LibrarySetGroupData> {
  const sortedItems = [...items].sort(
    (left, right) => right.creationTime - left.creationTime
  );
  const groups = new Map<
    string,
    { key: DateGroupKey; items: Array<LibrarySetItem> }
  >();

  for (const item of sortedItems) {
    const key = getDateGroupKey(item.creationTime);
    const id = groupKeyToId(key);
    const existing = groups.get(id);

    if (existing) {
      existing.items.push(item);
      continue;
    }

    groups.set(id, { key, items: [item] });
  }

  return [...groups.values()]
    .sort(
      (left, right) =>
        getGroupSortOrder(left.key) - getGroupSortOrder(right.key)
    )
    .map((group) => ({
      label: resolveLabel(group.key),
      items: group.items,
    }));
}

export function formatMonthYearLabel(
  month: number,
  year: number,
  locale: string
): string {
  const formatted = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));

  return formatted;
}
