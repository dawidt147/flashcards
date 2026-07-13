import type { LibrarySetGroupData } from "@/types/interfaces";
import LibrarySetCard from "./library-set-card";

type LibrarySetGroupProps = {
  group: LibrarySetGroupData;
  getTermsLabel: (count: number) => string;
};

export default function LibrarySetGroup({
  group,
  getTermsLabel,
}: LibrarySetGroupProps) {
  return (
    <section className="library-set-group">
      <h2 className="library-set-group__heading mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {group.label}
      </h2>
      <ul className="library-set-group__list m-0 flex list-none flex-col gap-3 p-0">
        {group.items.map((item) => (
          <LibrarySetCard
            key={item.id}
            item={item}
            termsLabel={getTermsLabel(item.termCount)}
          />
        ))}
      </ul>
    </section>
  );
}
