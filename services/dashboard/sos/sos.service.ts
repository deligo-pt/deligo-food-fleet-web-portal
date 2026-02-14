/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/serverFetch";
import { TSosIssueTag } from "@/types/sos.type";

export const triggerSos = async (data: {
    userNote: string;
    issueTags: TSosIssueTag[];
}) => {
    const res = (await serverFetch.post("/sos/trigger", {
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data),
    }));

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create sos request");
    }

    const result = await res.json();

    return result;
};



export const getPartnerSosAlerts = async (queryString?: string) => {
    try {
        const res = await serverFetch.get(`/sos${queryString ? `?${queryString}` : ""}`);

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to fetch sos alerts");
        }

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error?.message ? error?.message : error?.response?.data?.message : 'Something went wrong in partner sos fetching.'}`
        };
    }
};

