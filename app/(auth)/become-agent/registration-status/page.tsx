
import RegistrationStatus from '@/components/BecomeAgent/RegistrationStatus';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const RegistrationStatusPage = async () => {
  const profileData = await getFleetManagerInfo();

  return (
    <div>
      <RegistrationStatus profile={profileData} />
    </div>
  );
};

export default RegistrationStatusPage;