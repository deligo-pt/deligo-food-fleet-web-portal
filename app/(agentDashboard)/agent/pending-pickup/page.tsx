/* eslint-disable @typescript-eslint/no-unused-vars */
import PendingPickup from "@/components/Dashboard/Order&Deliveries/PendingPickup";
import { getAllDeliveries } from "@/services/dashboard/order&deliveries/deliveries";
import { queryStringFormatter } from "@/utils/formatter";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const PendingPickupPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const { status, ...restParams } = params;
  const queryString = queryStringFormatter({
    ...restParams,
    status: "PENDING",
  });

  const deliveries = await getAllDeliveries(queryString);

  return (
    <div>
      <PendingPickup deliveries={deliveries?.data} />
    </div>
  );
};


export default PendingPickupPage;
