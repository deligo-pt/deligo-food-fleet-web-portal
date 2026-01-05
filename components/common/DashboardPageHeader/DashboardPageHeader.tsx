import { motion } from "framer-motion";
import React from "react";

interface PageProps {
    title: string;
    desc: string;
    isButton?: boolean;
    button_title?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const DashboardPageHeader = ({ title, desc, isButton = false, button_title, icon, onClick }: PageProps) => {
    return (
        <div className="bg-linear-to-r from-[#DC3173] to-[#FF6CAB] p-6 rounded-lg mb-6 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        {/* {t("delivery_partners")} */}
                        {title}
                    </h1>
                    <p className="text-pink-100 mt-1">
                        {/* {t("manage_your_delivery")} */}
                        {desc}
                    </p>
                </div>
                {isButton && <motion.button
                    // onClick={() => router.push("/agent/add-delivery-partner")}
                    onClick={onClick}
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    className="mt-4 md:mt-0 bg-white text-[#DC3173] px-4 py-2 rounded-md font-medium flex items-center shadow-md"
                >
                    {icon}
                    {/* <PlusCircleIcon className="mr-2 h-5 w-5" /> */}
                    {/* {t("add_new_partner")} */}
                    {button_title}
                </motion.button>}
            </div>
        </div>
    );
};

export default DashboardPageHeader;