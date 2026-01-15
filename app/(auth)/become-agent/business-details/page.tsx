import BusinessDetails from "@/components/BecomeAgent/BusinessDetails";
import { getFleetManagerProfile } from "@/services/getFleetManagerInfo/getFleetManagerInfo";


const BusinessDetailsPage = async () => {
  const profileData = await getFleetManagerProfile();

  return (
    <div>
      <BusinessDetails profile={profileData} />
    </div>
  );
};

export default BusinessDetailsPage;