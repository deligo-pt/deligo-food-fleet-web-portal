"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";

export default function MonthlyReportPage() {
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
        <h1 className="text-2xl font-bold text-[#DC3173]">{t("monthly_report")}</h1>
        <p className="text-gray-500 mt-1">
          {t("aggregate_kpis_performance_metrics")}
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3 mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              {t("total_revenue")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$124,500</div>
            <p className="text-green-600 mt-2">+15% {t("vs")} {t("last_month")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              {t("total_deliveries")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">15,240</div>
            <p className="text-green-600 mt-2">+8% {t("vs")} {t("last_month")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              {t("active_partners")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">845</div>
            <p className="text-green-600 mt-2">+12 {t("new_this_month")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
