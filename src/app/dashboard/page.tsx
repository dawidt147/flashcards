import { auth } from "@/root/auth";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const session = await auth();
  const t = await getTranslations("DashboardPage");

  return (
    <main className="flex flex-1 flex-col">
      {t("loggedInAs", { email: session?.user?.email ?? "" })}
    </main>
  );
}
