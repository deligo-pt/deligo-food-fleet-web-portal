'use server';

import { serverFetch } from "@/lib/serverFetch";
import { catchAsync } from "@/utils/catchAsync";
import { TFleetAgreementForm } from "@/validations/agreement/agreement.validation";
import { revalidatePath, revalidateTag } from "next/cache";

// create agreement
export const createAgreement = async (id: string, data: Partial<TFleetAgreementForm>) => {
    const result = await catchAsync(async () => {
        return await serverFetch.post(`/agreements/party/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    });

    if (result.success) {
        revalidateTag("agreements", {});
        revalidatePath("/become-agent/agreement/sign");
    };

    return result;
};


// sign agreement
export const signAgreement = async (id: string, data: Record<string, string>) => {
    const result = await catchAsync(async () => {
        return await serverFetch.post(`/agreements/${id}/sign`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    });

    if (result.success) {
        revalidateTag("agreements", {});
        revalidatePath("/become-agent/agreement/sign");
    };

    return result;

};


// get single agreement
export const getSingleAgreement = async (id: string) => {
    const result = await catchAsync(async () => {
        return await serverFetch.get(`/agreements/${id}`, {
            next: {
                tags: ["agreements"]
            }
        });
    });

    return result;
};

// get fleet agreement history
export const getAgreementHistory = async (fleetId: string, query?: string) => {
    const result = await catchAsync(async () => {
        return await serverFetch.get(`/agreements/party/${fleetId}${query ? `?${query}` : ""}`, {
            next: {
                tags: ["agreements"]
            }
        });
    });

    return result;
};

// get vendor current agreement
export const getCurrentAgreementVersion = async () => {
    const result = await catchAsync(async () => {
        return await serverFetch.get(`/agreements/current`, {
            next: {
                tags: ["agreements"]
            }
        });
    });


    return result;
};