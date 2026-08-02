import { auth } from "@/root/auth";
import { getLocale, getTranslations } from "next-intl/server";
import { getUserCourses } from "@/lib/convex/courses";
import { getUserByEmail } from "@/lib/convex/users";
import { getFlashcardsByCourseId } from "@/lib/convex/flashcards";
import LibraryTabs from "@/components/sections/library/library-tabs";
import LibraryToolbar from "@/components/sections/library/library-toolbar";
import LibrarySetGroup from "@/components/sections/library/library-set-group";
import {
  formatMonthYearLabel,
  groupLibrarySets,
} from "@/lib/library/group-courses";
import type { LibrarySetItem } from "@/types/interfaces";

async function getLibrarySets(): Promise<Array<LibrarySetItem>> {
  const session = await auth();
  const userEmail = session?.user?.email ?? "";
  const user = await getUserByEmail(userEmail);

  if (!user?._id) {
    return [];
  }

  const courses = (await getUserCourses(user._id)) ?? [];
  const flashcardCourses = courses.filter(
    (course) => course?.type === "flashcards"
  );

  const items: Array<LibrarySetItem> = [];

  for (const course of flashcardCourses) {
    if (!course) {
      continue;
    }

    const flashcards = await getFlashcardsByCourseId(course._id);

    items.push({
      id: course._id,
      key: course.key,
      title: course.title,
      termCount: flashcards.length,
      author: user.userName,
      href: `/dashboard/flashcards/${course.key}/${course.slug}`,
      creationTime: course._creationTime,
    });
  }

  return items;
}

export default async function LibraryDashboardPage() {
  const t = await getTranslations("LibraryPage");
  const locale = await getLocale();
  const items = await getLibrarySets();

  const groups = groupLibrarySets(items, (key) => {
    if (key.kind === "minutesAgo") {
      return t("dateGroups.minutesAgo");
    }

    if (key.kind === "today") {
      return t("dateGroups.today");
    }

    if (key.kind === "thisWeek") {
      return t("dateGroups.thisWeek");
    }

    const monthYear = formatMonthYearLabel(key.month, key.year, locale);

    return t("dateGroups.monthYear", { date: monthYear });
  });

  return (
    <main className="library-page flex flex-1 flex-col gap-6 py-6">
      <h1 className="library-page__title text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {t("title")}
      </h1>

      <LibraryTabs
        flashcardsLabel={t("tabs.flashcards")}
        testsLabel={t("tabs.tests")}
        foldersLabel={t("tabs.folders")}
      />

      <LibraryToolbar
        sortRecentLabel={t("sort.recent")}
        sortCreatedLabel={t("sort.created")}
        searchPlaceholder={t("searchPlaceholder")}
        searchLabel={t("searchLabel")}
      />

      {groups.length > 0 ? (
        <div className="library-page__groups flex flex-col gap-8">
          {groups.map((group) => (
            <LibrarySetGroup
              key={`${group.label}-${group.items[0]?.id ?? "empty"}`}
              group={group}
              getTermsLabel={(count) => t("terms", { count })}
            />
          ))}
        </div>
      ) : (
        <p className="library-page__empty text-zinc-500 dark:text-zinc-400">
          {t("empty")}
        </p>
      )}
    </main>
  );
}
