import { auth } from "@/root/auth";
import HeaderDashboard from "@/components/sections/header-dashboard";
import Footer from "@/components/sections/footer";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <HeaderDashboard />
      <main className="flex flex-1 flex-col">
        Logged in as: {session?.user?.email}
      </main>
      <Footer />
    </div>
  );
}
