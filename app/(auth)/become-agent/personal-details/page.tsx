
import PersonalDetails from '@/components/BecomeAgent/PersonalDetails';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const PersonalDetailsPage = async () => {
  const profileData = await getFleetManagerInfo();

  return (
    <div>
      <PersonalDetails profile={profileData} />
    </div>
  );
};

export default PersonalDetailsPage;