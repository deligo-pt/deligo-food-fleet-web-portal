"use client";

import { CustomSelect } from "@/components/CustomInput/CustomSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { CreditCard, Save } from "lucide-react";

export default function PaymentPreferencesPage() {
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
          {t("payment_preference")}
        </h1>
        <p className="text-gray-500 mt-1">
          {t("manage_payout_gateways")}
        </p>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>{t("payout_configuration")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomSelect
              label={t("payment_gateway")}
              options={[
                {
                  value: "stripe",
                  label: t("stripe_connect"),
                },
                {
                  value: "paypal",
                  label: t("paypal_payouts"),
                },
                {
                  value: "bank",
                  label: t("direct_bank_transfer"),
                },
              ]}
            />

            <CustomSelect
              label={t("payout_frequency")}
              options={[
                {
                  value: "daily",
                  label: t("daily_automatic"),
                },
                {
                  value: "weekly",
                  label: t("weekly_every_monday"),
                },
                {
                  value: "monthly",
                  label: t("monthly_1st_month"),
                },
                {
                  value: "manual",
                  label: t("manual_request_only"),
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("tax_compliance")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomSelect
              label={t("tax_form_generation")}
              options={[
                {
                  value: "auto",
                  label: t("automated_1099_nec"),
                },
                {
                  value: "manual",
                  label: t("manual_upload"),
                },
              ]}
            />

            <div className="p-4 bg-secondary/50 rounded-lg flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">{t("connected_account")}</p>
                <p className="text-muted-foreground">
                  {t("stripe_connect_id")}: acct_123456789
                </p>
                <p className="text-green-600 font-medium mt-1">
                  {t("status")}: Verified
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-[#DC3173] hover:bg-[#DC3173]/90" size="lg">
            <Save className="mr-2 h-4 w-4" />
            {t("save_preferences")}
          </Button>
        </div>
      </div>
    </div>
  );
}
