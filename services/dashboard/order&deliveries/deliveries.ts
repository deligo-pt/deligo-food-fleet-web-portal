'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverRequest } from "@/lib/serverFetch";



export const getAllDeliveries = async (queryString: string) => {
    try {
        const res = await serverRequest.get(`/orders${queryString ? `?${queryString}` : ""}`);

        // const result = await res.json();
        // const deliveries = result;

        return res;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong in deliveries fetching.'}`
        };
    }
};