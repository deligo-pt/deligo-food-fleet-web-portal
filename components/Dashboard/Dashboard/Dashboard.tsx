"use client";

import DashboardHeader from "@/components/Dashboard/Dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Bike, CheckCircle, Clock, Users } from "lucide-react";
import TopDrivers from "./TopDrivers";
import { useTranslation } from "@/hooks/use-translation";
import { IDashboardAnalytics } from "@/types/dashboard.type";
import { IDeliveryPartnerCard } from "@/types/delivery-partner.type";

const VEHICLE_NAME_MAP: Record<string, string> = {
  MOTORBIKE: "Motorbike",
  BICYCLE: "Bicycle",
  CAR: "Car",
  VAN: "Van",
};


const vehicleData = [
  {
    name: "Bicycle",
    // value: 45,
    color: "#DC3173",
  },
  {
    name: "Motorbike",
    // value: 30,
    color: "#E87A9F",
  },
  {
    name: "Car",
    // value: 15,
    color: "#F2ABC6",
  },
  {
    name: "Van",
    // value: 10,
    color: "#FCE7EF",
  },
];

const Dashboard = ({ agentName, analytics }: { agentName: string, analytics: IDashboardAnalytics }) => {
  const { t } = useTranslation();
  const fleetChartData = vehicleData.map((item) => {
    const apiVehicle = analytics?.fleetComposition.find(
      (v) => VEHICLE_NAME_MAP[v.vehicle] === item.name
    )

    return {
      name: item.name,
      value: apiVehicle?.count ?? 0,
      color: item.color,
    }
  });


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeader agentName={agentName} />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("total_partners")}
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.cards?.totalPartners || 0}</div>
            <p className="text-xs text-muted-foreground">{t("across_all_zones")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("online_now")}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.cards?.onlineNow?.count || 0}</div>
            <p className="text-xs text-muted-foreground">{analytics?.cards?.onlineNow?.percentage || "0%"} {t("of_total_fleet")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("deliveries_today")}
            </CardTitle>
            <Bike className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.cards?.deliveriesToday?.total || 0}</div>
            <p className="text-xs text-muted-foreground">{t("avg")} {analytics?.cards?.deliveriesToday?.avgPerPartner || "0"} {t("per_partner")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("availabiity_rate")}
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.cards?.availabilityRate || "0"}</div>
            <p className="text-xs text-muted-foreground">{t("during_peak_hours")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("fleet_composition")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fleetChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {fleetChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
            <CardTitle>{t("partner_status")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  label: t("on_delivery"),
                  value: analytics?.partnerStatus?.onDelivery || 0,
                  color: "bg-primary",
                },
                {
                  label: t("waiting_for_order"),
                  value: analytics?.partnerStatus?.waiting || 0,
                  color: "bg-yellow-400",
                },
                {
                  label: t("offline"),
                  value: analytics?.partnerStatus?.offline || 0,
                  color: "bg-gray-200",
                },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div
        className="mt-6"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.8,
        }}
      >
        <TopDrivers deliveryPartners={analytics?.topRatedDrivers as IDeliveryPartnerCard[]} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
