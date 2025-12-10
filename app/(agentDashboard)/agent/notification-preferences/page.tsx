"use client";

import { Switch } from "@/components/Switch/Switch";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, Bell, Info } from "lucide-react";

const notifications = [
  {
    category: "Critical Alerts",
    icon: AlertTriangle,
    items: [
      {
        label: "Low Partner Coverage",
        desc: "Alert when active partners drop below threshold in a zone",
      },
      {
        label: "High Cancellation Rate",
        desc: "Alert when order cancellations exceed 5% in an hour",
      },
      {
        label: "System Outage",
        desc: "Immediate alert for any system downtime",
      },
    ],
  },
  {
    category: "Operational Updates",
    icon: Bell,
    items: [
      {
        label: "New Partner Application",
        desc: "Notify when a new partner submits documents",
      },
      {
        label: "Zone Surge Activated",
        desc: "Notify when automated surge pricing kicks in",
      },
      {
        label: "Negative Feedback",
        desc: "Notify when a partner receives a 1-star rating",
      },
    ],
  },
  {
    category: "System Info",
    icon: Info,
    items: [
      {
        label: "Daily Summary Report",
        desc: "Email summary of previous day stats at 8am",
      },
      {
        label: "Weekly Performance",
        desc: "Weekly digest of fleet performance",
      },
    ],
  },
];

export default function NotificationPreferencesPage() {
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
          Notification Preferences
        </h1>
        <p className="text-gray-500 mt-1">
          Configure which alerts and updates you want to receive
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
                  <Switch checked={true} onCheckedChange={() => {}} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
