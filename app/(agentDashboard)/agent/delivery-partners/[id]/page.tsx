import { DeliveryPartnerDetails } from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerDetails.tsx/DeliveryPartnerDetails";
import { getDeliveryPartnerDetails } from "@/services/dashboard/deliveryPartner/deliveryPartner";

export default async function DeliveryPartnerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partnerData = await getDeliveryPartnerDetails(id);

  return (
    <div className="p-4 md:p-6">
      <DeliveryPartnerDetails partner={partnerData} />
    </div>
  );
}
