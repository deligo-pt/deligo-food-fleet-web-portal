"use client";

import { Map } from "@/components/Map/Map";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function ZonesHeatmapPage() {
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
        <h1 className="text-2xl font-bold text-[#DC3173]">Zone Heatmaps</h1>
        <p className="text-gray-500 mt-1">
          Real-time visualization of order density and fleet coverage.
        </p>
      </motion.div>
      <div className="relative h-[calc(100vh-12rem)] w-full rounded-xl overflow-hidden border border-border mt-10">
        <Map className="h-full w-full rounded-none" zoom={12} />

        <div className="absolute top-4 right-4 z-[400] bg-card/90 backdrop-blur p-4 rounded-lg shadow-lg border border-border w-64 space-y-3">
          <h3 className="font-semibold text-sm">Density Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Low Demand</span>
              <span>High Demand</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" />
          </div>
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span>Active Orders</span>
              <Badge>142</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
