import BankDetails from '@/components/BecomeAgent/BankDetails';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const BankDetailsPage = async () => {
  const { data } = await getFleetManagerInfo();

  return (
    <div>
      <BankDetails profile={data?.existingFleetManager} />
    </div>
  );
};

export default BankDetailsPage;