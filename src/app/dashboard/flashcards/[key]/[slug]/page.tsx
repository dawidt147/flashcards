import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getCourseByKey } from "@/lib/convex/courses";
import { getFlashcardsByCourseKey } from "@/lib/convex/flashcards";
import type { Flashcard } from "@/types/interfaces";
import FlashcardsSlider from "@/components/sections/course/flashcards/flashcards-slider";
import Button from "@/components/buttons/button";
import { Ellipsis } from "lucide-react";

type ViewSetPageProps = {
  params: Promise<{
    key: string;
    slug: string;
  }>;
};

async function getFlashcards(key: number): Promise<Array<Flashcard>> {
  const flashcards = (await getFlashcardsByCourseKey(key)) ?? [];
  const flashcardsParsed: Array<Flashcard> = [];

  if (!flashcards.length) {
    return [];
  }

  flashcards.forEach((flashcard) => {
    flashcardsParsed.push({
      id: flashcard._id,
      term: flashcard.data?.term ?? "",
      termLanguage: flashcard.data?.termLanguage ?? "",
      definition: flashcard.data?.definition ?? "",
      definitionLanguage: flashcard.data?.definitionLanguage ?? "",
    });
  });

  return flashcardsParsed;
}

export default async function ViewSetPage({ params }: ViewSetPageProps) {
  await getTranslations("LibraryPage");
  const { key: keyParam, slug } = await params;
  const key = Number(keyParam);

  if (!Number.isInteger(key) || key <= 0) {
    notFound();
  }

  const courseData = await getCourseByKey(key);

  if (!courseData || courseData.slug !== slug) {
    notFound();
  }

  const flashcards = await getFlashcards(key);

  return (
    <main className="view-set mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-6">
      <section className="view-set__heading flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{courseData.title}</h1>
        <Button type="button">
          <Ellipsis />
        </Button>
      </section>
      <FlashcardsSlider flashcards={flashcards} />
    </main>
  );
}
