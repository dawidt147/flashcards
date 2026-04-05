import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { 
    email: v.string(),
    userName: v.string(),
    password: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", { userName: args.userName, email: args.email, password: args.password, status: args.status });
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

export const activateUser = mutation({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get("users", args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.status !== "pending") {
      return { alreadyActive: true as const };
    }

    await ctx.db.patch("users", args.userId, { status: "active" });

    return { alreadyActive: false as const };
  },
});