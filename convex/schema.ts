import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define a messages table with an index.
export default defineSchema({
  options: defineTable({
    name: v.string(),
    value: v.string(),
  })
  .index("byOption", ["name"]),
  
  users: defineTable({
    userName: v.string(),
    password: v.string(),
    email: v.string(),
    status: v.string(),
  })
  .index("byEmail", ["email"])
  .index("byUsername", ["userName"]),

  userMeta: defineTable({
    userId: v.id("users"),
    name: v.string(),
    value: v.string(),
  })
  .index("byUserMeta", ["userId", "name"])
  .index("byNameAndValue", ["name", "value"]),
});