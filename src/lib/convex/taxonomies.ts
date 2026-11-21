import { api } from "@/root/convex/_generated/api";
import type { Doc, Id } from "@/root/convex/_generated/dataModel";
import { getConvexClient } from "./client";

export async function createTaxonomy(
  authorId: Id<"users">,
  type: string,
  generatedSlug: string,
  title: string,
  description: string,
): Promise<Id<"taxonomies">> {
  const client = getConvexClient();
  const slug = await getUniqueTaxonomySlug(generatedSlug, type, authorId);

  return await client.mutation(api.taxonomies.createTaxonomy, {
    authorId,
    type,
    slug,
    title,
    description,
  });
}

export async function taxonomySlugExists(
  slug: string,
  type: string,
  userId: Id<"users">,
): Promise<boolean> {
  const client = getConvexClient();

  return await client.query(api.taxonomies.taxonomySlugExists, {
    slug,
    type,
    userId,
  });
}

export async function getTaxonomyById(
  taxonomyId: Id<"taxonomies">,
): Promise<Doc<"taxonomies"> | null> {
  const client = getConvexClient();

  return await client.query(api.taxonomies.getTaxonomyById, {
    taxonomyId,
  });
}

export async function getTaxonomiesByAuthorId(
  authorId: Id<"users">,
  type?: string,
): Promise<Array<Doc<"taxonomies">>> {
  const client = getConvexClient();

  return await client.query(api.taxonomies.getTaxonomiesByAuthorId, {
    authorId,
    type,
  });
}

export async function removeTaxonomy(
  taxonomyId: Id<"taxonomies">,
): Promise<void> {
  const client = getConvexClient();

  await client.mutation(api.taxonomies.removeTaxonomy, {
    taxonomyId,
  });
}

export async function getUniqueTaxonomySlug(
  slug: string,
  type: string,
  authorId: Id<"users">,
): Promise<string> {
  const baseSlug = slug;
  let finalSlug = baseSlug;
  let counter = 1;

  while (await taxonomySlugExists(finalSlug, type, authorId)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return finalSlug;
}
