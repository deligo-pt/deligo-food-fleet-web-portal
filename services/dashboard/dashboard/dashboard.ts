import { serverFetch } from "@/lib/serverFetch";
import { catchAsync } from "@/utils/catchAsync";

export const getDashboardAnalytics = async () => {
  return catchAsync(async () => {
    return await serverFetch.get(`/analytics/fleet/dashboard-analytics`, {
      next: {
        revalidate: 30,
      },
    });
  });
};
