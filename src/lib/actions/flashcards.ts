"use server";

import { createCourse, getCourseById } from "@/lib/convex/courses";
import type { Id } from "@/root/convex/_generated/dataModel";
import { getUserByEmail } from "@/lib/convex/users";
import { auth } from "@/root/auth";
import { slugify } from "@/lib/utils/string";
import { z } from "zod";
import { languageSchema, Flashcard, Language } from "@/types/interfaces";

type submitFlashcardsState = {
  error?: string;
  url?: string;
};

const flashcardSchema = z.object({
  id: z.string(),
  term: z.string().trim().min(1, "Term is required"),
  definition: z.string().trim().min(1, "Definition is required"),
  termLanguage: languageSchema,
  definitionLanguage: languageSchema,
});

const flashcardSetSchema = z.object({
  title: z.string().min(1).default("untitled"),
  description: z.string().default(""),
  visibility: z.enum(["public", "private"]),
  type: z.enum(["flashcards", "tests"]),
  operation: z.enum(["create", "edit", "delete"]),
  slug: z.string().min(1).default("untitled"),
  termLanguage: languageSchema,
  definitionLanguage: languageSchema,
  flashcards: z
    .string()
    .transform((raw) => JSON.parse(raw))
    .pipe(
      z
        .array(flashcardSchema)
        .min(2, "You must add at least 2 flashcards to create a set."),
    ),
});

type FlashcardForm = z.infer<typeof flashcardSetSchema>;
type FlashcardSet = FlashcardForm & { userId: Id<"users"> };

const fieldLabels: Record<string, string> = {
  title: "Title",
  description: "Description",
  visibility: "Visibility",
  type: "Type",
  operation: "Operation",
  slug: "Slug",
  termLanguage: "Term language",
  definitionLanguage: "Definition language",
  flashcards: "Flashcards",
};

function formatValidationError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const [root, index] = issue.path;

      if (root === "flashcards" && typeof index === "number") {
        return `Card ${index + 1}: ${issue.message}`;
      }

      if (root === "flashcards") {
        return issue.message;
      }

      if (typeof root === "string" && root in fieldLabels) {
        return `${fieldLabels[root]}: ${issue.message}`;
      }

      return issue.message;
    })
    .join(" ");
}

export async function createSet(data: FlashcardSet) {
  try {
    const id = await createCourse(
      data.userId,
      data.type,
      data.slug,
      data.visibility,
      data.title,
      data.description,
      data.flashcards,
    );
    const course = await getCourseById(id);
    const url = course?.permalink;

    if (!url) {
      return { error: "There was an error with course permalink", url: "" };
    }

    return { url: url };
  } catch (error) {
    if (error) {
      return {
        error: `Creating course finished with error: ${error}.`,
        url: "",
      };
    }
    throw error;
  }
}

export async function editSet(data: FlashcardSet) {
  return { error: "not yet implemented", url: "" };
}

export async function removeSet(data: FlashcardSet) {
  return { error: "not yet implemented", url: "" };
}

export async function submitForm(
  prevState: submitFlashcardsState | undefined,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthorized", url: "" };
  }

  console.log(formData);

  const user = await getUserByEmail(session?.user?.email as string);
  const termLanguage = formData.get("termLanguage") as Language;
  const definitionLanguage = formData.get("definitionLanguage") as Language;
  const flashcards = JSON.parse(formData.get("flashcards") as string);

  flashcards.forEach((card: Flashcard) => {
    card.termLanguage = termLanguage;
    card.definitionLanguage = definitionLanguage;
  });

  const parsed = flashcardSetSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    visibility: formData.get("visibility"),
    type: formData.get("type"),
    operation: formData.get("operation"),
    slug: slugify(formData.get("title") as string),
    termLanguage: termLanguage,
    definitionLanguage: definitionLanguage,
    flashcards: JSON.stringify(flashcards),
  });

  if (!parsed.success) {
    return {
      error: formatValidationError(parsed.error),
      url: "",
    };
  }

  if (!user?._id) {
    return { error: "InvalidUser", url: "" };
  }

  const data: FlashcardSet = {
    ...parsed.data,
    userId: user?._id,
  };

  switch (data.operation) {
    case "create":
      return await createSet(data);
    case "edit":
      return await editSet(data);
    case "delete":
      return { error: "not yet implemented", url: "" };
    default:
      return { error: "noOperationExecuted", url: "" };
  }
}
