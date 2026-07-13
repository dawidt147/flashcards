import { auth } from "@/root/auth";
import { getLocale, getTranslations } from "next-intl/server";
import { getUserCourses } from "@/lib/convex/courses";
import { getUserByEmail } from "@/lib/convex/users";
import { getFlashcardsByCourseId } from "@/lib/convex/flashcards";
import LibraryPage from "@/components/sections/library/library-page";
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
      title: course.title,
      termCount: flashcards.length,
      author: user.userName,
      href: `/dashboard/flashcards/${course._id}`,
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
    <LibraryPage
      title={t("title")}
      flashcardsTabLabel={t("tabs.flashcards")}
      testsTabLabel={t("tabs.tests")}
      foldersTabLabel={t("tabs.folders")}
      sortRecentLabel={t("sort.recent")}
      sortCreatedLabel={t("sort.created")}
      searchPlaceholder={t("searchPlaceholder")}
      searchLabel={t("searchLabel")}
      emptyLabel={t("empty")}
      groups={groups}
      getTermsLabel={(count) => t("terms", { count })}
    />
  );
}
