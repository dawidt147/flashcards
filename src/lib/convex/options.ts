import { api } from "@/root/convex/_generated/api";
import { getConvexClient } from "./client";

export async function getOptionValue(optionName: string): Promise<string | undefined> {
  const result = await getConvexClient().query(api.options.getOption, { optionName });
  return result?.value;
}
