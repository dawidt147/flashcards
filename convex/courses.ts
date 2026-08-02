import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getNextKey } from "./counters";

function generatePermalink(
  slug: string,
  key: number,
  type: "flashcards" | "tests",
): string {
  return `/dashboard/${type}/${key}/${slug}`;
}

export const createCourse = mutation({
  args: {
    authorId: v.id("users"),
    type: v.union(v.literal("flashcards"), v.literal("tests")),
    slug: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const key = await getNextKey(ctx, "courses");
    const permalink = generatePermalink(args.slug, key, args.type);

    return await ctx.db.insert("courses", {
      key,
      authorId: args.authorId,
      type: args.type,
      slug: args.slug,
      permalink: permalink,
      visibility: args.visibility,
      title: args.title,
      description: args.description,
    });
  },
});

export const updateCourse = mutation({
  args: {
    courseId: v.id("courses"),
    key: v.number(),
    type: v.union(v.literal("flashcards"), v.literal("tests")),
    slug: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const permalink = generatePermalink(args.slug, args.key, args.type);

    return await ctx.db.patch("courses", args.courseId, {
      slug: args.slug,
      permalink: permalink,
      visibility: args.visibility,
      title: args.title,
      description: args.description,
    });
  },
});

export const getCourseById = query({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get("courses", args.courseId);
  },
});

export const getCourseByKey = query({
  args: { key: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("byKey", (q) => q.eq("key", args.key))
      .unique();
  },
});

export const courseSlugExists = query({
  args: {
    slug: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const slugExists = await ctx.db
      .query("courses")
      .withIndex("bySlug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("authorId"), args.userId))
      .first();

    if (slugExists) {
      return true;
    }

    return false;
  },
});

export const getUserCourses = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("authorId"), args.userId))
      .collect();
  },
});
