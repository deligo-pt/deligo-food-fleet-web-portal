/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";

export const getFleetEarnings = async (queryString?: string) => {
    try {
        const res = await serverFetch.get(`/analytics/fleet-manager-earning-analytics${queryString ? `?${queryString}` : ""}`, {
            next: {
                revalidate: 30
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to fetch fleet earnings");
        }

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error?.message : 'Something went wrong in fleet earnings fetching.'}`
        };
    }
};