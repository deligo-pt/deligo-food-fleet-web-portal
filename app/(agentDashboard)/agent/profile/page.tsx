import Profile from "@/components/Profile/Profile";
import { getFleetManagerProfile } from "@/services/getFleetManagerInfo/getFleetManagerInfo";

export default async function ProfilePage() {
  const agentData = await getFleetManagerProfile();

  return <Profile agent={agentData} />;
}
