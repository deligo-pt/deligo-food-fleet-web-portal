

import Dashboard from "@/components/Dashboard/Dashboard/Dashboard";
import { getDashboardAnalytics } from "@/services/dashboard/dashboard/dashboard";
import { getFleetManagerInfo } from "@/services/getFleetManagerInfo/getFleetManagerInfo";

const DashboardPage = async () => {
  const { data } = await getFleetManagerInfo();
  const agentName = `${data?.existingFleetManager?.name?.firstName} ${data?.existingFleetManager?.name?.lastName}`;
  const dashboardAnalytics = await getDashboardAnalytics();

  return <Dashboard agentName={agentName} analytics={dashboardAnalytics?.data || []} />;
};


export default DashboardPage;
