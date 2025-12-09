"use client";

import { CustomInput } from "@/components/CustomInput/CustomInput";
import { CustomSelect } from "@/components/CustomInput/CustomSelect";
import { Map } from "@/components/Map/Map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";

export default function AddNewZonePage() {
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
        <h1 className="text-2xl font-bold text-[#DC3173]">Add New Zone</h1>
        <p className="text-gray-500 mt-1">
          Define a new operational area by drawing boundaries on the map
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3 mt-10">
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-[600px] overflow-hidden p-0">
            <Map className="h-full w-full rounded-none border-0" />
          </Card>
          <p className="text-sm text-muted-foreground">
            Click on the map to place boundary points. Connect the last point to
            the first to close the polygon.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-lg">Zone Details</h3>

              <CustomInput label="Zone Name" placeholder="e.g. Downtown Core" />

              <CustomSelect
                label="Priority Level"
                options={[
                  {
                    value: "high",
                    label: "High Priority",
                  },
                  {
                    value: "medium",
                    label: "Medium Priority",
                  },
                  {
                    value: "low",
                    label: "Low Priority",
                  },
                ]}
              />

              <div className="grid grid-cols-2 gap-4">
                <CustomInput
                  label="Base Fee ($)"
                  type="number"
                  placeholder="2.50"
                />
                <CustomInput
                  label="Min Order ($)"
                  type="number"
                  placeholder="10.00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Surge Multiplier</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    className="w-full accent-primary"
                  />
                  <span className="font-bold w-12 text-right">1.0x</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Zone
                </Button>
                <Button variant="outline" className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
