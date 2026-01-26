"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { Map } from "@/components/Map/Map";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";

export default function ZonesHeatmapPage() {
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
          title={t("zone_heatmaps")}
          desc={t("real_time_visualization")}
        />
      </motion.div>
      <div className="relative h-[calc(100vh-12rem)] w-full rounded-xl overflow-hidden border border-border mt-10">
        <Map className="h-full w-full rounded-none" zoom={12} />

        <div className="absolute top-4 right-4 z-400 bg-card/90 backdrop-blur p-4 rounded-lg shadow-lg border border-border w-64 space-y-3">
          <h3 className="font-semibold text-sm">{t("density_legend")}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>{t("low_demand")}</span>
              <span>{t("high_demand")}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-linear-to-r from-green-400 via-yellow-400 to-red-500" />
          </div>
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span>{t("active_orders")}</span>
              <Badge>142</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
