import { type MutationCtx } from "./_generated/server";

export async function getNextKey(ctx: MutationCtx, counterName: string) {
  const counter = await ctx.db
    .query("counters")
    .withIndex("byName", (q) => q.eq("name", counterName))
    .unique();

  const next = (counter?.value ?? 0) + 1;

  if (counter) {
    await ctx.db.patch(counter._id, { value: next });
  } else {
    await ctx.db.insert("counters", { name: counterName, value: next });
  }

  return next;
}
