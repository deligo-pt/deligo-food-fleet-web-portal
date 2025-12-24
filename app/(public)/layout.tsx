import FooterUltra from "@/components/Footer/Footer";
import Header from "@/components/navbar/Header";
import React from "react";


const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <div className="min-h-screen">
                {children}
            </div>
            <FooterUltra />
        </div>
    );
};

export default PublicLayout;