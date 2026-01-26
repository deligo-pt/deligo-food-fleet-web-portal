"use server";

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

    const result = await res.json();

    return result;
};
