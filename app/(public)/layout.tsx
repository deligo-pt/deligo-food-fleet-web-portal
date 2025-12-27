import FooterUltra from "@/components/Footer/Footer";
import Header from "@/components/navbar/Header";
import { serverRequest } from "@/lib/serverFetch";
import { TFleetManager } from "@/types/fleet-manager.type";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import React from "react";


const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const accessToken = (await cookies()).get("accessToken")?.value || "";
    let fleetData: TFleetManager = {} as TFleetManager;

    if (accessToken) {
        const decoded = jwtDecode(accessToken) as { role: string };

        if (decoded && decoded?.role === "FLEET_MANAGER") {
            try {
                const result = await serverRequest.get("profile");

                if (result?.success) {
                    fleetData = result?.data;
                }
            } catch (err) {
                console.error("Server fetch error:", err);
            }
        }
    }

    return (
        <div>
            <Header fleetData={fleetData} />
            <div className="min-h-screen">
                {children}
            </div>
            <FooterUltra />
        </div>
    );
};

export default PublicLayout;