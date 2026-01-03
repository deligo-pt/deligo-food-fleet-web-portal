"use client";

import { Switch } from "@/components/Switch/Switch";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { AlertTriangle, Bell, Info } from "lucide-react";

export default function NotificationPreferencesPage() {
  const { t } = useTranslation();

  const notifications = [
    {
      category: t("critical_alerts"),
      icon: AlertTriangle,
      items: [
        {
          label: t("low_partner_coverage"),
          desc: t("alert_when_active"),
        },
        {
          label: t("high_cancellation_rate"),
          desc: t("alert_when_order"),
        },
        {
          label: t("system_outage"),
          desc: t("immediate_alert"),
        },
      ],
    },
    {
      category: t("operational_updates"),
      icon: Bell,
      items: [
        {
          label: t("new_partner_application"),
          desc: t("notify_when_new_partner"),
        },
        {
          label: t("zone_surge_activated"),
          desc: t("notify_when_automated"),
        },
        {
          label: t("negative_feedback"),
          desc: t("notify_when_partner_receives"),
        },
      ],
    },
    {
      category: t("system_info"),
      icon: Info,
      items: [
        {
          label: t("daily_smmmary_report"),
          desc: t("email_summmary_previous"),
        },
        {
          label: t("weekly_performance"),
          desc: t("weekly_digest_fleet"),
        },
      ],
    },
  ];

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
          {t("notification_preferences")}
        </h1>
        <p className="text-gray-500 mt-1">
          {t("configure_which_alerts_updates")}
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        {notifications.map((section, idx) => (
          <Card key={idx}>
            <div className="p-6 pb-2 flex items-center gap-2 border-b border-border/50 mb-2">
              <section.icon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{section.category}</h3>
            </div>
            <CardContent className="space-y-6 pt-0">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">{item.label}</label>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch checked={true} onCheckedChange={() => { }} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
