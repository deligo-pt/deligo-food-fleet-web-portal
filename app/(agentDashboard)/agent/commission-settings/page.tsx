"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { Switch } from "@/components/Switch/Switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Euro, Save } from "lucide-react";

export default function CommissionSettingsPage() {
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
          title={t("commission_settings")}
          desc={t("configure_partner_payouts")}
        />
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>{t("base_rates")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomInput
              label={t("base_per_delivery_rate")}
              type="number"
              placeholder="4.50"
              icon={<Euro className="h-4 w-4" />}
            />
            <CustomInput
              label={t("distance_rate")}
              type="number"
              placeholder="0.85"
              icon={<Euro className="h-4 w-4" />}
            />
            <CustomInput
              label={t("minimum_guarantee")}
              type="number"
              placeholder="8.00"
              icon={<Euro className="h-4 w-4" />}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("multipliers_tips")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomInput
              label={t("peak_hour_multiplier")}
              type="number"
              placeholder="1.5"
            />
            <CustomInput
              label={t("rain_bad_weather_multiplier")}
              type="number"
              placeholder="1.2"
            />

            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    {t("enable_customer_tips")}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {t("allow_customers_tip_partners")}
                  </p>
                </div>
                <Switch checked={true} onCheckedChange={() => { }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    100% {t("tips_to_partner")}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {t("platform_takes_commission")}
                  </p>
                </div>
                <Switch checked={true} onCheckedChange={() => { }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="bg-[#DC3173] hover:bg-[#DC3173]/90" size="lg">
          <Save className="mr-2 h-4 w-4" />
          {t("save_changes")}
        </Button>
      </div>
    </div>
  );
}
