'use server';

import {
  createCourse,
  getCourseById
} from '@/lib/convex/courses';
import type { Id } from "@/root/convex/_generated/dataModel";
import { getUserByEmail } from '@/lib/convex/users';
import { auth } from "@/root/auth";
import { slugify } from '@/lib/utils/string';
import { z } from 'zod';

type submitFlashcardsState = {
  error?: string;
  url?: string;
}

const flashcardSchema = z.object({
    id: z.string(),
    term: z.string(),
    definition: z.string()
});

const flashcardSetSchema = z.object({
    title: z.string().min(1).default("untitled"),
    description: z.string().default(""),
    visibility: z.enum(["public", "private"]),
    type: z.enum(["flashcards", "tests"]),
    operation: z.enum(["create", "edit", "delete"]),
    slug: z.string().min(1).default("untitled"),
    flashcards: z.string().transform((raw) => {
        const parsed = JSON.parse(raw);
        return z.array(flashcardSchema).parse(parsed);
    })
})

type FlashcardForm = z.infer<typeof flashcardSetSchema>;
type FlashcardSet = FlashcardForm & { userId: Id<"users"> };

export async function createSet(data: FlashcardSet) {
    try {
      const id = await createCourse(data.userId, data.type, data.slug, data.visibility, data.title, data.description, data.flashcards);
      const course = await getCourseById(id);
      const url = course?.permalink;

      if (!url) {
        return { error: "There was an error with course permalink", url: ""};
      }

      return { url: url };
    } catch (error) {
      if (error) {
        return { error: `Creating course finished with error: ${error}.`, url: ""};
      }  
      throw error;
    }
}

export async function editSet (data: FlashcardSet) { 
  return { error: "not yet implemented", url: ""}
}

export async function removeSet (data: FlashcardSet) { 
  return { error: "not yet implemented", url: ""}
}

export async function submitForm (
  prevState: submitFlashcardsState | undefined,
  formData: FormData
) { 
    const session = await auth();

    if (!session?.user) {
      return { error: "Unauthorized", url: ""};
    }

    const user = await getUserByEmail(session?.user?.email as string);
    const parsed = flashcardSetSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        visibility: formData.get("visibility"),
        type: formData.get("type"),
        operation: formData.get("operation"),
        slug: slugify(formData.get("title") as string),
        flashcards: formData.get("flashcards"),
    });

    if (!parsed.success) {
        return { error: "invalidForm", url: ""}
    }

    if (!user?._id) {
        return { error: "InvalidUser", url: ""}
    }

    const data: FlashcardSet = {
        ...parsed.data,
        userId: user?._id
    };

    switch (data.operation) {
      case "create":
        return await createSet(data);
      case "edit":
        return await editSet(data);
      case "delete":
        return { error: "not yet implemented", url: ""}
      default:
        return { error: "noOperationExecuted", url: ""}
    }
}

