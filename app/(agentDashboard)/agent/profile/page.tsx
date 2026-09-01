import Profile from "@/components/Profile/Profile";
import { getAgreementHistory } from "@/services/dashboard/agreement/agreement.service";
import { getFleetManagerProfile } from "@/services/getFleetManagerInfo/getFleetManagerInfo";
import { IAgreementsResponse } from "@/types/agreement.type";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const ProfilePage = async ({ searchParams }: IProps) => {
  const agentData = await getFleetManagerProfile();
  const params = await searchParams;
  const queryString = queryStringFormatter(params);
  const agreementsData = await getAgreementHistory(agentData?.userId, queryString);

  return <Profile agent={agentData} agreementsData={agreementsData as IAgreementsResponse} />;
}

export default ProfilePage;