import FooterUltra from "@/components/Footer/Footer";
import Header from "@/components/navbar/Header";
import { getFleetManagerProfile } from "@/services/getFleetManagerInfo/getFleetManagerInfo";
import React from "react";


const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const fleetData = await getFleetManagerProfile();

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