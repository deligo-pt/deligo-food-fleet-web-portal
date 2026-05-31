import { EditDeliveryPartnerForm } from "@/components/Dashboard/DeliveryPartner/EditDeliveryPartnerForm/EditDeliveryPartnerForm";
import { getDeliveryPartnerDetails } from "@/services/dashboard/deliveryPartner/deliveryPartner";

interface IProps {
  params: { id: string };
};

const EditDeliveryPartnerPage = async ({ params }: IProps) => {
  const { id } = await params;
  const partnerDetails = await getDeliveryPartnerDetails(id);

  return (
    <div>
      <EditDeliveryPartnerForm partnerDetails={partnerDetails || {}} />
    </div>
  );
};

export default EditDeliveryPartnerPage;
