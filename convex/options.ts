import { query } from "./_generated/server";
import { v } from "convex/values";

export const getOption = query({
  args: {
    optionName: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
    .query("options")
    .withIndex("byOption", (q) => q.eq("name", args.optionName))
    .first();
  },
});