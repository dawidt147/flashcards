import { api } from "@/root/convex/_generated/api";
import type { Doc, Id } from "@/root/convex/_generated/dataModel";
import { getConvexClient } from "./client";
import { Flashcard } from "@/types/interfaces";

export async function getFlashcardsByCourseId(
  courseId: Id<"courses">
): Promise<Array<Doc<"flashcards">>> {
  const client = getConvexClient();

  return await client.query(api.flashcards.getFlashcardsByCourseId, {
    courseId,
  });
}

export async function getFlashcardsByCourseKey(
  key: number,
): Promise<Array<Doc<"flashcards">>> {
  const client = getConvexClient();

  return await client.query(api.flashcards.getFlashcardsByCourseKey, {
    key,
  });
}

export async function createFlashcard(
  courseId: Id<"courses">,
  data: object
): Promise<Id<"flashcards">> {
  const client = getConvexClient();
  const flashcardId = await client.mutation(api.flashcards.createFlashcard, {
    courseId,
    data
  });

  return flashcardId;
}

export async function removeFlashcard(
  flashcardId: Id<"flashcards">
): Promise<void> {
  const client = getConvexClient();
  await client.mutation(api.flashcards.removeFlashcard, {
    flashcardId
  });
}

export async function createFlashcards(
  courseId: Id<"courses">,
  courseData: Array<Flashcard>,
): Promise<boolean> {
  if (!courseData.length) {
    return false;
  }

  for (const flashcard of courseData) {
    await createFlashcard(courseId, flashcard);
  }

  return true;
}

export async function removeFlashcardsFromCourse(
  courseId: Id<"courses">
): Promise<boolean> {
  const client = getConvexClient();
  const result = await client.mutation(api.flashcards.removeFlashcardsFromCourse, {
    courseId
  });

  return result;
}