import DeliveryPartnerEmergencyAlerts from "@/components/Dashboard/Emergency_sos/DeliveryPartnerEmergencyAlerts";
import { getPartnerSosAlerts } from "@/services/dashboard/sos/sos.service";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const DeliveryPartnerEmergencyAlertsPage = async ({ searchParams }: IProps) => {
    const params = await searchParams;
    const queryString = queryStringFormatter(params);
    const sosAlerts = await getPartnerSosAlerts(queryString);

    return (
        <div>
            <DeliveryPartnerEmergencyAlerts sosAlerts={sosAlerts} />
        </div>
    );
};

export default DeliveryPartnerEmergencyAlertsPage;