import DeliveryPartners from "@/components/Dashboard/DeliveryPartner/DeliveryPartners";
import { getDeliveryPartners } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const DeliveryPartnersPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const queryString = queryStringFormatter(params);
  const deliveryPartners = await getDeliveryPartners(queryString);


  return <DeliveryPartners partnersResult={deliveryPartners} />;
};


export default DeliveryPartnersPage;
