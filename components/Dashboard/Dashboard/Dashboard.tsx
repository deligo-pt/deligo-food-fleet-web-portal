"use client";

import DashboardHeader from "@/components/Dashboard/Dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Bike, CheckCircle, Clock, Users } from "lucide-react";
import TopDrivers from "./TopDrivers";
import { TDeliveryPartner } from "@/types/delivery-partner.type";


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
  return (
    <div className="max-w-7xl mx-auto">
      <DashboardHeader agentName={agentName} />
      {/* <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
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
          delay: 0.2,
        }}
      >
        <StatCard
          title="Total Vendors"
          value="124"
          description="Active food partners"
          icon={<StoreIcon />}
          color="#DC3173"
        />
        <StatCard
          title="Total Fleet Managers"
          value="18"
          description="Managing deliveries"
          icon={<TruckIcon />}
          color="#DC3173"
        />
        <StatCard
          title="Total Customers"
          value="2,456"
          description="Registered users"
          icon={<UsersIcon />}
          color="#DC3173"
        />
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6"
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
          delay: 0.4,
        }}
      >
        <StatusCard
          title="New Orders"
          value="28"
          icon={<ShoppingBagIcon />}
          color="#DC3173"
        />
        <StatusCard
          title="Processing"
          value="16"
          icon={<TrendingUpIcon />}
          color="#DC3173"
        />
        <StatusCard
          title="Completed"
          value="345"
          icon={<CheckCircleIcon />}
          color="#DC3173"
        />
        <StatusCard
          title="Cancelled"
          value="12"
          icon={<XCircleIcon />}
          color="#DC3173"
        />
      </motion.div>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"
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
          delay: 0.6,
        }}
      >
        <div className="lg:col-span-2">
          <PopularCategories />
        </div>
        <div>
          <RecentOrders />
        </div>
      </motion.div> */}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Partners
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-muted-foreground">Across all zones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Online Now
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">28% of total fleet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Deliveries Today
            </CardTitle>
            <Bike className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground">Avg 8.3 per partner</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Availability Rate
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">During peak hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fleet Composition</CardTitle>
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
            <CardTitle>Partner Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  label: "On Delivery",
                  value: 45,
                  color: "bg-primary",
                },
                {
                  label: "Waiting for Order",
                  value: 30,
                  color: "bg-yellow-400",
                },
                {
                  label: "Offline",
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
