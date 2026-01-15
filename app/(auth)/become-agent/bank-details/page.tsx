import BankDetails from '@/components/BecomeAgent/BankDetails';
import { getFleetManagerProfile } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const BankDetailsPage = async () => {
  const profileData = await getFleetManagerProfile();

  return (
    <div>
      <BankDetails profile={profileData} />
    </div>
  );
};

export default BankDetailsPage;