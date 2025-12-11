"use client";

import { CustomInput } from "@/components/CustomInput/CustomInput";
import { CustomSelect } from "@/components/CustomInput/CustomSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Table } from "lucide-react";

export default function CustomReportBuilder() {
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
          Custom Report Builder
        </h1>
        <p className="text-gray-500 mt-1">
          Generate ad-hoc reports by selecting specific data sources and filters
        </p>
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-3 mt-10">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CustomSelect
                label="Data Source"
                options={[
                  {
                    value: "orders",
                    label: "Orders",
                  },
                  {
                    value: "partners",
                    label: "Partners",
                  },
                  {
                    value: "earnings",
                    label: "Earnings",
                  },
                ]}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomInput type="date" />
                  <CustomInput type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fields to Include</label>
                <div className="space-y-2 border border-input rounded-md p-3 max-h-40 overflow-y-auto">
                  {[
                    "Order ID",
                    "Date",
                    "Time",
                    "Partner Name",
                    "Zone",
                    "Amount",
                    "Status",
                  ].map((field) => (
                    <label
                      key={field}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-input text-primary focus:ring-primary"
                        defaultChecked
                      />
                      {field}
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full ">
                <Table className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full min-h-[500px] flex items-center justify-center border-dashed">
            <div className="text-center text-muted-foreground">
              <Table className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Select parameters and click Generate to view report preview</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
