"use client";

import DashboardHeader from "@/components/Dashboard/Dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Bike, CheckCircle, Clock, Users } from "lucide-react";
import TopDrivers from "./TopDrivers";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { useTranslation } from "@/hooks/use-translation";


const vehicleData = [
  {
    name: "Bicycle",
    value: 45,
    color: "#DC3173",
  },
  {
    name: "Scooter",
    value: 30,
    color: "#E87A9F",
  },
  {
    name: "Car",
    value: 15,
    color: "#F2ABC6",
  },
  {
    name: "Van",
    value: 10,
    color: "#FCE7EF",
  },
];

const Dashboard = ({ agentName, deliveryPartners }: { agentName: string, deliveryPartners: TDeliveryPartner[] }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto">
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
            <div className="text-2xl font-bold">1,240</div>
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
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">28% {t("of_total_fleet")}</p>
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
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground">{t("avg")} 8.3 {t("per_partner")}</p>
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
            <div className="text-2xl font-bold">92%</div>
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
                    data={vehicleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vehicleData.map((entry, index) => (
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
                  value: 45,
                  color: "bg-primary",
                },
                {
                  label: t("waiting_for_order"),
                  value: 30,
                  color: "bg-yellow-400",
                },
                {
                  label: t("offline"),
                  value: 25,
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
        <TopDrivers deliveryPartners={deliveryPartners} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
