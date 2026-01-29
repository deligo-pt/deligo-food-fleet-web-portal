import LiveTracking from "@/components/Dashboard/Emergency_sos/LiveTracking/LiveTracking";
import { getDeliveryPartners } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const LiveTrackingPage = async ({ searchParams }: IProps) => {
    const params = await searchParams;
    const queryString = queryStringFormatter(params);
    const deliveryPartners = await getDeliveryPartners(queryString);

    return (
        <div>
            <LiveTracking deliveryPartners={deliveryPartners} />
        </div>
    );
};

export default LiveTrackingPage;