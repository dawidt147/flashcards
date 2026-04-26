import { useTranslations } from "next-intl";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function AboutUs() {
  const t = useTranslations("AboutPage");

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="container mx-auto px-4 py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              {t("headline")}
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {t("description")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t("whyFlashcards.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("whyFlashcards.body")}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t("whatsNext.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("whatsNext.body")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
