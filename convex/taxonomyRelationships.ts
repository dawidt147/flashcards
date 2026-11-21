import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTaxonomyRelationship = mutation({
  args: {
    courseId: v.id("courses"),
    taxonomyId: v.id("taxonomies"),
  },
  handler: async (ctx, args) => {
    const course = await ctx.db.get("courses", args.courseId);
    const taxonomy = await ctx.db.get("taxonomies", args.taxonomyId);

    if (!course || !taxonomy) {
      throw new Error("Course or taxonomy not found");
    }

    const existing = await ctx.db
      .query("taxonomyRelationships")
      .withIndex("byCourseId", (q) => q.eq("courseId", args.courseId))
      .filter((q) => q.eq(q.field("taxonomyId"), args.taxonomyId))
      .first();

    if (existing) {
      return existing._id;
    }

    return await ctx.db.insert("taxonomyRelationships", {
      courseId: args.courseId,
      taxonomyId: args.taxonomyId,
    });
  },
});

export const getTaxonomyRelationshipsByCourseId = query({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("taxonomyRelationships")
      .withIndex("byCourseId", (q) => q.eq("courseId", args.courseId))
      .collect();
  },
});

export const getTaxonomyRelationshipsByTaxonomyId = query({
  args: {
    taxonomyId: v.id("taxonomies"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("taxonomyRelationships")
      .withIndex("byTaxonomyId", (q) => q.eq("taxonomyId", args.taxonomyId))
      .collect();
  },
});

export const removeTaxonomyRelationship = mutation({
  args: {
    relationshipId: v.id("taxonomyRelationships"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete("taxonomyRelationships", args.relationshipId);
  },
});

export const removeTaxonomyRelationshipByCourseAndTaxonomy = mutation({
  args: {
    courseId: v.id("courses"),
    taxonomyId: v.id("taxonomies"),
  },
  handler: async (ctx, args) => {
    const relationship = await ctx.db
      .query("taxonomyRelationships")
      .withIndex("byCourseId", (q) => q.eq("courseId", args.courseId))
      .filter((q) => q.eq(q.field("taxonomyId"), args.taxonomyId))
      .first();

    if (relationship) {
      await ctx.db.delete("taxonomyRelationships", relationship._id);
    }
  },
});
