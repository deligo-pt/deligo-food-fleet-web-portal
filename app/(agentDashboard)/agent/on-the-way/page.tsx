/* eslint-disable @typescript-eslint/no-unused-vars */
import OnTheWay from "@/components/Dashboard/Order&Deliveries/OnTheWay";
import { getAllDeliveries } from "@/services/dashboard/order&deliveries/deliveries";
import { queryStringFormatter } from "@/utils/formatter";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const OnTheWayPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const { orderStatus, ...restParams } = params;
  const queryString = queryStringFormatter({
    ...restParams,
    orderStatus: "ON_THE_WAY",
  });

  const deliveries = await getAllDeliveries(queryString);

  return (
    <div>
      <OnTheWay deliveries={deliveries} />
    </div>
  );
};


export default OnTheWayPage;
