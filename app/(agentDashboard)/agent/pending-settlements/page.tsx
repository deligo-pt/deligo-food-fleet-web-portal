"use client";

import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

const pendingData = [
  {
    id: 1,
    partner: "Sarah Williams",
    amount: 145.5,
    daysPending: 2,
    trips: 5,
    status: "Accruing",
  },
  {
    id: 2,
    partner: "James Miller",
    amount: 320.25,
    daysPending: 5,
    trips: 12,
    status: "Review Needed",
  },
  {
    id: 3,
    partner: "Linda Davis",
    amount: 89.0,
    daysPending: 1,
    trips: 3,
    status: "Accruing",
  },
  {
    id: 4,
    partner: "Robert Wilson",
    amount: 560.75,
    daysPending: 8,
    trips: 22,
    status: "Overdue",
  },
  {
    id: 5,
    partner: "Michael Brown",
    amount: 210.0,
    daysPending: 3,
    trips: 8,
    status: "Accruing",
  },
];

export default function PendingSettlementsPage() {
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6">
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
        <h1 className="text-2xl font-bold text-[#DC3173]">
          {t("pending_settlements")}
        </h1>
        <p className="text-gray-500 mt-1">
          {t("track_earnings_accumulated")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-4">
          {pendingData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
            >
              <Card className="group cursor-pointer">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-12 rounded-full ${item.daysPending > 7
                        ? "bg-red-500"
                        : item.daysPending > 3
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        }`}
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.partner}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{item.trips} {t("trips_small")}</span>
                        <span>•</span>
                        <span
                          className={
                            item.daysPending > 5
                              ? "text-red-500 font-medium"
                              : ""
                          }
                        >
                          {item.daysPending} {t("days_pending")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">
                        {item.amount}
                      </p>
                      <CustomBadge
                        variant={
                          item.status === "Overdue"
                            ? "destructive"
                            : item.status === "Review Needed"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {item.status}
                      </CustomBadge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {t("settlement_rules")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                  {t("earnings_are_held")}
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                  {t("payouts_under_accure")}
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                  {t("disputes_freeze_settlement")}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("next_payout_cycle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-900">Monday, Oct 30</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {t("automatic_disbursement")} at 9:00 AM
                </p>
                <Button className="w-full">{t("configure_schedule")}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
