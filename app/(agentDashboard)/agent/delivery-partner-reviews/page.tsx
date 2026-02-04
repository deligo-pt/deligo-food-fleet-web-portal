import DeliveryPartnerReviews from '@/components/Dashboard/DeliveryPartner/DeliveryPartnerReviews/DeliveryPartnerReviews';
import { getAllReviews } from '@/services/dashboard/ratings/ratings.service';
import { queryStringFormatter } from '@/utils/formatter';

type IProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const DeliveryPartnerReviewsPage = async ({ searchParams }: IProps) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const reviews = await getAllReviews(queryString);

  return (
    <div>
      <DeliveryPartnerReviews reviews={reviews?.data} />
    </div>
  );
};

export default DeliveryPartnerReviewsPage;