import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createCourse = mutation({
  args: { 
    authorId: v.id("users"),
    type: v.union(v.literal("flashcards"), v.literal("tests")),
    slug: v.string(),
    permalink: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("courses", { 
        authorId: args.authorId, 
        type: args.type, 
        slug: args.slug,
        permalink: args.permalink,
        visibility: args.visibility,
        title: args.title,
        description: args.description
    });
  },
});

export const updateCourse = mutation({
  args: {
    courseId: v.id("courses"),
    slug: v.string(),
    permalink: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch("courses", args.courseId, { 
        slug: args.slug,
        permalink: args.permalink,
        visibility: args.visibility,
        title: args.title,
        description: args.description
    });
  },
});

export const getCourseById = query({
  args: {
    courseId: v.id("courses")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get("courses", args.courseId);
  },
});

export const courseSlugExists = query({
  args: {
    slug: v.string(),
    userId: v.id("users")
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
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("courses")
    .filter((q) => q.eq(q.field("authorId"), args.userId))
    .collect();
  },
})