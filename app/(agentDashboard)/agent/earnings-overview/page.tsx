import EarningsOverview from '@/components/Dashboard/Payments&Earnings/EarningsOverview';
import { getFleetEarnings } from '@/services/dashboard/payments&earnings/payments.service';
import { queryStringFormatter } from '@/utils/formatter';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const EarningsOverviewPage = async ({ searchParams }: IProps) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const earnings = await getFleetEarnings(queryString);

  return (
    <div>
      <EarningsOverview earnings={earnings?.data} />
    </div>
  );
};

export default EarningsOverviewPage;