"use client";

import { CustomSelect } from "@/components/CustomInput/CustomSelect";
import { Map } from "@/components/Map/Map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { RotateCcw, Save } from "lucide-react";

export default function ZoneRadiusPage() {
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
          Adjust Zone Radius
        </h1>
        <p className="text-gray-500 mt-1">
          Modify geographical boundaries for existing operational zones
        </p>
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-4 mt-10">
        <div className="lg:col-span-3 h-[600px]">
          <Map className="h-full w-full" />
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Select Zone</h3>
              <CustomSelect
                options={[
                  {
                    value: "1",
                    label: "Downtown",
                  },
                  {
                    value: "2",
                    label: "North Suburbs",
                  },
                  {
                    value: "3",
                    label: "West End",
                  },
                ]}
              />

              <div className="p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
                <p>
                  Drag the white markers on the map to adjust the zone
                  boundaries. Changes will affect new orders immediately after
                  saving.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" className="w-full">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Original
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
