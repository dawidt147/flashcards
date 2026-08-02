import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createFlashcard = mutation({
  args: {
    courseId: v.id("courses"),
    //templateId: v.id("templates"),
    data: v.any()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("flashcards", { 
        courseId: args.courseId,
        //templateId: args.templateId, 
        data: args.data
    });
  },
});

export const getFlashcardById = query({
  args: {
    flashcardId: v.id("flashcards")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get("flashcards", args.flashcardId);
  },
});

export const getFlashcardsByCourseId = query({
  args: {
    courseId: v.id("courses")
  },
  handler: async (ctx, args) => {
    return await ctx.db
    .query("flashcards")
    .withIndex("byCourseId", (q) => q.eq("courseId", args.courseId))
    .collect();
  },
});

export const getFlashcardsByCourseKey = query({
  args: {
    key: v.number(),
  },
  handler: async (ctx, args) => {
    const course = await ctx.db
      .query("courses")
      .withIndex("byKey", (q) => q.eq("key", args.key))
      .unique();

    if (!course) {
      return [];
    }

    return await ctx.db
      .query("flashcards")
      .withIndex("byCourseId", (q) => q.eq("courseId", course._id))
      .collect();
  },
});

export const removeFlashcard = mutation({
  args: {
    flashcardId: v.id("flashcards")
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete("flashcards", args.flashcardId);
  },
});

export const removeFlashcardsFromCourse = mutation({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const flashcards = await ctx.db
    .query("flashcards")
    .withIndex("byCourseId", (q) => q.eq("courseId", args.courseId))
    .collect();

    if (flashcards.length === 0) return false;

    for (const flashcard of flashcards) {
        await ctx.db.delete("flashcards", flashcard._id);
    }

    return true;
  },
});