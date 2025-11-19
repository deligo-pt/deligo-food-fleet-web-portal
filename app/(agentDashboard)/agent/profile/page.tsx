import Profile from "@/components/Profile/Profile";
import { serverRequest } from "@/lib/serverFetch";
import { TFleetManager } from "@/types/fleet-manager.type";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  const decoded = jwtDecode(accessToken) as { id: string };

  let agentData: TFleetManager = {} as TFleetManager;

  try {
    const result = await serverRequest.get(`/fleet-managers/${decoded.id}`);

    if (result?.success) {
      agentData = result?.data;
    }
  } catch (err) {
    console.error("Server fetch error:", err);
  }

  return <Profile agent={agentData} />;
}
