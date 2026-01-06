/* eslint-disable @typescript-eslint/no-unused-vars */
import ActiveDeliveryPartners from "@/components/Dashboard/DeliveryPartner/ActivePartners/ActivePartners";
import { getDeliveryPartners } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { queryStringFormatter } from "@/utils/formatter";


type IProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const ActiveDeliveryPartnersPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const { status, ...restParams } = params;
  const queryString = queryStringFormatter({
    ...restParams,
    status: "APPROVED",
  });
  const deliveryPartners = await getDeliveryPartners(queryString);



  return <ActiveDeliveryPartners partnersResult={deliveryPartners || []} />;
};


export default ActiveDeliveryPartnersPage;
