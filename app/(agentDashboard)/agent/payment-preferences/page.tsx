import PaymentPreferences from '@/components/Dashboard/FleetSettings/PaymentPreferences';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const PaymentPreferencesPage = async () => {
  const fleetInfo = await getFleetManagerInfo();

  return (
    <div>
      <PaymentPreferences bankDetails={fleetInfo?.data?.bankDetails} />
    </div>
  );
};

export default PaymentPreferencesPage;