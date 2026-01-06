/* eslint-disable @typescript-eslint/no-unused-vars */
import RejectedPartners from "@/components/Dashboard/DeliveryPartner/RejectedPartners/RejectedPartners";
import { getDeliveryPartners } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const RejectedPartnersPage = async ({ searchParams }: IProps) => {
    const params = await searchParams;
    const { status, ...restParams } = params;
    const queryString = queryStringFormatter({
        ...restParams,
        status: "REJECTED",
    });
    const deliveryPartners = await getDeliveryPartners(queryString);


    return <RejectedPartners partnersResult={deliveryPartners || []} />;
};


export default RejectedPartnersPage;
