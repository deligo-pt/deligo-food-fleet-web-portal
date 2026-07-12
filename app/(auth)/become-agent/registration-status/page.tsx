
import RegistrationStatus from '@/components/BecomeAgent/RegistrationStatus';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const RegistrationStatusPage = async () => {
  const {data} = await getFleetManagerInfo();

  return (
    <div>
      <RegistrationStatus profile={data?.existingFleetManager} />
    </div>
  );
};

export default RegistrationStatusPage;