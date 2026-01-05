
import CancelledDeliveries from "@/components/Dashboard/Order&Deliveries/CancelledDeliveries";
import { getAllDeliveries } from "@/services/dashboard/order&deliveries/deliveries";
import { queryStringFormatter } from "@/utils/formatter";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const CancelledDeliveriesPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const { status, ...restParams } = params;
  const queryString = queryStringFormatter({
    ...restParams,
    status: "CANCELED",
  });

  const deliveries = await getAllDeliveries(queryString);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <CancelledDeliveries deliveries={deliveries} />
    </div>
  );
};


export default CancelledDeliveriesPage;
