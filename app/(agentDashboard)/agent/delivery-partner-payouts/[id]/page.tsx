import PayoutDetails from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerPayouts/PayoutDetails";
import { getSinglePayout } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { TRiderSettlement } from "@/types/payout.type";

interface PageProps {
    params: {
        id: string;
    };
}

const PayoutDetailsPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const response = await getSinglePayout(id);

    return (
        <div>
            <PayoutDetails payout={response as TRiderSettlement} />
        </div>
    );
};

export default PayoutDetailsPage;