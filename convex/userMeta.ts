import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const addUserMeta = mutation({
  args: { 
    userId: v.id("users"),
    name: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("userMeta", { userId: args.userId, name: args.name, value: args.value });
  },
});

export const getUserMeta = query({
    args: {
      userId: v.id("users"),
      name: v.string(),
    },
    handler: async (ctx, args) => {
      return await ctx.db
        .query("userMeta")
        .withIndex("byUserMeta", (q) =>
          q.eq("userId", args.userId).eq("name", args.name),
        )
        .first();
    },
});

export const getUserMetaByNameAndValue = query({
  args: {
    name: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userMeta")
      .withIndex("byNameAndValue", (q) =>
        q.eq("name", args.name).eq("value", args.value),
      )
      .first();
  },
});