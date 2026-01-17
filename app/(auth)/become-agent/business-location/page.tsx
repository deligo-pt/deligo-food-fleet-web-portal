
import BusinessLocation from "@/components/BecomeAgent/BusinessLocation";
import { getFleetManagerInfo } from "@/services/getFleetManagerInfo/getFleetManagerInfo";


const BusinessLocationPage = async () => {
  const profileData = await getFleetManagerInfo();

  return (
    <div>
      <BusinessLocation profile={profileData} />
    </div>
  );
};

export default BusinessLocationPage;