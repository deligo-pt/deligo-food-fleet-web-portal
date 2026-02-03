import PaymentPreferences from '@/components/Dashboard/FleetSettings/PaymentPreferences';
import { getFleetManagerInfo } from '@/services/getFleetManagerInfo/getFleetManagerInfo';


const PaymentPreferencesPage = async () => {
  const fleetInfo = await getFleetManagerInfo();
  // console.log(fleetInfo);
  return (
    <div>
      <PaymentPreferences />
    </div>
  );
};

export default PaymentPreferencesPage;