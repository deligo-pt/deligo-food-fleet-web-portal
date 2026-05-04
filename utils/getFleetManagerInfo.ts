import { serverFetch } from "@/lib/serverFetch";
import { TFleetManager } from "@/types/fleet-manager.type";
import { catchAsync } from "@/utils/catchAsync";
import { verifyJWT } from "@/utils/verifyJWT";
import { cookies } from "next/headers";

export const getFleetManagerInfo = async (): Promise<{
  fleetManager: TFleetManager;
  accessToken: string;
} | null> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || "";

  if (accessToken) {
    const decoded = await verifyJWT(accessToken);

    if (decoded.success && decoded?.data?.role === "FLEET_MANAGER") {
      const result = await catchAsync(async () => {
        return await serverFetch.get(
          `/fleet-managers/${decoded?.data?.userId}`,
        );
      });

      if (result?.success) {
        return { fleetManager: result?.data, accessToken };
      }
      return null;
    }
    return null;
  }

  return null;
};
