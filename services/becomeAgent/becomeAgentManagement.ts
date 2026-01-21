'use server';
import { serverFetch } from "@/lib/serverFetch";
import { TFleetManager } from "@/types/fleet-manager.type";


export const verifyOtp = async (payload: { email: string, otp: string }) => {

    const res = await serverFetch.post("/auth/verify-otp", {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    return result;
};

export const resendOTP = async (payload: { email: string }) => {

    const res = await serverFetch.post("/auth/resend-otp", {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    return result;
};

export const updateFleetInformation = async (id: string, payload: Partial<TFleetManager>) => {

    const res = await serverFetch.patch(`/fleet-managers/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    return result;
};

export const uploadDocumentsReq = async (
    id: string,
    key: string,
    file: Blob
) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({ docImageTitle: key }));

        const res = await serverFetch.patch(`/fleet-managers/${id}/docImage`, {
            body: formData,
        });

        const result = await res.json();

        return result;
    } catch (err) {
        console.log("Server fetch error:", err);
        return false;
    }
};


