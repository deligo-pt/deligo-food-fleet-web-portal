"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Bike, Car, Edit2, Trash2, Truck } from "lucide-react";

export default function VehicleTypesPage() {
  const { t } = useTranslation();

  const vehicles = [
    { id: 1, type: t("bicycle"), capacity: "Small", multiplier: 1.0, icon: Bike },
    { id: 2, type: t("scooter"), capacity: "Small", multiplier: 1.1, icon: Bike },
    { id: 3, type: t("car"), capacity: "Medium", multiplier: 1.5, icon: Car },
    { id: 4, type: t("van"), capacity: "Large", multiplier: 2.0, icon: Truck },
  ];

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
          title={t("vehicle_types")}
          desc={t("configure_available_vehicle")}
        />
      </motion.div>
      <Card className="mt-10">
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-6 py-4 font-medium">{t("vehicle_name")}</th>
                <th className="px-6 py-4 font-medium">{t("capacity_size")}</th>
                <th className="px-6 py-4 font-medium">{t("base_rate_multiplier")}</th>
                <th className="px-6 py-4 font-medium text-right">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="bg-card hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#DC3173] text-white">
                      <vehicle.icon className="h-4 w-4" />
                    </div>
                    {vehicle.type}
                  </td>
                  <td className="px-6 py-4">
                    <CustomBadge variant="secondary">
                      {vehicle.capacity}
                    </CustomBadge>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    {vehicle.multiplier.toFixed(1)}x
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
