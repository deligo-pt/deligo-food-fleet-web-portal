"use client";

import { CustomSelect } from "@/components/CustomInput/CustomSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CreditCard, Save } from "lucide-react";

export default function PaymentPreferencesPage() {
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
          Payment Preferences
        </h1>
        <p className="text-gray-500 mt-1">
          Manage payout gateways and tax documentation settings
        </p>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Payout Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomSelect
              label="Payment Gateway"
              options={[
                {
                  value: "stripe",
                  label: "Stripe Connect",
                },
                {
                  value: "paypal",
                  label: "PayPal Payouts",
                },
                {
                  value: "bank",
                  label: "Direct Bank Transfer",
                },
              ]}
            />

            <CustomSelect
              label="Payout Frequency"
              options={[
                {
                  value: "daily",
                  label: "Daily (Automatic)",
                },
                {
                  value: "weekly",
                  label: "Weekly (Every Monday)",
                },
                {
                  value: "monthly",
                  label: "Monthly (1st of month)",
                },
                {
                  value: "manual",
                  label: "Manual Request Only",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax & Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomSelect
              label="Tax Form Generation"
              options={[
                {
                  value: "auto",
                  label: "Automated (1099-NEC)",
                },
                {
                  value: "manual",
                  label: "Manual Upload",
                },
              ]}
            />

            <div className="p-4 bg-secondary/50 rounded-lg flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Connected Account</p>
                <p className="text-muted-foreground">
                  Stripe Connect ID: acct_123456789
                </p>
                <p className="text-green-600 font-medium mt-1">
                  Status: Verified
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-[#DC3173] hover:bg-[#DC3173]/90" size="lg">
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
