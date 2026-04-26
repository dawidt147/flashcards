import { auth } from "@/root/auth";
import { getTranslations } from "next-intl/server";
import HeaderDashboard from "@/components/sections/header-dashboard";
import Footer from "@/components/sections/footer";

export default async function DashboardPage() {
  const session = await auth();
  const t = await getTranslations("DashboardPage");

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <HeaderDashboard />
      <main className="flex flex-1 flex-col">
        {t("loggedInAs", { email: session?.user?.email ?? "" })}
      </main>
      <Footer />
    </div>
  );
}
