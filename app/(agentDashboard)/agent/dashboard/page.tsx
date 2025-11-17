import Dashboard from "@/components/Dashboard/Dashboard/Dashboard";
import { serverRequest } from "@/lib/serverFetch";
import { TResponse } from "@/types";
import { TFleetManager } from "@/types/fleet-manager.type";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  let initialData = "";

  try {
    const accessToken = (await cookies()).get("accessToken")?.value || "";
    const decoded = jwtDecode(accessToken) as { id: string };
    const id = decoded.id;
    const result = (await serverRequest.get(
      `/fleet-managers/${id}`
    )) as unknown as TResponse<TFleetManager>;

    if (result?.success) {
      initialData = `${result?.data?.name?.firstName} ${result?.data?.name?.lastName}`;
    }
  } catch (err) {
    console.error("Server fetch error:", err);
  }

  return <Dashboard agentName={initialData} />;
}
