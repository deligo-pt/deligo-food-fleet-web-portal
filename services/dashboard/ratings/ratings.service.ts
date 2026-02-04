'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";



export const getAllReviews = async (queryString?: string) => {
    try {
        const res = await serverFetch.get(`/ratings/get-all-ratings${queryString ? `?${queryString}` : ""}`);

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong in ratings fetching.'}`
        };
    }
};