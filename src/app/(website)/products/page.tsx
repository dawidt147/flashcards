import Link from "next/link";
import { useTranslations } from "next-intl";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

const sampleDecks = [
  { titleKey: "spanishVerbs", terms: 48, color: "from-violet-500/20 to-fuchsia-500/20" },
  { titleKey: "biologyCellStructure", terms: 32, color: "from-sky-500/20 to-cyan-500/20" },
  { titleKey: "worldCapitals", terms: 120, color: "from-amber-500/20 to-orange-500/20" },
  { titleKey: "javascriptInterview", terms: 64, color: "from-emerald-500/20 to-teal-500/20" },
];

export default function Products() {
  const t = useTranslations("ProductsPage");

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="container mx-auto px-4 py-10 md:py-14">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              {t("headline")}
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              {t("description")}
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {sampleDecks.map((deck) => (
              <li key={deck.titleKey}>
                <Link
                  href="#"
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br ${deck.color} p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800`}
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {t("terms", { count: deck.terms })}
                  </span>
                  <span className="mt-3 text-lg font-semibold text-zinc-900 group-hover:text-primary dark:text-zinc-50">
                    {t(`decks.${deck.titleKey}`)}
                  </span>
                  <span className="mt-4 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                    {t("study")} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
