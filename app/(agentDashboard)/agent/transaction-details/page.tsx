
"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Bike, Receipt, Search, User } from "lucide-react";
import { useState } from "react";

export default function TransactionDetailsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <div>
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <DashboardPageHeader
          title={t("transaction_lookup")}
          desc={t("find_detailed_financial_breakdown")}
        />
      </motion.div>

      <Card className="mb-8 border-[#DC3173]/20 shadow-lg shadow-[#DC3173]/5 mt-10">
        <CardContent className="p-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <CustomInput
              placeholder="Enter Order ID (e.g. ORD-2023-8892)"
              className="flex-1 text-lg h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
            <Button size="lg" disabled={isSearching} className="min-w-[120px]">
              {t("search")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Info */}
          <Card className="md:col-span-2">
            <CardHeader className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t("order")} #ORD-2023-8892
                  </h2>
                  <p className="text-sm text-gray-500">
                    Oct 24, 2023 • 2:30 PM
                  </p>
                </div>
                <CustomBadge variant="success" className="px-3 py-1 text-sm">
                  Completed
                </CustomBadge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mb-1 ml-1" />
                  <div className="w-0.5 h-12 bg-gray-200 ml-[5px]" />
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1 ml-1" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                      {t("pickup")}
                    </p>
                    <p className="font-medium">Burger King - Downtown</p>
                    <p className="text-sm text-gray-500">
                      123 Main St, San Francisco, CA
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                      {t("drop_off")}
                    </p>
                    <p className="font-medium">Residential Apartment</p>
                    <p className="text-sm text-gray-500">
                      456 Oak Ave, Unit 4B, San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t("customer")}</p>
                    <p className="font-medium">Alice Freeman</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Bike className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t("partner")}</p>
                    <p className="font-medium">Michael Brown</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Breakdown */}
          <Card className="bg-gray-50/50 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#DC3173]" />
                {t("financial_breakdown")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t("delivery_fee")}</span>
                  <span className="font-medium">$5.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t("service_fee")}</span>
                  <span className="font-medium">$2.50</span>
                </div>
                <div className="flex justify-between text-sm text-[#DC3173]">
                  <span className="flex items-center gap-1">
                    {t("surge_bonus")}
                    <CustomBadge
                      variant="secondary"
                      className="text-[10px] h-4 px-1"
                    >
                      2.0x
                    </CustomBadge>
                  </span>
                  <span className="font-medium">+$4.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t("tip")}</span>
                  <span className="font-medium">$3.50</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t("gross_total")}</span>
                  <span className="font-bold">$15.99</span>
                </div>
                <div className="flex justify-between text-sm text-red-500">
                  <span>{t("platform_fee")} (20%)</span>
                  <span>-$3.20</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <span className="font-bold text-gray-900">{t("partner_net")}</span>
                  <span className="font-bold text-xl text-[#DC3173]">
                    $12.79
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-[#DC3173] h-2 rounded-full"
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: "80%",
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5,
                    }}
                  />
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">
                  80% {t("payout_rate")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
