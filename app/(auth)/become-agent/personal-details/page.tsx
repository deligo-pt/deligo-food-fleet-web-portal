
import PersonalDetails from '@/components/BecomeAgent/PersonalDetails';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const PersonalDetailsPage = async () => {
  const {data} = await getFleetManagerInfo();

  return (
    <div>
      <PersonalDetails profile={data?.existingFleetManager} />
    </div>
  );
};

export default PersonalDetailsPage;