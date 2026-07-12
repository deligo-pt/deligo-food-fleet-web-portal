
import BusinessLocation from "@/components/BecomeAgent/BusinessLocation";
import { getFleetManagerInfo } from "@/services/getFleetManagerInfo/getFleetManagerInfo";


const BusinessLocationPage = async () => {
  const {data} = await getFleetManagerInfo();

  return (
    <div>
      <BusinessLocation profile={data?.existingFleetManager} />
    </div>
  );
};

export default BusinessLocationPage;