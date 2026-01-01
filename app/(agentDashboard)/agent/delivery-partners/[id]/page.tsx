import { DeliveryPartnerDetails } from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerDetails.tsx/DeliveryPartnerDetails";
import { serverRequest } from "@/lib/serverFetch";
import { TResponse } from "@/types";
import { TDeliveryPartner } from "@/types/delivery-partner.type";

export default async function DeliveryPartnerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  let initialData: TDeliveryPartner = {} as TDeliveryPartner;

  try {
    const result = (await serverRequest.get(
      `/delivery-partners/${id}`
    )) as unknown as TResponse<TDeliveryPartner>;
    console.log(result);
    if (result?.success) {
      initialData = result.data;
    }
  } catch (err) {
    console.error("Server fetchProducts error:", err);
  };

  console.log(initialData);
  return (
    <div className="p-4 md:p-6">
      <DeliveryPartnerDetails partner={initialData} />
    </div>
  );
}
