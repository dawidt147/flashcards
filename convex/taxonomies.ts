import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTaxonomy = mutation({
  args: {
    authorId: v.id("users"),
    type: v.string(),
    slug: v.string(),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("taxonomies", {
      authorId: args.authorId,
      type: args.type,
      slug: args.slug,
      title: args.title,
      description: args.description,
    });
  },
});

export const getTaxonomyById = query({
  args: {
    taxonomyId: v.id("taxonomies"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get("taxonomies", args.taxonomyId);
  },
});

export const getTaxonomiesByAuthorId = query({
  args: {
    authorId: v.id("users"),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const type = args.type;
    if (type !== undefined) {
      return await ctx.db
        .query("taxonomies")
        .withIndex("byAuthorIdAndType", (q) =>
          q.eq("authorId", args.authorId).eq("type", type),
        )
        .collect();
    }

    return await ctx.db
      .query("taxonomies")
      .withIndex("byAuthorId", (q) => q.eq("authorId", args.authorId))
      .collect();
  },
});

export const removeTaxonomy = mutation({
  args: {
    taxonomyId: v.id("taxonomies"),
  },
  handler: async (ctx, args) => {
    const relationships = await ctx.db
      .query("taxonomyRelationships")
      .withIndex("byTaxonomyId", (q) => q.eq("taxonomyId", args.taxonomyId))
      .collect();

    for (const relationship of relationships) {
      await ctx.db.delete("taxonomyRelationships", relationship._id);
    }

    await ctx.db.delete("taxonomies", args.taxonomyId);
  },
});

export const taxonomySlugExists = query({
  args: {
    slug: v.string(),
    type: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const slugExists = await ctx.db
      .query("taxonomies")
      .withIndex("bySlug", (q) => q.eq("slug", args.slug))
      .filter((q) =>
        q.and(
          q.eq(q.field("authorId"), args.userId),
          q.eq(q.field("type"), args.type),
        ),
      )
      .first();

    if (slugExists) {
      return true;
    }

    return false;
  },
});
