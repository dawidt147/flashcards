import type { LibrarySetGroupData } from "@/types/interfaces";
import LibraryTabs from "./library-tabs";
import LibraryToolbar from "./library-toolbar";
import LibrarySetGroup from "./library-set-group";

type LibraryPageProps = {
  title: string;
  flashcardsTabLabel: string;
  testsTabLabel: string;
  foldersTabLabel: string;
  sortRecentLabel: string;
  sortCreatedLabel: string;
  searchPlaceholder: string;
  searchLabel: string;
  emptyLabel: string;
  groups: Array<LibrarySetGroupData>;
  getTermsLabel: (count: number) => string;
};

export default function LibraryPage({
  title,
  flashcardsTabLabel,
  testsTabLabel,
  foldersTabLabel,
  sortRecentLabel,
  sortCreatedLabel,
  searchPlaceholder,
  searchLabel,
  emptyLabel,
  groups,
  getTermsLabel,
}: LibraryPageProps) {
  return (
    <main className="library-page flex flex-1 flex-col gap-6 py-6">
      <h1 className="library-page__title text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>

      <LibraryTabs
        flashcardsLabel={flashcardsTabLabel}
        testsLabel={testsTabLabel}
        foldersLabel={foldersTabLabel}
      />

      <LibraryToolbar
        sortRecentLabel={sortRecentLabel}
        sortCreatedLabel={sortCreatedLabel}
        searchPlaceholder={searchPlaceholder}
        searchLabel={searchLabel}
      />

      {groups.length > 0 ? (
        <div className="library-page__groups flex flex-col gap-8">
          {groups.map((group) => (
            <LibrarySetGroup
              key={`${group.label}-${group.items[0]?.id ?? "empty"}`}
              group={group}
              getTermsLabel={getTermsLabel}
            />
          ))}
        </div>
      ) : (
        <p className="library-page__empty text-zinc-500 dark:text-zinc-400">
          {emptyLabel}
        </p>
      )}
    </main>
  );
}
