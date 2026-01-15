'use server';
import { serverFetch } from "@/lib/serverFetch";
import { TFleetManager } from "@/types/fleet-manager.type";




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



