import Link from "next/link";
import { User } from "lucide-react";
import type { LibrarySetItem } from "@/types/interfaces";

type LibrarySetCardProps = {
  item: LibrarySetItem;
  termsLabel: string;
};

export default function LibrarySetCard({
  item,
  termsLabel,
}: LibrarySetCardProps) {
  return (
    <li className="library-set-card">
      <Link
        href={item.href}
        className="library-set-card__link block rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 transition hover:bg-zinc-100 dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50"
      >
        <p className="library-set-card__meta flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{termsLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="library-set-card__author inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {item.author}
          </span>
        </p>
        <h3 className="library-set-card__title mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {item.title}
        </h3>
      </Link>
    </li>
  );
}
