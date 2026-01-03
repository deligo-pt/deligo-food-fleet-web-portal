"use client";

import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Mail, MoreVertical, Search } from "lucide-react";

export const teamMembers = [
  {
    id: 1,
    name: "Sarah Connor",
    role: "Super Admin",
    email: "sarah@fleet.com",
    lastLogin: "2 mins ago",
    status: "Online",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Fleet Manager",
    email: "john@fleet.com",
    lastLogin: "1 hour ago",
    status: "Offline",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Zone Supervisor",
    email: "emily@fleet.com",
    lastLogin: "5 hours ago",
    status: "Online",
  },
  {
    id: 4,
    name: "Mike Ross",
    role: "Support Agent",
    email: "mike@fleet.com",
    lastLogin: "1 day ago",
    status: "Offline",
  },
];

export default function AllTeamMembersPage() {
  const { t } = useTranslation();

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
        <h1 className="text-2xl font-bold text-[#DC3173]">{t("team_members")}</h1>
        <p className="text-gray-500 mt-1">
          {t("manage_administrative_staff")}
        </p>
      </motion.div>

      <div className="flex items-center gap-4 mb-6 mt-10">
        <div className="w-72">
          <CustomInput
            placeholder="Search by name or email..."
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-6 py-4 font-medium">{t("name")}</th>
                <th className="px-6 py-4 font-medium">{t("role")}</th>
                <th className="px-6 py-4 font-medium">{t("status")}</th>
                <th className="px-6 py-4 font-medium">{t("last_login")}</th>
                <th className="px-6 py-4 font-medium text-right">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {teamMembers.map((member) => (
                <tr
                  key={member.id}
                  className="bg-card hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <CustomBadge variant="outline">{member.role}</CustomBadge>
                  </td>
                  <td className="px-6 py-4">
                    <CustomBadge
                      variant={
                        member.status === "Online" ? "success" : "secondary"
                      }
                    >
                      {member.status}
                    </CustomBadge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {member.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
