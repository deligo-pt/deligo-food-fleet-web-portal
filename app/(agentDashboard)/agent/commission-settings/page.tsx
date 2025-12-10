"use client";

import { CustomInput } from "@/components/CustomInput/CustomInput";
import { Switch } from "@/components/Switch/Switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Euro, Save } from "lucide-react";

export default function CommissionSettingsPage() {
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
          Commission Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Configure partner payouts, delivery fees, and surge multipliers
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Base Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomInput
              label="Base Per-Delivery Rate (€)"
              type="number"
              placeholder="4.50"
              icon={<Euro className="h-4 w-4" />}
            />
            <CustomInput
              label="Distance Rate (€ per km)"
              type="number"
              placeholder="0.85"
              icon={<Euro className="h-4 w-4" />}
            />
            <CustomInput
              label="Minimum Guarantee (€)"
              type="number"
              placeholder="8.00"
              icon={<Euro className="h-4 w-4" />}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Multipliers & Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomInput
              label="Peak Hour Multiplier (x)"
              type="number"
              placeholder="1.5"
            />
            <CustomInput
              label="Rain/Bad Weather Multiplier (x)"
              type="number"
              placeholder="1.2"
            />

            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Enable Customer Tips
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Allow customers to tip partners in-app
                  </p>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    100% Tips to Partner
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Platform takes no commission on tips
                  </p>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="bg-[#DC3173] hover:bg-[#DC3173]/90" size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
