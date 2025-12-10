"use client";

import { CustomInput } from "@/components/CustomInput/CustomInput";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";

const activityLogs = [
  {
    id: 1,
    user: "Sarah Connor",
    action: "Updated Zone Radius",
    target: "Downtown",
    time: "10:45 AM",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    user: "John Smith",
    action: "Approved New Partner",
    target: "Partner #4452",
    time: "09:30 AM",
    ip: "192.168.1.2",
  },
  {
    id: 3,
    user: "System",
    action: "Surge Pricing Activated",
    target: "Financial District",
    time: "08:00 AM",
    ip: "127.0.0.1",
  },
  {
    id: 4,
    user: "Emily Chen",
    action: "Resolved Ticket",
    target: "Ticket #998",
    time: "Yesterday",
    ip: "192.168.1.3",
  },
];

export default function ActivityLogsPage() {
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
        <h1 className="text-2xl font-bold text-[#DC3173]">Activity Logs</h1>
        <p className="text-gray-500 mt-1">
          Audit trail of all administrative actions taken within the system
        </p>
      </motion.div>
      <div className="flex items-center gap-4 mb-6 mt-10">
        <div className="w-72">
          <CustomInput
            placeholder="Search logs..."
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <button className="p-2 border border-input rounded-md hover:bg-accent">
          <Filter className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Target</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {activityLogs.map((log) => (
                <tr
                  key={log.id}
                  className="bg-card hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{log.user}</td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {log.target}
                  </td>
                  <td className="px-6 py-4">{log.time}</td>
                  <td className="px-6 py-4 font-mono text-xs">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
