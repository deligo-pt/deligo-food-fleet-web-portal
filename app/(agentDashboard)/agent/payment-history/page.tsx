"use client";

import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
} from "lucide-react";

const historyData = [
  {
    id: "TX123456",
    date: "2023-10-20",
    partner: "Alex Johnson",
    amount: 1250.5,
    status: "completed",
    period: "Oct 12 - Oct 19",
  },
  {
    id: "TX123457",
    date: "2023-10-20",
    partner: "Sarah Williams",
    amount: 980.0,
    status: "completed",
    period: "Oct 12 - Oct 19",
  },
  {
    id: "TX123458",
    date: "2023-10-20",
    partner: "Michael Brown",
    amount: 2100.75,
    status: "processing",
    period: "Oct 12 - Oct 19",
  },
  {
    id: "TX123459",
    date: "2023-10-13",
    partner: "David Wilson",
    amount: 1675.0,
    status: "completed",
    period: "Oct 05 - Oct 12",
  },
  {
    id: "TX123460",
    date: "2023-10-13",
    partner: "Emily Davis",
    amount: 450.25,
    status: "failed",
    period: "Oct 05 - Oct 12",
  },
  {
    id: "TX123461",
    date: "2023-10-13",
    partner: "Alex Johnson",
    amount: 1100.0,
    status: "completed",
    period: "Oct 05 - Oct 12",
  },
];

export default function PaymentHistoryPage() {
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
        <h1 className="text-2xl font-bold text-[#DC3173]">{t("payment_history")}</h1>
        <p className="text-gray-500 mt-1">
          {t("log_past_payouts")}
        </p>
      </motion.div>
      <Card className="mt-10">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2 flex-1">
              <CustomInput
                placeholder="Search by transaction ID or partner..."
                className="max-w-md"
                icon={<Search className="w-4 h-4" />}
              />
              <Button variant="secondary" className="shrink-0">
                <Calendar className="w-4 h-4 mr-2" />
                {t("date_range")}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">{t("export")}</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {t("transaction_id")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("date")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("partner")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("period")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("amount")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("status")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("details")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item, index) => (
                  <motion.tr
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
                      delay: index * 0.05,
                    }}
                    className="bg-white border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.partner}
                    </td>
                    <td className="px-6 py-4 text-gray-400">{item.period}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4">
                      <CustomBadge
                        variant={
                          item.status === "completed"
                            ? "success"
                            : item.status === "processing"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {item.status}
                      </CustomBadge>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 px-2">
            <div className="text-sm text-gray-500">
              {t("showing")} <span className="font-medium">1</span> {t("to")}{" "}
              <span className="font-medium">6</span> of{" "}
              <span className="font-medium">128</span> {t("results")}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
