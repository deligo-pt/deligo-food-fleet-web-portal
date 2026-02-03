/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { CreditCard, Building2, Hash, User } from "lucide-react";

const PaymentPreferences = ({ bankDetails }: { bankDetails: any }) => {
    const { t } = useTranslation();

    const FIELD_ITEMS = [
        {
            label: t("account_holder"),
            value: bankDetails?.accountHolderName,
            icon: <User className="w-5 h-5 text-[#DC3173]" />,
        },
        {
            label: t("bank_name"),
            value: bankDetails?.bankName,
            icon: <Building2 className="w-5 h-5 text-[#DC3173]" />,
        },
        {
            label: t("iban"),
            value: bankDetails?.iban,
            icon: <CreditCard className="w-5 h-5 text-[#DC3173]" />,
        },
        {
            label: t("swift_code"),
            value: bankDetails?.swiftCode,
            icon: <Hash className="w-5 h-5 text-[#DC3173]" />,
        },
    ];

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <DashboardPageHeader
                    title={t("payment_preference")}
                    desc={t("manage_payout_gateways")}
                />
            </motion.div>

            <div className="grid grid-cols-1 mt-10">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-[#DC3173]" />
                            {t("payout_configuration")}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {FIELD_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border"
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span className="text-sm text-gray-600">
                                        {item.label}
                                    </span>
                                </div>

                                <span className="text-sm font-medium text-gray-900 truncate max-w-[60%]">
                                    {item.value || "—"}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentPreferences;
