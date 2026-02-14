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

const data = [
    {
        name: "Mon",
        earnings: 4000,
        payouts: 2400,
    },
    {
        name: "Tue",
        earnings: 3000,
        payouts: 1398,
    },
    {
        name: "Wed",
        earnings: 2000,
        payouts: 9800,
    },
    {
        name: "Thu",
        earnings: 2780,
        payouts: 3908,
    },
    {
        name: "Fri",
        earnings: 1890,
        payouts: 4800,
    },
    {
        name: "Sat",
        earnings: 2390,
        payouts: 3800,
    },
    {
        name: "Sun",
        earnings: 3490,
        payouts: 4300,
    },
];

const stats = [
    {
        title: "Total Earnings",
        value: 124592.0,
        change: "+12.5%",
        trend: "up",
        icon: Euro,
        color: "text-green-600",
        bg: "bg-green-100",
    },
    {
        title: "Monthly Earnings",
        value: 45231.89,
        change: "+8.2%",
        trend: "up",
        icon: TrendingUp,
        color: "text-[#DC3173]",
        bg: "bg-[#DC3173]/10",
    },
    {
        title: "Weekly Earnings",
        value: 1204,
        change: "-2.1%",
        trend: "down",
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-100",
    }
];

const EarningsOverview = () => {
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 mb-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: index * 0.1,
                        }}
                    >
                        <FleetEarningsCard
                            Icon={stat.icon}
                            color={stat.color}
                            bgColor={stat.bg}
                            trend={stat.trend}
                            change={stat.change}
                            title={stat.title}
                            value={stat.value}
                        />
                    </motion.div>
                ))}
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
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
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
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default EarningsOverview;
