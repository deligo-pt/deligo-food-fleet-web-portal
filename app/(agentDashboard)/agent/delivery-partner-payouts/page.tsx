"use client";

import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Filter, Search } from "lucide-react";
import { useState } from "react";

interface IPartner {
  id: string;
  name: string;
  earnings: number;
  trips: number;
  status: "ready" | "processing" | "hold";
  lastPayout: string;
}

const mockPartners: IPartner[] = [
  {
    id: "P001",
    name: "Alex Johnson",
    earnings: 1250.5,
    trips: 45,
    status: "ready",
    lastPayout: "2023-10-15",
  },
  {
    id: "P002",
    name: "Sarah Williams",
    earnings: 980.0,
    trips: 32,
    status: "processing",
    lastPayout: "2023-10-15",
  },
  {
    id: "P003",
    name: "Michael Brown",
    earnings: 2100.75,
    trips: 89,
    status: "ready",
    lastPayout: "2023-10-14",
  },
  {
    id: "P004",
    name: "Emily Davis",
    earnings: 450.25,
    trips: 15,
    status: "hold",
    lastPayout: "2023-10-10",
  },
  {
    id: "P005",
    name: "David Wilson",
    earnings: 1675.0,
    trips: 62,
    status: "ready",
    lastPayout: "2023-10-15",
  },
];

export default function PartnerPayoutsPage() {
  const [cycle, setCycle] = useState("Weekly");

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
        <h1 className="text-2xl font-bold text-[#DC3173]">Partner Payouts</h1>
        <p className="text-gray-500 mt-1">
          Manage and process delivery partner payments
        </p>
      </motion.div>

      <Card className="mt-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#DC3173] focus:border-[#DC3173] block w-full p-2.5 pr-8"
              >
                <option>Weekly Cycle</option>
                <option>Bi-Weekly Cycle</option>
                <option>Monthly Cycle</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-sm text-gray-500">
              Total Due:{" "}
              <span className="font-bold text-gray-900">{6456.5}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <CustomInput
              placeholder="Search partners..."
              className="w-64"
              icon={<Search className="w-4 h-4" />}
            />
            <Button variant="secondary" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Partner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trips
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Earnings Due
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Payout
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {mockPartners.map((partner, index) => (
                    <motion.tr
                      key={partner.id}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -10,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      className="bg-white border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#DC3173] font-bold text-xs">
                            {partner.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div>{partner.name}</div>
                            <div className="text-xs text-gray-400">
                              {partner.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{partner.trips}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {partner.earnings}
                      </td>
                      <td className="px-6 py-4">
                        <CustomBadge
                          variant={
                            partner.status === "ready"
                              ? "success"
                              : partner.status === "processing"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {partner.status}
                        </CustomBadge>
                      </td>
                      <td className="px-6 py-4">{partner.lastPayout}</td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#DC3173] hover:text-[#DC3173] hover:bg-[#DC3173]/10"
                        >
                          Pay Now
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
