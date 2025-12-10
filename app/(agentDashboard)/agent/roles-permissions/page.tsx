"use client";

import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";

const roles = [
  {
    name: "Super Admin",
    users: 2,
    desc: "Full access to all system features",
  },
  {
    name: "Fleet Manager",
    users: 5,
    desc: "Can manage zones, partners, and settings",
  },
  {
    name: "Zone Supervisor",
    users: 12,
    desc: "Can view reports and manage specific zones",
  },
  {
    name: "Support Agent",
    users: 8,
    desc: "Can view partner details and logs",
  },
];

const permissions = [
  "View Dashboard",
  "Manage Zones",
  "Edit Commission",
  "View Financials",
  "Manage Team",
  "Edit Fleet",
  "View Logs",
];

export default function RolesPermissionsPage() {
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
          Roles & Permissions
        </h1>
        <p className="text-gray-500 mt-1">
          Define custom roles and assign granular access controls
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3 mt-10">
        {/* Roles List */}
        <div className="space-y-4">
          {roles.map((role, idx) => (
            <Card
              key={idx}
              className={`cursor-pointer transition-all ${
                idx === 1
                  ? "ring-2 ring-[#DC3173]"
                  : "hover:border-[#DC3173]/50"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#DC3173]">{role.name}</h3>
                  <CustomBadge variant="success">
                    {role.users} Users
                  </CustomBadge>
                </div>
                <p className="text-sm text-muted-foreground">{role.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permission Matrix */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#DC3173]">
              <Shield className="h-5 w-5" />
              Permissions: Fleet Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {permissions.map((perm, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/20"
                >
                  <span className="text-sm font-medium">{perm}</span>
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center ${
                      idx < 5
                        ? "bg-[#DC3173] border-[#DC3173] text-white"
                        : "border-input bg-background"
                    }`}
                  >
                    {idx < 5 && <Check className="h-3 w-3" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="bg-[#DC3173] hover:bg-[#DC3173]/90">
                Save Permissions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
