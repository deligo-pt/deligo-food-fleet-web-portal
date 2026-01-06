/* eslint-disable @typescript-eslint/no-unused-vars */
import SuspendedPartners from "@/components/Dashboard/DeliveryPartner/SuspendedPartners/SuspendedPartners";
import { getDeliveryPartners } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const SuspendedPartnersPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const { status, ...restParams } = params;
  const queryString = queryStringFormatter({
    ...restParams,
    status: "BLOCKED",
  });
  const deliveryPartners = await getDeliveryPartners(queryString);


  return <SuspendedPartners partnersResult={deliveryPartners || []} />;
};


export default SuspendedPartnersPage;
