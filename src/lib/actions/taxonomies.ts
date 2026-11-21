"use server";

import { createTaxonomy } from "@/lib/convex/taxonomies";
import type { Id } from "@/root/convex/_generated/dataModel";
import { getUserByEmail } from "@/lib/convex/users";
import { auth } from "@/root/auth";
import { slugify } from "@/lib/utils/string";
import { z } from "zod";
import { Folder } from "@/types/interfaces";
import { getTaxonomiesByAuthorId } from "@/lib/convex/taxonomies";

export type SubmitFolderCreateState = {
  error?: string;
  success: boolean;
  taxonomyId?: Id<"taxonomies">;
};

const taxonomySchema = z.object({
  title: z.string().trim().min(1, "Name is required"),
  description: z.string().default(""),
  type: z.enum(["folder"]),
  slug: z.string().min(1, "Slug is required"),
});

type TaxonomyForm = z.infer<typeof taxonomySchema>;
type TaxonomyPayload = TaxonomyForm & { userId: Id<"users"> };

export async function createFolder(
  _prevState: SubmitFolderCreateState | undefined,
  formData: FormData,
): Promise<SubmitFolderCreateState> {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthorized", success: false };
  }

  const user = await getUserByEmail(session.user.email as string);
  const title = String(formData.get("title") ?? "");

  const parsed = taxonomySchema.safeParse({
    title,
    description: formData.get("description") ?? "",
    type: "folder",
    slug: slugify(title),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid form",
      success: false,
    };
  }

  if (!user?._id) {
    return { error: "InvalidUser", success: false };
  }

  const data: TaxonomyPayload = {
    ...parsed.data,
    userId: user._id,
  };

  try {
    const taxonomyId = await createTaxonomy(
      data.userId,
      data.type,
      data.slug,
      data.title,
      data.description,
    );

    return { success: true, taxonomyId };
  } catch (error) {
    return {
      error: `Creating folder failed: ${error instanceof Error ? error.message : String(error)}`,
      success: false,
    };
  }
}

export async function getFolders(): Promise<Array<Folder>> {
  const session = await auth();
  const userEmail = session?.user?.email ?? "";
  const user = await getUserByEmail(userEmail);

  if (!user?._id) {
    return [];
  }

  const folders = await getTaxonomiesByAuthorId(user._id, "folder");
  const items: Array<Folder> = [];

  for (const folder of folders) {
    if (!folder) {
      continue;
    }

    items.push({
      title: folder.title,
      slug: folder.slug,
    });
  }

  return items;
}
