import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { 
    userName: v.string(),
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", { userName: args.userName, email: args.email, password: args.password });
  },
});

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