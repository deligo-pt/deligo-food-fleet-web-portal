

import Dashboard from "@/components/Dashboard/Dashboard/Dashboard";
import { getDashboardAnalytics } from "@/services/dashboard/dashboard/dashboard";
import { getFleetManagerInfo } from "@/services/getFleetManagerInfo/getFleetManagerInfo";

const DashboardPage = async () => {
  const fleetProfile = await getFleetManagerInfo();
  const agentName = `${fleetProfile?.data?.name?.firstName} ${fleetProfile?.data?.name?.lastName}`;
  const dashboardAnalytics = await getDashboardAnalytics();


  return <Dashboard agentName={agentName} analytics={dashboardAnalytics?.data || []} />;
};


export default DashboardPage;
