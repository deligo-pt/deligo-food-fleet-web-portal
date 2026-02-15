/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/serverFetch";



export const getPartnerSosAlerts = async (queryString?: string) => {
    try {
        const res = await serverFetch.get(`/sos${queryString ? `?${queryString}` : ""}`);

        if (!res.ok) throw new Error('Failed to fetch sos alerts');

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error?.response?.data?.message : 'Something went wrong in partner sos fetching.'}`
        };
    }
};

