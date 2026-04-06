"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="container mx-auto flex flex-col gap-10 px-4 py-12 md:py-16 lg:gap-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Learn faster
            </p>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Flashcards that actually stick
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Create decks, drill terms, and review on any device — the simple way
              to study like you mean it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Browse decks
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-full border-2 border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-primary hover:text-primary dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-primary"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Smart review",
                body: "Focus on what you still need — not what you already know.",
              },
              {
                title: "Your pace",
                body: "Short sessions, clear progress, no clutter.",
              },
              {
                title: "Any topic",
                body: "Languages, exams, trivia — one place for all your sets.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-zinc-200 pt-10 dark:border-zinc-800 sm:flex-row sm:justify-center">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:opacity-90 sm:w-auto md:min-w-[158px]"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt=""
                width={16}
                height={16}
              />
              Deploy
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-zinc-300 px-5 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800 sm:w-auto md:min-w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js docs
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
