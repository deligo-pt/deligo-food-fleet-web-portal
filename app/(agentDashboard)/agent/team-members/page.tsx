"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import AllFilters from "@/components/Filtering/AllFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { getSortOptions } from "@/utils/sortOptions";
import { motion } from "framer-motion";
import { Mail, MoreVertical} from "lucide-react";

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
  const sortOptions = getSortOptions(t);

  return (
    <div>
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
        <DashboardPageHeader
          title={t("team_members")}
          desc={t("manage_administrative_staff")}
        />
      </motion.div>

      <AllFilters sortOptions={sortOptions} />

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
