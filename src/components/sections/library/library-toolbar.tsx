import { Search } from "lucide-react";

type LibraryToolbarProps = {
  sortRecentLabel: string;
  sortCreatedLabel: string;
  searchPlaceholder: string;
  searchLabel: string;
};

export default function LibraryToolbar({
  sortRecentLabel,
  sortCreatedLabel,
  searchPlaceholder,
  searchLabel,
}: LibraryToolbarProps) {
  return (
    <div className="library-toolbar flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="library-toolbar__sort inline-flex items-center">
        <span className="sr-only">Sort by</span>
        <select
          className="library-toolbar__sort-select rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700/60 dark:text-zinc-200"
          defaultValue="recent"
          disabled
          aria-disabled="true"
        >
          <option value="recent">{sortRecentLabel}</option>
          <option value="created">{sortCreatedLabel}</option>
        </select>
      </label>

      <form action="" className="library-toolbar__search relative w-full sm:max-w-xs">
        <label className="sr-only" htmlFor="library-search">
          {searchLabel}
        </label>
        <input
          id="library-search"
          name="library-search"
          type="search"
          readOnly
          placeholder={searchPlaceholder}
          className="library-toolbar__search-input w-full rounded-lg border border-zinc-200 bg-transparent py-2 pl-4 pr-10 text-sm text-zinc-700 placeholder:text-zinc-400 dark:border-zinc-700/60 dark:text-zinc-200"
        />
        <Search
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        />
      </form>
    </div>
  );
}
