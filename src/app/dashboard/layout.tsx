import HeaderDashboard from "@/components/sections/header-dashboard";
import Footer from "@/components/sections/footer";
import SidebarDashboard from "@/components/sections/sidebar-dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <HeaderDashboard />
      <div className="grid grid-cols-10 gap-x-8">
        <div className="col-span-2">
          <SidebarDashboard />
        </div>
        <div className="col-span-8">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
