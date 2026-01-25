"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import AllFilters from "@/components/Filtering/AllFilters";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { getSortOptions } from "@/utils/sortOptions";
import { motion } from "framer-motion";

const activityLogs = [
  {
    id: 1,
    user: "Sarah Connor",
    action: "Updated Zone Radius",
    target: "Downtown",
    time: "10:45 AM",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    user: "John Smith",
    action: "Approved New Partner",
    target: "Partner #4452",
    time: "09:30 AM",
    ip: "192.168.1.2",
  },
  {
    id: 3,
    user: "System",
    action: "Surge Pricing Activated",
    target: "Financial District",
    time: "08:00 AM",
    ip: "127.0.0.1",
  },
  {
    id: 4,
    user: "Emily Chen",
    action: "Resolved Ticket",
    target: "Ticket #998",
    time: "Yesterday",
    ip: "192.168.1.3",
  },
];

export default function ActivityLogsPage() {
  const { t } = useTranslation();
  const sortOptions = getSortOptions(t);

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
          title={t("activity_logs")}
          desc={t("audit_trail_all_administrative")}
        />
      </motion.div>

      <AllFilters sortOptions={sortOptions} />

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-6 py-4 font-medium">{t("user")}</th>
                <th className="px-6 py-4 font-medium">{t("actions")}</th>
                <th className="px-6 py-4 font-medium">{t("target")}</th>
                <th className="px-6 py-4 font-medium">{t("tiimestamp")}</th>
                <th className="px-6 py-4 font-medium">{t("ip_address")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {activityLogs.map((log) => (
                <tr
                  key={log.id}
                  className="bg-card hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{log.user}</td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {log.target}
                  </td>
                  <td className="px-6 py-4">{log.time}</td>
                  <td className="px-6 py-4 font-mono text-xs">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
