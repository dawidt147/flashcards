type LibraryTabsProps = {
  flashcardsLabel: string;
  testsLabel: string;
  foldersLabel: string;
};

export default function LibraryTabs({
  flashcardsLabel,
  testsLabel,
  foldersLabel,
}: LibraryTabsProps) {
  const inactiveClassName =
    "library-tabs__tab rounded-full px-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400";

  return (
    <nav
      className="library-tabs flex flex-wrap gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-700/60"
      aria-label="Library content types"
    >
      <span
        className="library-tabs__tab library-tabs__tab--active rounded-full border border-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-900 dark:border-zinc-100 dark:text-zinc-50"
        aria-current="page"
      >
        {flashcardsLabel}
      </span>
      <span className={inactiveClassName} aria-disabled="true">
        {testsLabel}
      </span>
      <span className={inactiveClassName} aria-disabled="true">
        {foldersLabel}
      </span>
    </nav>
  );
}
