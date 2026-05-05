import DeliveryPartnerPayouts from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerPayouts/DeliveryPartnerPayouts";
import { getDeliveryPartnerPayouts, getDeliveryPartners } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const DeliveryPartnerPayoutsPage = async ({ searchParams }: IProps) => {
    const params = await searchParams;
    const queryString = queryStringFormatter(params);
    const payoutsData = await getDeliveryPartnerPayouts(queryString);
    const deliveryPartners = await getDeliveryPartners();

    return (
        <div>
            <DeliveryPartnerPayouts partners={deliveryPartners?.data as TDeliveryPartner[]} payouts={payoutsData} />
        </div>
    );
};

export default DeliveryPartnerPayoutsPage;