import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define a messages table with an index.
export default defineSchema({
  users: defineTable({
    userName: v.string(),
    password: v.string(),
    email: v.string(),
  })
  .index("byEmail", ["email"])
  .index("byUsername", ["userName"]),
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  })
});