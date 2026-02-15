/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";


export const getDashboardAnalytics = async () => {
    try {
        const res = await serverFetch.get(`/analytics/fleet-dashboard-analytics`, {
            next : {
                revalidate: 30
            }
        });

        if (!res.ok) throw new Error('Failed to fetch dashboard analytics');

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error?.response?.data?.message : 'Something went wrong in dashboard analytics fetching.'}`
        };
    }
};