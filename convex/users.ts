import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserById = query({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get("users", args.userId);
  },
});

export const getUserByEmail = query({
    args: {
      email: v.string()
    },
    handler: async (ctx, args) => {
      return await ctx.db
      .query("users")
      .withIndex("byEmail", (q) => q.eq("email", args.email))
      .first();
    },
});

export const getUserByUsername = query({
    args: {
      userName: v.string()
    },
    handler: async (ctx, args) => {
      return await ctx.db
      .query("users")
      .withIndex("byUsername", (q) => q.eq("userName", args.userName))
      .first();
    },
});