import { api } from "@/root/convex/_generated/api";
import type { Doc, Id } from "@/root/convex/_generated/dataModel";
import { getConvexClient } from "./client";

export async function createTaxonomyRelationship(
  courseId: Id<"courses">,
  taxonomyId: Id<"taxonomies">,
): Promise<Id<"taxonomyRelationships">> {
  const client = getConvexClient();

  return await client.mutation(
    api.taxonomyRelationships.createTaxonomyRelationship,
    { courseId, taxonomyId },
  );
}

export async function getTaxonomyRelationshipsByCourseId(
  courseId: Id<"courses">,
): Promise<Array<Doc<"taxonomyRelationships">>> {
  const client = getConvexClient();

  return await client.query(
    api.taxonomyRelationships.getTaxonomyRelationshipsByCourseId,
    { courseId },
  );
}

export async function getTaxonomyRelationshipsByTaxonomyId(
  taxonomyId: Id<"taxonomies">,
): Promise<Array<Doc<"taxonomyRelationships">>> {
  const client = getConvexClient();

  return await client.query(
    api.taxonomyRelationships.getTaxonomyRelationshipsByTaxonomyId,
    { taxonomyId },
  );
}
