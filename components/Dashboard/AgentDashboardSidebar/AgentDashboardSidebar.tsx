"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  BadgeEuro,
  Bike,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileBarChart,
  Home,
  LayoutDashboard,
  Map,
  Menu,
  MessageSquare,
  Package,
  Settings,
  UserCog,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import TopbarIcons from "@/components/Dashboard/AgentTopbar/TopbarIcons";
import { useTranslation } from "@/hooks/use-translation";
import { TFleetManager } from "@/types/fleet-manager.type";
import Image from "next/image";

interface IProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  agent?: TFleetManager;
}

const PRIMARY = "#DC3173";

export default function Sidebar({ open, setOpen, agent }: IProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const MENU = [
    {
      id: "home",
      title: t("home"),
      icon: <Home size={18} />,
      path: "/",
    },
    {
      id: "dashboard",
      title: t("dashboard"),
      icon: <LayoutDashboard size={18} />,
      path: "/agent/dashboard",
    },

    {
      id: "delivery-partners",
      title: t("delivery_partners_management"),
      icon: <Bike size={18} />,
      items: [
        { name: t("all_delivery_partners"), path: "/agent/delivery-partners" },
        {
          name: t("add_new_delivery_partner"),
          path: "/agent/add-delivery-partner",
        },
        {
          name: t("pending_verification"),
          path: "/agent/pending-verification",
        },
        {
          name: t("active_delivery_partners"),
          path: "/agent/active-delivery-partners",
        },
        {
          name: t("suspended_delivery_partners"),
          path: "/agent/suspended-delivery-partners",
        },
        {
          name: t("rejected_delivery_partners"),
          path: "/agent/rejected-delivery-partners",
        },
        {
          name: t("delivery_partner_performance"),
          path: "/agent/delivery-partner-performance",
        },
        {
          name: t("delivery_partner_reviews"),
          path: "/agent/delivery-partner-reviews",
        },
      ],
    },

    {
      id: "orders",
      title: t("orders_nd_deliveries"),
      icon: <Package size={18} />,
      items: [
        { name: t("all_deliveries"), path: "/agent/all-deliveries" },
        { name: t("pending_pickup"), path: "/agent/pending-pickup" },
        { name: t("on_the_way"), path: "/agent/on-the-way" },
        { name: t("delivered"), path: "/agent/delivered" },
        {
          name: t("cancelled_deliveries"),
          path: "/agent/cancelled-deliveries",
        },
      ],
    },

    {
      id: "payments",
      title: t("payments_nd_earnings"),
      icon: <BadgeEuro size={18} />,
      items: [
        {
          name: t("fleet_earnings_overview"),
          path: "/agent/earnings-overview",
        },
        {
          name: t("delivery_partner_payouts"),
          path: "/agent/delivery-partner-payouts",
        },
        { name: t("payment_history"), path: "/agent/payment-history" },
        { name: t("transaction_details"), path: "/agent/transaction-details" },
        { name: t("pending_settlements"), path: "/agent/pending-settlements" },
      ],
    },

    // {
    //   id: "zones",
    //   title: t("delivery_zones"),
    //   icon: <Map size={18} />,
    //   items: [
    //     { name: t("active_zones"), path: "/agent/active-zones" },
    //     { name: t("add_new_zone"), path: "/agent/add-zone" },
    //     { name: t("zone_performance"), path: "/agent/zone-performance" },
    //     { name: t("heatmap_busy_zones"), path: "/agent/zones-heatmap" },
    //     { name: t("adjust_zone_radius"), path: "/agent/zone-radius" },
    //   ],
    // },

    {
      id: "settings",
      title: t("fleet_settings"),
      icon: <Settings size={18} />,
      items: [
        { name: t("payment_preferences"), path: "/agent/payment-preferences" },
      ],
    },

    {
      id: "support",
      title: t("support_nd_communication"),
      icon: <MessageSquare size={18} />,
      items: [
        { name: t("chat_with_support"), path: "/agent/chat-support" },
        { name: "Live Chat", path: "/agent/live-chat" },
        { name: t("report_an_issue"), path: "/agent/report-issue" },
      ],
    },

    {
      id: "emergency",
      title: t("emergency_sos"),
      icon: <AlertTriangle size={18} />,
      items: [
        {
          name: t("delivery_partner_emergency_alerts"),
          path: "/agent/delivery-partner-emergency-alerts",
        },
        { name: t("report_accident_incident"), path: "/agent/report-incident" },
        {
          name: t("live_delivery_partner_tracking"),
          path: "/agent/live-tracking",
        },
      ],
    },
  ];

  const currentMenuId = MENU.find((menu) =>
    menu.items?.some((item) => pathname.includes(item.path)),
  )?.id;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    ...(currentMenuId ? { [currentMenuId]: true } : {}),
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#DC3173] overflow-hidden shadow-md">
            <Image
              src="/deligoLogo.png"
              alt="DeliGo Logo"
              width={36}
              height={36}
              className="object-cover"
              unoptimized
            />
          </div>
          <h1 className="font-bold text-xl text-[#DC3173]">DeliGo</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0 relative z-1001">
          <TopbarIcons agent={agent} />
          <button onClick={() => setMobileOpen(true)}>
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: open ? 280 : 80 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="hidden md:flex h-screen bg-linear-to-b from-pink-50 via-white to-pink-100 shadow-xl flex-col border-r border-pink-200 overflow-hidden fixed left-0 top-0 z-40"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-pink-200">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: open ? 0 : 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-white font-bold shadow-lg overflow-hidden"
              style={{ background: PRIMARY }}
            >
              <Image
                src="/deligoLogo.png"
                alt="DeliGo Logo"
                width={40}
                height={40}
                className="object-cover"
                unoptimized
              />
            </motion.div>
            {open && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl text-[#DC3173] transition-opacity duration-300"
              >
                DeliGo Fleet Manager
              </motion.h1>
            )}
          </div>

          <button
            onClick={() => setOpen && setOpen(!open)}
            className="p-2 rounded-lg hover:bg-pink-100 transition-colors"
          >
            {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto no-scrollbar">
          {MENU.map((menu) => (
            <div key={menu.id} className="mb-1">
              {menu.path ? (
                <Link
                  href={menu.path}
                  className={`flex items-center w-full justify-between p-2 rounded-lg transition-colors ${pathname === menu.path
                    ? "bg-linear-to-r from-pink-200 to-pink-100 text-pink-700 font-semibold"
                    : "hover:bg-pink-100"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-pink-600">{menu.icon}</div>
                    {open && (
                      <span className="font-medium text-gray-700 text-left">
                        {menu.title}
                      </span>
                    )}
                  </div>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpand(menu.id)}
                    className="flex items-center w-full justify-between p-2 rounded-lg hover:bg-pink-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-pink-600">{menu.icon}</div>
                      {open && (
                        <span className="font-medium text-gray-700 text-left">
                          {menu.title}
                        </span>
                      )}
                    </div>
                    {menu.items && open && (
                      <motion.div
                        animate={{ rotate: expanded[menu.id] ? 180 : 0 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    )}
                  </button>

                  <AnimatePresence>
                    {expanded[menu.id] && open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-9 mt-1 flex flex-col gap-1"
                      >
                        {menu.items?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.path}
                            className={`text-sm px-2 py-1 rounded-md transition-all duration-300 ${pathname === sub.path
                              ? "bg-linear-to-r from-pink-200 to-pink-100 text-pink-700 font-semibold"
                              : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                              }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          ))}
        </nav>

        {open && (
          <div className="border-t border-pink-200 py-3 px-3 text-center text-xs text-gray-500">
            © 2025 <span style={{ color: PRIMARY }}>Fleet Manager</span>{" "}
            Dashboard
          </div>
        )}
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden flex"
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white w-72 h-full p-4 shadow-xl overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: PRIMARY }}>
                  DeliGo Menu
                </h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-600"
                >
                  <X size={22} />
                </button>
              </div>

              {MENU.map((menu) => (
                <div key={menu.id} className="mb-2">
                  {menu.path ? (
                    <Link
                      href={menu.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 py-2 ${pathname === menu.path
                        ? "text-pink-700 font-semibold"
                        : "text-gray-800 hover:text-pink-600"
                        }`}
                    >
                      <div className="text-pink-600">{menu.icon}</div>
                      <span className="text-left">{menu.title}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleExpand(menu.id)}
                        className="flex items-center justify-between w-full py-2 text-gray-800 font-medium"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-pink-600">{menu.icon}</div>
                          <span className="text-left">{menu.title}</span>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${expanded[menu.id] ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expanded[menu.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-8 mt-1 flex flex-col gap-1"
                          >
                            {menu.items?.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.path}
                                onClick={() => setMobileOpen(false)}
                                className={`text-sm py-1 transition-all ${pathname === sub.path
                                  ? "text-pink-700 font-semibold"
                                  : "text-gray-600 hover:text-pink-600"
                                  }`}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
