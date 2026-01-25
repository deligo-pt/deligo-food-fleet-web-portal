"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const partners = [
  {
    id: "P-1001",
    name: "Alex Johnson",
    vehicle: "Car",
    rating: 4.9,
    deliveries: 1240,
    acceptance: "98%",
    status: "Online",
  },
  {
    id: "P-1002",
    name: "Sam Wilson",
    vehicle: "Bicycle",
    rating: 4.7,
    deliveries: 850,
    acceptance: "92%",
    status: "Busy",
  },
  {
    id: "P-1003",
    name: "Maria Garcia",
    vehicle: "Scooter",
    rating: 4.8,
    deliveries: 2100,
    acceptance: "95%",
    status: "Offline",
  },
  {
    id: "P-1004",
    name: "James Bond",
    vehicle: "Car",
    rating: 5.0,
    deliveries: 500,
    acceptance: "100%",
    status: "Online",
  },
];

export default function PartnerPerformancePage() {
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
          title={t("partner_performance")}
          desc={t("define_custom_roles")}
        />
      </motion.div>
      <Card className="mt-10">
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-6 py-4 font-medium">{t("partner_id")}</th>
                <th className="px-6 py-4 font-medium">{t("name")}</th>
                <th className="px-6 py-4 font-medium">{t("vehicle")}</th>
                <th className="px-6 py-4 font-medium">{t("rating")}</th>
                <th className="px-6 py-4 font-medium">{t("total_deliveries")}</th>
                <th className="px-6 py-4 font-medium">{t("acceptance_rate")}</th>
                <th className="px-6 py-4 font-medium">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {partners.map((partner) => (
                <tr
                  key={partner.id}
                  className="bg-card hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-xs">{partner.id}</td>
                  <td className="px-6 py-4 font-medium">{partner.name}</td>
                  <td className="px-6 py-4">{partner.vehicle}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {partner.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4">{partner.deliveries}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div
                        className="bg-[#DC3173] h-1.5 rounded-full"
                        style={{
                          width: partner.acceptance,
                        }}
                      />
                    </div>
                    <span className="text-xs mt-1 block">
                      {partner.acceptance}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <CustomBadge
                      variant={
                        partner.status === "Online"
                          ? "success"
                          : partner.status === "Busy"
                            ? "warning"
                            : "secondary"
                      }
                    >
                      {partner.status}
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
