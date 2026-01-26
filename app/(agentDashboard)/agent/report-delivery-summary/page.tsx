"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";

const deliveries = [
  {
    id: "#ORD-9921",
    partner: "Alex Johnson",
    time: "10:30 AM",
    distance: "4.2 km",
    fee: "$8.50",
    status: "Completed",
  },
  {
    id: "#ORD-9922",
    partner: "Sam Wilson",
    time: "10:45 AM",
    distance: "2.1 km",
    fee: "$5.20",
    status: "Completed",
  },
  {
    id: "#ORD-9923",
    partner: "Maria Garcia",
    time: "11:15 AM",
    distance: "6.5 km",
    fee: "$12.00",
    status: "In Progress",
  },
  {
    id: "#ORD-9924",
    partner: "James Bond",
    time: "11:20 AM",
    distance: "1.8 km",
    fee: "$4.50",
    status: "Completed",
  },
];

export default function DeliverySummaryPage() {
  const { t } = useTranslation();

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
          title={t("delivery_summary_report")}
          desc={t("comprehensive_list")}
        />
      </motion.div>
      <Card className="mt-10">
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-6 py-4 font-medium">{t("order_id")}</th>
                <th className="px-6 py-4 font-medium">{t("partner")}</th>
                <th className="px-6 py-4 font-medium">{t("time")}</th>
                <th className="px-6 py-4 font-medium">{t("distance")}</th>
                <th className="px-6 py-4 font-medium">{t("fee")}</th>
                <th className="px-6 py-4 font-medium">{t("status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deliveries.map((d) => (
                <tr
                  key={d.id}
                  className="bg-card hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono">{d.id}</td>
                  <td className="px-6 py-4 font-medium">{d.partner}</td>
                  <td className="px-6 py-4">{d.time}</td>
                  <td className="px-6 py-4">{d.distance}</td>
                  <td className="px-6 py-4">{d.fee}</td>
                  <td className="px-6 py-4">
                    <CustomBadge
                      variant={d.status === "Completed" ? "success" : "warning"}
                    >
                      {d.status}
                    </CustomBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
