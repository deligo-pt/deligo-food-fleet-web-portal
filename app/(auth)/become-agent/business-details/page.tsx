import BusinessDetails from "@/components/BecomeAgent/BusinessDetails";
import { getFleetManagerInfo } from "@/services/getFleetManagerInfo/getFleetManagerInfo";


const BusinessDetailsPage = async () => {
  const profileData = await getFleetManagerInfo();

  return (
    <div>
      <BusinessDetails profile={profileData} />
    </div>
  );
};

export default BusinessDetailsPage;