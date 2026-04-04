import Link from "next/link";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

const sampleDecks = [
  { title: "Spanish verbs", terms: 48, color: "from-violet-500/20 to-fuchsia-500/20" },
  { title: "Biology — cell structure", terms: 32, color: "from-sky-500/20 to-cyan-500/20" },
  { title: "World capitals", terms: 120, color: "from-amber-500/20 to-orange-500/20" },
  { title: "JavaScript interview", terms: 64, color: "from-emerald-500/20 to-teal-500/20" },
];

export default function Products() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="container mx-auto px-4 py-10 md:py-14">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Study sets
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Pick a deck and start learning
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              These are placeholder cards — wire them to Convex when your decks table
              is ready.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {sampleDecks.map((deck) => (
              <li key={deck.title}>
                <Link
                  href="#"
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br ${deck.color} p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800`}
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {deck.terms} terms
                  </span>
                  <span className="mt-3 text-lg font-semibold text-zinc-900 group-hover:text-primary dark:text-zinc-50">
                    {deck.title}
                  </span>
                  <span className="mt-4 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                    Study →
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
