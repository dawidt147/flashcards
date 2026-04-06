import { api } from "@/root/convex/_generated/api";
import type { Doc, Id } from "@/root/convex/_generated/dataModel";
import { getConvexClient } from "./client";

export async function getUserMeta(
  userId: Id<"users">,
  name: string,
): Promise<Doc<"userMeta"> | null> {
  return await getConvexClient().query(api.userMeta.getUserMeta, { userId, name });
}

export async function getUserMetaByNameAndValue(
  name: string,
  value: string,
): Promise<Doc<"userMeta"> | null> {
  return await getConvexClient().query(api.userMeta.getUserMetaByNameAndValue, {
    name,
    value,
  });
}

export async function addUserMetaRow(
  userId: Id<"users">,
  name: string,
  value: string,
): Promise<void> {
  await getConvexClient().mutation(api.userMeta.addUserMeta, { userId, name, value });
}

export async function removeUserMeta(
  userId: Id<"users">,
  name: string,
): Promise<Doc<"userMeta"> | null> {
  return await getConvexClient().mutation(api.userMeta.removeUserMeta, { userId, name });
}
