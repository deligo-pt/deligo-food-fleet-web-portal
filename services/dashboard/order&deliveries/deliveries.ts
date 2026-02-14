'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";



export const getAllDeliveries = async (queryString?: string) => {
    try {
        const res = await serverFetch.get(`/orders${queryString ? `?${queryString}` : ""}`, {
            next: {
                revalidate: 30
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to fetch deliveries");
        }

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error?.message : 'Something went wrong in deliveries fetching.'}`
        };
    }
};