/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { serverFetch } from "@/lib/serverFetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


export const getFleetManagerInfo = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value || "";
    const decoded = jwtDecode(accessToken) as { userId: string };
    const id = decoded.userId;

    try {
        const res = await serverFetch.get(`/fleet-managers/${id}`);

        const result = await res.json();

        return result?.data;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong in fetching manager info.'}`
        };
    }
};




