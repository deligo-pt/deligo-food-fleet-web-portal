"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Info, Save } from "lucide-react";
import { useState } from "react";

const timeSlots = [
  "00:00 - 04:00",
  "04:00 - 08:00",
  "08:00 - 12:00",
  "12:00 - 16:00",
  "16:00 - 20:00",
  "20:00 - 24:00",
];

export default function OperatingHoursPage() {
  const { t } = useTranslation();

  const days = [
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
    t("saturday"),
    t("sunday"),
  ];


  const [schedule, setSchedule] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    days.forEach((day) => {
      initial[day] =
        day === "Sunday" ? ["12:00 - 16:00", "16:00 - 20:00"] : [...timeSlots];
    });
    return initial;
  });

  const toggleSlot = (day: string, slot: string) => {
    setSchedule((prev) => {
      const daySlots = prev[day] || [];
      if (daySlots.includes(slot)) {
        return {
          ...prev,
          [day]: daySlots.filter((s) => s !== slot),
        };
      } else {
        return {
          ...prev,
          [day]: [...daySlots, slot],
        };
      }
    });
  };

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
        <h1 className="text-2xl font-bold text-[#DC3173]">{t("operating_hours")}</h1>
        <p className="text-gray-500 mt-1">
          {t("configure_your_fleet_active")}
        </p>
      </motion.div>

      <Card className="mt-10">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Info className="w-4 h-4" />
            {t("click_time_slot_toggle")}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                <div className="p-4 font-medium text-gray-500 w-32 shrink-0">
                  {t("day")}
                </div>
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className="p-4 font-medium text-gray-500 text-center text-xs"
                  >
                    {slot}
                  </div>
                ))}
              </div>

              {/* Day Rows */}
              {days.map((day, index) => (
                <motion.div
                  key={day}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="grid grid-cols-7 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="p-4 font-medium text-gray-900 flex items-center w-32 shrink-0">
                    {day}
                  </div>
                  {timeSlots.map((slot) => {
                    const isActive = schedule[day]?.includes(slot);
                    return (
                      <div
                        key={`${day}-${slot}`}
                        className="p-2 flex items-center justify-center"
                      >
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() => toggleSlot(day, slot)}
                          className={cn(
                            "w-full h-10 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1",
                            isActive
                              ? "bg-[#DC3173] text-white shadow-md shadow-[#DC3173]/20"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          )}
                        >
                          {isActive && <Clock className="w-3 h-3" />}
                          {isActive ? "Active" : "Closed"}
                        </motion.button>
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-right">
        <Button size="lg" className="bg-[#DC3173] hover:bg-[#DC3173]/90">
          <Save className="w-4 h-4 mr-2" />
          {t("save_changes")}
        </Button>
      </div>
    </div>
  );
}
