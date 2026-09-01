/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import FleetEarningsCard from "@/components/common/FleetEarningsCard/FleetEarningsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import {
    Euro,
    TrendingUp,
    Users,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const EarningsOverview = ({ earnings }: { earnings: any }) => {
    const { t } = useTranslation();

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
                    title={t("fleet_earnings_overview")}
                    desc={t("overview_fleet_financial")}
                />
            </motion.div>

            {/* KPI Cards */}
            <div className="mt-10 mb-6">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 1 * 0.1,
                    }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 "
                >
                    <FleetEarningsCard
                        Icon={Euro}
                        color="text-green-600"
                        bgColor="bg-green-100"
                        title={t("total_earnings")}
                        value={earnings?.overview?.totalRevenue?.toFixed(2) || "€0.00"}
                    />
                    <FleetEarningsCard
                        Icon={TrendingUp}
                        color="text-[#DC3173]"
                        bgColor="bg-[#DC3173]/10"
                        title={t("monthly_earnings")}
                        value={earnings?.overview?.monthlyEarnings?.toFixed(2) || "€0.00"}
                    />
                    <FleetEarningsCard
                        Icon={Users}
                        color="text-blue-600"
                        bgColor="bg-blue-100"
                        title={t("weekly_earnings")}
                        value={earnings?.overview?.weeklyEarnings?.toFixed(2) || "€0.00"}
                    />
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="">
                <motion.div
                    className="lg:col-span-2"
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        delay: 0.4,
                    }}
                >
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{t("revenue_trend")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {earnings?.graph?.length === 0 ? (
                                <p className="text-center italic text-gray-500">
                                    {t("no_earnings_to_show")}
                                </p>
                            ) : <div className="h-75 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={earnings?.graph || []}>
                                        <defs>
                                            <linearGradient
                                                id="colorEarnings"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#DC3173"
                                                    stopOpacity={0.2}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#DC3173"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#f0f0f0"
                                        />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: "#6b7280",
                                                fontSize: 12,
                                            }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: "#6b7280",
                                                fontSize: 12,
                                            }}
                                            tickFormatter={(value) => `€${value}`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "8px",
                                                border: "none",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="earnings"
                                            stroke="#DC3173"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorEarnings)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>}
                        </CardContent>
                    </Card >
                </motion.div >
            </div >
        </div >
    );
};

export default EarningsOverview;
