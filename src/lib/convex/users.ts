import { api } from "@/root/convex/_generated/api";
import type { Doc, Id } from "@/root/convex/_generated/dataModel";
import { getConvexClient } from "./client";
import { addUserMetaRow } from "./userMeta";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const ACTIVATION_TOKEN_EXPIRY_DAYS = 7;

export async function getUserByEmail(email: string): Promise<Doc<"users"> | null> {
  return await getConvexClient().query(api.users.getUserByEmail, { email });
}

/** First match by email, then by username (signup conflict check). */
export async function findUserByEmailOrUsername(
  email: string,
  userName: string,
): Promise<Doc<"users"> | null> {
  const byEmail = await getConvexClient().query(api.users.getUserByEmail, { email });
  if (byEmail) return byEmail;
  return await getConvexClient().query(api.users.getUserByUsername, { userName });
}

export async function activateUser(userId: Id<"users">) {
  return await getConvexClient().mutation(api.users.activateUser, { userId });
}

export async function createPendingAccountWithActivation(
  email: string,
  userName: string,
  password: string,
  status: string,
  activationToken: string,
): Promise<Id<"users">> {
  const client = getConvexClient();
  const userId = await client.mutation(api.users.createUser, {
    email,
    userName,
    password,
    status,
  });

  if (userId && status === "pending") {
    const expiryMs = Date.now() + MS_PER_DAY * ACTIVATION_TOKEN_EXPIRY_DAYS;
    const expiryDate = expiryMs.toString();
    await addUserMetaRow(userId, "activationToken", activationToken);
    await addUserMetaRow(userId, "activationTokenExpiryDate", expiryDate);
  }

  return userId;
}
