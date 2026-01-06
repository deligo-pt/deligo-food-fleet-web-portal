/* eslint-disable @typescript-eslint/no-unused-vars */
import PendingVerification from "@/components/Dashboard/DeliveryPartner/PendingVerification/PendingVerification";
import { getDeliveryPartners } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const PendingApprovalsPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const { status, ...restParams } = params;
  const queryString = queryStringFormatter({
    ...restParams,
    status: "PENDING",
  });
  const deliveryPartners = await getDeliveryPartners(queryString);


  return <PendingVerification partnersResult={deliveryPartners || []} />;
};


export default PendingApprovalsPage;
