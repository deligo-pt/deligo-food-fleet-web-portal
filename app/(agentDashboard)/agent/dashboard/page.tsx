

import Dashboard from "@/components/Dashboard/Dashboard/Dashboard";
import { getDeliveryPartners } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { getFleetManagerInfo } from "@/services/getFleetManagerInfo/getFleetManagerInfo";

const DashboardPage = async () => {
  const deliveryPartners = await getDeliveryPartners();
  const fleetProfile = await getFleetManagerInfo();
  const agentName = `${fleetProfile?.name?.firstName} ${fleetProfile?.name?.lastName}`


  return <Dashboard agentName={agentName} deliveryPartners={deliveryPartners} />;
};


export default DashboardPage;
