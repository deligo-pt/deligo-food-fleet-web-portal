/* eslint-disable @typescript-eslint/no-unused-vars */

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
    <div>
      <CancelledDeliveries deliveries={deliveries?.data} />
    </div>
  );
};


export default CancelledDeliveriesPage;
