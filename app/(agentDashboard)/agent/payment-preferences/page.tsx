import PaymentPreferences from '@/components/Dashboard/FleetSettings/PaymentPreferences';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const PaymentPreferencesPage = async () => {
  const { data } = await getFleetManagerInfo();

  return (
    <div>
      <PaymentPreferences bankDetails={data?.existingFleetManager?.bankDetails} />
    </div>
  );
};

export default PaymentPreferencesPage;