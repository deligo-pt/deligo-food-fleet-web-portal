import { DeliveryPartnerDetails } from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerDetails.tsx/DeliveryPartnerDetails";
import { getDeliveryPartnerDetails } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { getAllOrders } from "@/services/dashboard/order&deliveries/deliveries";
import { queryStringFormatter } from "@/utils/formatter";

export default async function DeliveryPartnerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partnerData = await getDeliveryPartnerDetails(id);

  const query = { deliveryPartnerId: partnerData?._id };
  const queryString = queryStringFormatter(query);
  const { data, meta } = await getAllOrders(queryString);

  return (
    <div>
      <DeliveryPartnerDetails partner={partnerData} orderResult={{ data, meta }} />
    </div>
  );
}
