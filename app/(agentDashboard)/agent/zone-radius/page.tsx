"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomSelect } from "@/components/CustomInput/CustomSelect";
import { Map } from "@/components/Map/Map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { RotateCcw, Save } from "lucide-react";

export default function ZoneRadiusPage() {
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
          title={t("adjust_zone_radius")}
          desc={t("modify_geographical_boundaries")}
        />
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-4 mt-10">
        <div className="lg:col-span-3 h-[600px]">
          <Map className="h-full w-full" />
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">{t("select_zone")}</h3>
              <CustomSelect
                options={[
                  {
                    value: "1",
                    label: t("downtown"),
                  },
                  {
                    value: "2",
                    label: t("north_suburbs"),
                  },
                  {
                    value: "3",
                    label: t("west_end"),
                  },
                ]}
              />

              <div className="p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
                <p>
                  {t("drag_white_markers_on_the_map")}
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {t("save_changes")}
                </Button>
                <Button variant="outline" className="w-full">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {t("reset_original")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
