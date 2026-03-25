import PaymentHistory from '@/components/Dashboard/Payments&Earnings/PaymentHistory';
import { getPaymentHistory } from '@/services/dashboard/payments&earnings/payments.service';
import { queryStringFormatter } from '@/utils/formatter';

type IProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const PaymentHistoryPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const queryString = queryStringFormatter(params);
  const paymentHistory = await getPaymentHistory(queryString);

  return (
    <div>
      <PaymentHistory payments={paymentHistory} />
    </div>
  );
};

export default PaymentHistoryPage;