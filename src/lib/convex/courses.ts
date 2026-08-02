import { api } from "@/root/convex/_generated/api";
import type { Id, Doc } from "@/root/convex/_generated/dataModel";
import { getConvexClient } from "./client";
import { createFlashcards, removeFlashcardsFromCourse } from "./flashcards";
import { Flashcard } from "@/types/interfaces";

export async function createCourse(
  authorId: Id<"users">,
  type: "flashcards" | "tests",
  generatedSlug: string,
  visibility: "public" | "private",
  title: string,
  description: string,
  courseData: Array<Flashcard>,
): Promise<Id<"courses">> {
  const client = getConvexClient();
  const slug = await getUniqueSlug(generatedSlug, authorId);
  const id = await client.mutation(api.courses.createCourse, {
    authorId,
    type,
    slug,
    visibility,
    title,
    description,
  });

  if (id) {
    await createFlashcards(id, courseData);
  }

  return id;
}

export async function updateCourse(
  courseId: Id<"courses">,
  authorId: Id<"users">,
  key: number,
  type: "flashcards" | "tests",
  generatedSlug: string,
  visibility: "public" | "private",
  title: string,
  description: string,
  courseData: Array<Flashcard>,
): Promise<Id<"courses"> | null> {
  const client = getConvexClient();
  const slug = await getUniqueSlug(generatedSlug, authorId);
  const id = await client.mutation(api.courses.updateCourse, {
    key,
    slug,
    type,
    visibility,
    title,
    description,
    courseId,
  });

  if (id) {
    await removeFlashcardsFromCourse(id);
    await createFlashcards(id, courseData);
  }

  return id;
}

export async function courseSlugExists(
  slug: string,
  userId: Id<"users">,
): Promise<boolean> {
  const client = getConvexClient();

  return await client.query(api.courses.courseSlugExists, {
    slug,
    userId,
  });
}

export async function getCourseById(
  courseId: Id<"courses">,
): Promise<Doc<"courses"> | null> {
  const client = getConvexClient();

  return await client.query(api.courses.getCourseById, {
    courseId,
  });
}

export async function getCourseByKey(
  key: number,
): Promise<Doc<"courses"> | null> {
  const client = getConvexClient();

  return await client.query(api.courses.getCourseByKey, {
    key,
  });
}

async function getUniqueSlug(
  slug: string,
  authorId: Id<"users">,
): Promise<string> {
  const baseSlug = slug;
  let finalSlug = baseSlug;
  let counter = 1;

  while (await courseSlugExists(finalSlug, authorId)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return finalSlug;
}

export async function getUserCourses(
  userId: Id<"users">,
): Promise<Array<Doc<"courses"> | null>> {
  const client = getConvexClient();

  return await client.query(api.courses.getUserCourses, {
    userId,
  });
}
