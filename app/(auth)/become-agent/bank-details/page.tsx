import BankDetails from '@/components/BecomeAgent/BankDetails';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const BankDetailsPage = async () => {
  const profileData = await getFleetManagerInfo();

  return (
    <div>
      <BankDetails profile={profileData} />
    </div>
  );
};

export default BankDetailsPage;