/* eslint-disable @typescript-eslint/no-unused-vars */

import Delivered from "@/components/Dashboard/Order&Deliveries/Delivered";
import { getAllDeliveries } from "@/services/dashboard/order&deliveries/deliveries";
import { queryStringFormatter } from "@/utils/formatter";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const DeliveredPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const { status, ...restParams } = params;
  const queryString = queryStringFormatter({
    ...restParams,
    status: "DELIVERED",
  });

  const deliveries = await getAllDeliveries(queryString);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Delivered deliveries={deliveries?.data} />
    </div>
  );
};


export default DeliveredPage;
