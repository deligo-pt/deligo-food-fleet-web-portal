"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MonthlyReportPage() {
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
        <h1 className="text-2xl font-bold text-[#DC3173]">Monthly Report</h1>
        <p className="text-gray-500 mt-1">
          Aggregated KPIs and performance metrics for the entire month
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3 mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$124,500</div>
            <p className="text-green-600 mt-2">+15% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Total Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">15,240</div>
            <p className="text-green-600 mt-2">+8% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Active Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">845</div>
            <p className="text-green-600 mt-2">+12 New this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
