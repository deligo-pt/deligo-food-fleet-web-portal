"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IContact } from "@/types/contact-us.type";

export const contactUsformReq = async (data: IContact) => {
    const res = (await serverFetch.post("/contact-us", {
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
    }));

    const result = await res.json();

    return result;
};
