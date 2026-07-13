import FlashcardsForm from "@/components/forms/flashcards-set";
import Button from "@/components/buttons/button";

export default function CreateNewSetPage() {
  return (
    <main className="create-set mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-6">
      <section className="create-set__heading flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Create a new flashcards set</h1>
        <div className="create-set__actions flex flex-wrap items-center gap-2">
          <Button
            id="create-set__submit"
            className="border border-zinc-300 bg-transparent text-sm text-foreground hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            Create
          </Button>
          <Button
            id="create-set__submit-and-practice"
            className="bg-primary text-sm"
          >
            Create and practice
          </Button>
        </div>
      </section>
      <FlashcardsForm operation="create" />
    </main>
  );
}
