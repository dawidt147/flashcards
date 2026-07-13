import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define a messages table with an index.
export default defineSchema({
  courses: defineTable({
    authorId: v.id("users"),
    type: v.union(v.literal("flashcards"), v.literal("tests")),
    slug: v.string(),
    permalink: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
    title: v.string(),
    description: v.string(),
  })
  .index("bySlug", ["slug"])
  .index("byAuthorId", ["authorId"]),

  flashcards: defineTable({
    courseId: v.id("courses"),
    //templateId: v.id("templates"),
    data: v.any()
  })
  .index("byCourseId", ["courseId"]),

  options: defineTable({
    name: v.string(),
    value: v.string(),
  })
  .index("byOption", ["name"]),

  taxonomy: defineTable({
    type: v.string(),
    slug: v.string(),
    title: v.string(),
    description: v.string(),
  }),

  taxonomyRelationships: defineTable({
    courseId: v.id("courses"),
    taxonomyId: v.id("taxonomy"),
  }),

  templates: defineTable({
    authorId: v.id("users"),
    courseType: v.string(),
    title: v.string(),
    fields: v.any(),
  }),

  tests: defineTable({
    courseId: v.id("courses"),
    templateId: v.id("templates"),
    data: v.any()
  }),
  
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