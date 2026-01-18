export const dynamic = "force-dynamic";

import Sidebar from "@/components/Dashboard/AgentDashboardSidebar/AgentDashboardSidebar";
import DesktopSidebar from "@/components/Dashboard/AgentDashboardSidebar/DesktopSidebar";
import Topbar from "@/components/Dashboard/AgentTopbar/Topbar";
import { getFleetManagerProfile } from "@/services/getFleetManagerInfo/getFleetManagerInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleet Manager Dashboard",
  description: "Deligo Fleet Manager dashboard",
};

export default async function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const agentData = await getFleetManagerProfile();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile view: Sidebar on top, Topbar below */}
      <div className="flex flex-col md:hidden w-full">
        <div className="w-full">
          <Sidebar agent={agentData} />
        </div>
        <div className="w-full sticky top-0 z-40">
          <Topbar agent={agentData} />
        </div>
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>

      {/* Desktop view */}
      <DesktopSidebar agentData={agentData}>{children}</DesktopSidebar>
    </div>
  );
}
