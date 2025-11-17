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

import Image from "next/image";

const PRIMARY = "#DC3173";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  const MENU = [
    {
      id: "home",
      title: "Home",
      icon: <Home size={18} />,
      path: "/",
    },
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <Home size={18} />,
      items: [
        { name: "Overview", path: "/agent/overview" },
        { name: "Active Riders", path: "/agent/active-riders" },
        { name: "Pending Deliveries", path: "/agent/pending-deliveries" },
        { name: "Earnings Summary", path: "/agent/earnings-summary" },
        { name: "Alerts & Notifications", path: "/agent/alerts-notifications" },
      ],
    },

    {
      id: "riders",
      title: "Riders Management",
      icon: <Bike size={18} />,
      items: [
        { name: "All Riders", path: "/agent/all-riders" },
        { name: "Add New Rider", path: "/agent/add-rider" },
        { name: "Pending Verification", path: "/agent/pending-verification" },
        { name: "Active Riders", path: "/agent/active-riders-" },
        { name: "Suspended Riders", path: "/agent/suspended-riders" },
        { name: "Rider Performance", path: "/agent/rider-performance" },
        { name: "Rider Documents", path: "/agent/rider-documents" },
        { name: "Rider Reviews", path: "/agent/rider-reviews" },
      ],
    },

    {
      id: "orders",
      title: "Orders & Deliveries",
      icon: <Package size={18} />,
      items: [
        { name: "All Deliveries", path: "/agent/all-deliveries" },
        { name: "Pending Pickup", path: "/agent/pending-pickup" },
        { name: "On the Way", path: "/agent/on-the-way" },
        { name: "Delivered", path: "/agent/delivered" },
        { name: "Cancelled Deliveries", path: "/agent/cancelled-deliveries" },
        { name: "Delivery History", path: "/agent/delivery-history" },
        { name: "Manual Assign Orders", path: "/agent/manual-assign-orders" },
      ],
    },

    {
      id: "payments",
      title: "Payments & Earnings",
      icon: <BadgeEuro size={18} />,
      items: [
        { name: "Fleet Earnings Overview", path: "/agent/earnings-overview" },
        { name: "Rider Payouts", path: "/agent/rider-payouts" },
        { name: "Payment History", path: "/agent/payment-history" },
        { name: "Transaction Details", path: "/agent/transaction-details" },
        { name: "Pending Settlements", path: "/agent/pending-settlements" },
      ],
    },

    {
      id: "zones",
      title: "Delivery Zones",
      icon: <Map size={18} />,
      items: [
        { name: "Active Zones", path: "/agent/active-zones" },
        { name: "Add New Zone", path: "/agent/add-zone" },
        { name: "Zone Performance", path: "/agent/zone-performance" },
        { name: "Heatmap (Busy Zones)", path: "/agent/zones-heatmap" },
        { name: "Adjust Zone Radius", path: "/agent/zone-radius" },
      ],
    },

    {
      id: "settings",
      title: "Fleet Settings",
      icon: <Settings size={18} />,
      items: [
        { name: "Fleet Profile", path: "/agent/fleet-profile" },
        { name: "Vehicle Types", path: "/agent/vehicle-types" },
        { name: "Operating Hours", path: "/agent/operating-hours" },
        { name: "Commission Settings", path: "/agent/commission-settings" },
        { name: "Payment Preferences", path: "/agent/payment-preferences" },
        {
          name: "Notification Preferences",
          path: "/agent/notification-preferences",
        },
      ],
    },

    {
      id: "team",
      title: "Team Management",
      icon: <UserCog size={18} />,
      items: [
        { name: "All Team Members", path: "/agent/team-members" },
        { name: "Roles & Permissions", path: "/agent/roles-permissions" },
        { name: "Activity Logs", path: "/agent/activity-logs" },
      ],
    },

    {
      id: "reports",
      title: "Reports & Analytics",
      icon: <FileBarChart size={18} />,
      items: [
        {
          name: "Rider Performance Report",
          path: "/agent/report-rider-performance",
        },
        { name: "Earnings Report", path: "/agent/report-earnings" },
        { name: "Delivery Summary", path: "/agent/report-delivery-summary" },
        { name: "Monthly Report", path: "/agent/report-monthly" },
        { name: "Custom Report Builder", path: "/agent/report-custom" },
      ],
    },

    {
      id: "support",
      title: "Support & Communication",
      icon: <MessageSquare size={18} />,
      items: [
        { name: "Support Tickets", path: "/agent/support-tickets" },
        { name: "Rider Chat", path: "/agent/rider-chat" },
        { name: "Report an Issue", path: "/agent/report-issue" },
        { name: "Help Center", path: "/agent/help-center" },
      ],
    },

    {
      id: "emergency",
      title: "Emergency / SOS",
      icon: <AlertTriangle size={18} />,
      items: [
        {
          name: "Rider Emergency Alerts",
          path: "/agent/rider-emergency-alerts",
        },
        { name: "Contact Admin", path: "/agent/contact-admin" },
        { name: "Report Accident / Incident", path: "/agent/report-incident" },
        { name: "Live Rider Tracking", path: "/agent/live-tracking" },
      ],
    },
  ];

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
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={24} className="text-gray-700" />
        </button>
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
            onClick={() => setOpen(!open)}
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
                  className={`flex items-center w-full justify-between p-2 rounded-lg transition-colors ${
                    pathname === menu.path
                      ? "bg-linear-to-r from-pink-200 to-pink-100 text-pink-700 font-semibold"
                      : "hover:bg-pink-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-pink-600">{menu.icon}</div>
                    {open && (
                      <span className="font-medium text-gray-700">
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
                        <span className="font-medium text-gray-700">
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
                            className={`text-sm px-2 py-1 rounded-md transition-all duration-300 ${
                              pathname === sub.path
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
                      className={`flex items-center gap-2 py-2 ${
                        pathname === menu.path
                          ? "text-pink-700 font-semibold"
                          : "text-gray-800 hover:text-pink-600"
                      }`}
                    >
                      <div className="text-pink-600">{menu.icon}</div>
                      <span>{menu.title}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleExpand(menu.id)}
                        className="flex items-center justify-between w-full py-2 text-gray-800 font-medium"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-pink-600">{menu.icon}</div>
                          <span>{menu.title}</span>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            expanded[menu.id] ? "rotate-180" : ""
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
                                className={`text-sm py-1 transition-all ${
                                  pathname === sub.path
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
