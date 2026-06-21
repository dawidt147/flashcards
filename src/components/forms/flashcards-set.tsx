"use client";
import type { Flashcard, FlashcardsFormProps } from "@/types/interfaces";
import {
    Bold,
    GripVertical,
    ImageIcon,
    Lock,
    Mic,
    Palette,
    Trash2,
} from "lucide-react";
import { nanoid } from "nanoid";
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
import Button from "../buttons/button";
import LanguageChooser from "../inputs/language-chooser";
import { useState, useRef, useId } from "react";

function FlashcardRow({ index, flashcard, deleteCard }: 
    { index:number, flashcard: Flashcard, deleteCard:(cardId: string) => void }) {
    const id = flashcard.id;
    const isEmpty = !flashcard.term && !flashcard.definition;
    const [ element, setElement ] = useState<Element | null>(null);
    const handleRef = useRef<HTMLButtonElement | null>(null);
    const { isDragging } = useSortable({id, index, element, handle: handleRef});

    return (
        <li id={flashcard.id} 
            className="flashcards-form__card rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-900/40"
            ref={setElement}
            data-shadow={isDragging || undefined}>
            <div className="flashcards-form__card-header flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700/60">
                <span className="flashcards-form__card-number text-sm font-semibold text-zinc-500">
                    {index + 1}
                </span>
                <div className="flashcards-form__card-toolbar flex items-center gap-1">
                    <button
                        type="button"
                        disabled
                        aria-label="Text formatting"
                        className="rounded p-1.5 text-zinc-400"
                    >
                        <Bold className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        disabled
                        aria-label="Text color"
                        className="rounded p-1.5 text-zinc-400"
                    >
                        <Palette className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        disabled
                        aria-label="Record audio"
                        className="rounded p-1.5 text-zinc-400"
                    >
                        <Mic className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        disabled
                        aria-label="Premium feature"
                        className="rounded p-1.5 text-zinc-400"
                    >
                        <Lock className="h-4 w-4" />
                    </button>
                </div>
                <div className="flashcards-form__card-actions flex items-center gap-1">
                    <button
                        type="button"
                        ref={handleRef}
                        aria-label="Reorder card"
                        className="rounded p-1.5 text-zinc-400"
                    >
                        <GripVertical className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-label="Delete card"
                        className="rounded p-1.5 text-zinc-400"
                        onClick={() => deleteCard(flashcard.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <div className="flashcards-form__card-body grid gap-4 p-4 md:grid-cols-[1fr_1fr_auto]">
                <div className="flashcards-form__field flex flex-col gap-2">
                    <textarea
                        name={`${flashcard.id}-term`}
                        defaultValue={flashcard.term ?? ""}
                        placeholder={isEmpty ? "Enter term" : undefined}
                        rows={4}
                        className="flashcards-form__field-input min-h-24 resize-none border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-800/60"
                    />
                    <span className="flashcards-form__field-label text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Term
                    </span>
                </div>
                <div className="flashcards-form__field flex flex-col gap-2">
                    <textarea
                        name={`${flashcard.id}-definition`}
                        defaultValue={flashcard.definition ?? ""}
                        placeholder={isEmpty ? "Enter definition" : undefined}
                        rows={4}
                        className="flashcards-form__field-input min-h-24 resize-none border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-800/60"
                    />
                    <span className="flashcards-form__field-label text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Definition
                    </span>
                </div>
                <div
                    className="flashcards-form__image-slot flex min-h-24 min-w-28 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 text-zinc-400 dark:border-zinc-600"
                    aria-hidden
                >
                    <ImageIcon className="h-6 w-6" />
                    <span className="text-xs font-medium">Image</span>
                </div>
            </div>
        </li>
    );
}

const FlashcardsForm = ({
    title,
    description,
    visibility = "public",
    termLanguage,
    definitionLanguage,
    flashcards,
}: FlashcardsFormProps) => {
    const DEFAULT_FLASHCARDS: Flashcard[] = [
        { id: `flashcard-${useId()}` },
        { id: `flashcard-${useId()}` },
    ];
    const [cards, setCards] = useState(flashcards ?? DEFAULT_FLASHCARDS);

    function addCards(newCards: Flashcard[] = [{ id: `flashcard-${nanoid()}` }]) {
        setCards((cards) => [...cards, ...newCards]);
    }

    function deleteCard(cardId: string) {
        if (cards.length > 1) {
            setCards((cards) => cards.filter((card) => card.id !== cardId));
        }
    }

    return (
        <form className="flashcards-form flex flex-col gap-6">
            <section className="flashcards-form__meta flex flex-col gap-4">
                <div className="flashcards-form__meta-top flex flex-wrap items-center gap-3">
                    <select
                        name="visibility"
                        defaultValue={visibility}
                        className="flashcards-form__select-visibility w-auto min-w-28"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <input
                    type="text"
                    name="title"
                    defaultValue={title ?? ""}
                    placeholder="Title"
                    className="flashcards-form__title border-0 bg-transparent px-0 py-2 text-2xl font-semibold shadow-none focus:ring-0"
                />
                <input
                    type="text"
                    name="description"
                    defaultValue={description ?? ""}
                    placeholder="Add a description..."
                    className="flashcards-form__description border-0 bg-transparent px-0 py-1 text-base text-zinc-500 shadow-none focus:ring-0"
                />
            </section>

            <section className="flashcards-form__toolbar flex flex-wrap items-end justify-between gap-3">
                <div className="flex flex-wrap items-end gap-3">
                    <LanguageChooser
                        id="flashcards-form-term-language"
                        name="termLanguage"
                        label="Term language"
                        defaultValue={termLanguage}
                    />
                    <LanguageChooser
                        id="flashcards-form-definition-language"
                        name="definitionLanguage"
                        label="Definition language"
                        defaultValue={definitionLanguage}
                    />
                    <Button
                        type="button"
                        id="flashcards-form-import"
                        className="border border-zinc-300 bg-transparent text-sm text-foreground hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
                    >
                        + Import
                    </Button>
                    {/* <Button
                        type="button"
                        id="flashcards-form-add-diagram"
                        className="border border-zinc-300 bg-transparent text-sm text-foreground hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
                    >
                        + Add diagram
                    </Button> */}
                </div>
                <label className="flex items-center gap-2 text-sm text-zinc-500">
                    <span>Suggestions</span>
                    <span className="relative inline-flex h-5 w-9 rounded-full bg-primary/80">
                        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                    </span>
                </label>
            </section>

            <section className="flashcards-form__cards">
                <DragDropProvider onDragEnd={(event) => {
                    setCards((cards) => move(cards, event))
                }}>
                    <ul className="flex flex-col gap-4">
                        {cards.map((flashcard, index) => (
                            <FlashcardRow 
                                key={flashcard.id} 
                                index={index} 
                                flashcard={flashcard}
                                deleteCard={deleteCard} />
                        ))}
                    </ul>
                </DragDropProvider>
            </section>

            <section className="flashcards-form__footer flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-700/60">
                <Button
                    type="button"
                    id="flashcards-form-add-card"
                    className="border border-zinc-300 bg-transparent text-sm text-foreground hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
                    onClick={() => addCards()}
                >
                    + Add card
                </Button>
                <Button
                    type="button"
                    id="flashcards-form-create"
                    className="bg-primary text-sm"
                >
                    Create
                </Button>
            </section>
        </form>
    );
};

export default FlashcardsForm;
