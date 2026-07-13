import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Id } from "@/root/convex/_generated/dataModel";

export interface ImageProps {
    width: number;
    height: number;
    alt?: string;
    src?: string;
    className?: string;
}
export interface LogoProps extends ImageProps {
    type: "default" | "white"
}

export interface IconProps {
    width: number;
    height: number;
    className?: string;
}

/** Native button props + optional `label` when you prefer a string prop over `children`. */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: ReactNode;
};

export interface SearchBarProps {
    placeholder: string;
}

export type Language = "english" | "polish";

export interface LanguageChooserProps {
    id: string;
    name: string;
    label?: string;
    defaultValue?: Language;
    className?: string;
}

export interface Flashcard {
    id: string;
    term?: string;
    definition?: string;
}

export interface FlashcardsFormProps {
    operation: "create" | "edit" | "delete";
    title?: string;
    description?: string;
    visibility?: "public" | "private";
    termLanguage?: Language;
    definitionLanguage?: Language;
    flashcards?: Array<Flashcard>;
}

export interface LibrarySetItem {
    id: Id<"courses">;
    title: string;
    termCount: number;
    author: string;
    href: string;
    creationTime: number;
}

export interface LibrarySetGroupData {
    label: string;
    items: Array<LibrarySetItem>;
}
