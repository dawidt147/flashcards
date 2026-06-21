import { auth } from "@/root/auth";
import { getTranslations } from "next-intl/server";

export default async function EditPage() {
  const session = await auth();
  const t = await getTranslations("DashboardPage");

  return (
    <main className="flex flex-1 flex-col">
      <form>
        Add
      </form>
    </main>
  );
}
