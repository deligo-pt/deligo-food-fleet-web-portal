"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const performanceData = [
  { name: "Mon", orders: 120, revenue: 2400 },
  { name: "Tue", orders: 132, revenue: 2640 },
  { name: "Wed", orders: 101, revenue: 2020 },
  { name: "Thu", orders: 134, revenue: 2680 },
  { name: "Fri", orders: 190, revenue: 3800 },
  { name: "Sat", orders: 230, revenue: 4600 },
  { name: "Sun", orders: 210, revenue: 4200 },
];

export const earningsData = [
  { name: "Base Pay", value: 4500, fill: "#DC3173" },
  { name: "Distance Pay", value: 2300, fill: "#E87A9F" },
  { name: "Bonuses", value: 1200, fill: "#F2ABC6" },
  { name: "Tips", value: 800, fill: "#FCE7EF" },
];

export default function EarningsReportPage() {
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
          title={t("earnings_report")}
          desc={t("financial_breakdown_fleet_earnings")}
        />
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>{t("revenue_breakdown")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={earningsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {earningsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("daily_earnings_trend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#DC3173" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
