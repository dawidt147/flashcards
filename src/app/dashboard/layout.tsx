import HeaderDashboard from "@/components/sections/header-dashboard";
import Footer from "@/components/sections/footer";
import SidebarDashboard from "@/components/sections/sidebar-dashboard";
import Modals from "@/components/modals/modals";
import { getFolders } from "@/lib/actions/taxonomies";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const folders = await getFolders();

  return (
    <>
      <main className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <HeaderDashboard />
        <div className="grid grid-cols-10 gap-x-8">
          <div className="col-span-2">
            <SidebarDashboard folders={folders} />
          </div>
          <div className="col-span-8">
            {children}
            <Footer />
          </div>
        </div>
      </main>
      <Modals />
    </>
  );
}
