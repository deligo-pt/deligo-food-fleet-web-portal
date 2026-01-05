import OnTheWay from "@/components/Dashboard/Order&Deliveries/OnTheWay";
import { getAllDeliveries } from "@/services/dashboard/order&deliveries/deliveries";
import { queryStringFormatter } from "@/utils/formatter";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const OnTheWayPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const { status, ...restParams } = params;
  const queryString = queryStringFormatter({
    ...restParams,
    status: "ON_THE_WAY",
  });

  const deliveries = await getAllDeliveries(queryString);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <OnTheWay deliveries={deliveries} />
    </div>
  );
};


export default OnTheWayPage;
