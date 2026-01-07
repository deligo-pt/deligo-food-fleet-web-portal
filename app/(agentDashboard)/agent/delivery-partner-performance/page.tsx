import DeliveryPartnerPerformance from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerPerformance/DeliveryPartnerPerformance";
import { getPartnerPerformanceAnalytics } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const DeliveryPartnerPerformancePage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const queryString = queryStringFormatter(params);
  const partnerPerformance = await getPartnerPerformanceAnalytics(queryString);


  return (
    <div>
      <DeliveryPartnerPerformance partnerPerformance={partnerPerformance} />
    </div>
  );
};

export default DeliveryPartnerPerformancePage;