
import AllDeliveries from "@/components/Dashboard/Order&Deliveries/AllDeliveries";
import { getAllDeliveries } from "@/services/dashboard/order&deliveries/deliveries";
import { queryStringFormatter } from "@/utils/formatter";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const AllDeliveriesPage = async ({ searchParams }: IProps) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const deliveries = await getAllDeliveries(queryString);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <AllDeliveries deliveries={deliveries?.data} />
    </div>
  );
};


export default AllDeliveriesPage;