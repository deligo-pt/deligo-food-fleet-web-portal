export const dynamic = "force-dynamic";

import Sidebar from "@/components/Dashboard/AgentDashboardSidebar/AgentDashboardSidebar";
import Topbar from "@/components/Dashboard/AgentTopbar/Topbar";
import { serverRequest } from "@/lib/serverFetch";
import { TFleetManager } from "@/types/fleet-manager.type";
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
  let agentData: TFleetManager = {} as TFleetManager;

  try {
    const result = await serverRequest.get("/profile");

    if (result?.success) {
      agentData = result?.data;
    }
  } catch (err) {
    console.error("Server fetch error:", err);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile view: Sidebar on top, Topbar below */}
      <div className="flex flex-col md:hidden w-full">
        <div className="w-full">
          <Sidebar />
        </div>
        <div className="w-full sticky top-0 z-40">
          <Topbar />
        </div>
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex w-full">
        {/* Sidebar fixed left */}
        <div className="w-[280px] h-screen fixed top-0 left-0 z-50 bg-white border-r">
          <Sidebar />
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col md:ml-[280px]">
          {/* Topbar sticky */}
          <div className="w-full sticky top-0 z-40">
            <Topbar agent={agentData} />
          </div>
          {/* Page content */}
          <main className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
