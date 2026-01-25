"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { Switch } from "@/components/Switch/Switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users } from "lucide-react";

export const zones = [
  {
    id: 1,
    name: "Downtown",
    partners: 45,
    load: "High",
    status: "Active",
    surge: 1.5,
  },
  {
    id: 2,
    name: "North Suburbs",
    partners: 28,
    load: "Medium",
    status: "Active",
    surge: 1.0,
  },
  {
    id: 3,
    name: "West End",
    partners: 12,
    load: "Low",
    status: "Inactive",
    surge: 1.0,
  },
  {
    id: 4,
    name: "Financial District",
    partners: 55,
    load: "Very High",
    status: "Active",
    surge: 2.0,
  },
  {
    id: 5,
    name: "University Area",
    partners: 30,
    load: "Medium",
    status: "Active",
    surge: 1.2,
  },
];

export default function ActiveZonesPage() {
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
          title={t("active_zones")}
          desc={t("manage_your_operational_zones")}
        />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {zones.map((zone) => (
          <Card key={zone.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">{zone.name}</CardTitle>
              <CustomBadge
                variant={zone.status === "Active" ? "success" : "secondary"}
              >
                {zone.status}
              </CustomBadge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {t("partners")}
                  </div>
                  <span className="font-bold">{zone.partners}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {t("load")}
                  </div>
                  <CustomBadge
                    variant={
                      zone.load === "Very High"
                        ? "destructive"
                        : zone.load === "High"
                          ? "warning"
                          : "secondary"
                    }
                  >
                    {zone.load}
                  </CustomBadge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {t("surge")}
                  </div>
                  <span className="font-bold text-primary">{zone.surge}x</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-4 mt-2">
                <span className="text-sm font-medium">{t("zone_status")}</span>
                <Switch
                  checked={zone.status === "Active"}
                  onCheckedChange={() => { }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    // </PageContainer>
  );
}
