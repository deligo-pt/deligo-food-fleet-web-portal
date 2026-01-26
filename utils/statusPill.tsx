import { useTranslation } from "@/hooks/use-translation";
import { OrderStatus } from "@/types/order-deliveries";
import { CheckCircle, XCircle, Clock, Truck, UserCheck, RefreshCcw, ChefHat, Package, Navigation } from "lucide-react";

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    className: string;
    Icon: React.ElementType;
  }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-gray-100 text-gray-700",
    Icon: Clock,
  },
  ACCEPTED: {
    label: "Accepted",
    className: "bg-blue-50 text-blue-700",
    Icon: CheckCircle,
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-50 text-red-600",
    Icon: XCircle,
  },
  AWAITING_PARTNER: {
    label: "Awaiting Partner",
    className: "bg-amber-50 text-amber-700",
    Icon: Clock,
  },
  DISPATCHING: {
    label: "Dispatching",
    className: "bg-indigo-50 text-indigo-700",
    Icon: Truck,
  },
  ASSIGNED: {
    label: "Assigned",
    className: "bg-cyan-50 text-cyan-700",
    Icon: UserCheck,
  },
  REASSIGNMENT_NEEDED: {
    label: "Reassignment Needed",
    className: "bg-orange-50 text-orange-700",
    Icon: RefreshCcw,
  },
  PREPARING: {
    label: "Preparing",
    className: "bg-purple-50 text-purple-700",
    Icon: ChefHat,
  },
  READY_FOR_PICKUP: {
    label: "Ready For Pickup",
    className: "bg-teal-50 text-teal-700",
    Icon: Package,
  },
  PICKED_UP: {
    label: "Picked Up",
    className: "bg-sky-50 text-sky-700",
    Icon: Truck,
  },
  ON_THE_WAY: {
    label: "On The Way",
    className: "bg-blue-50 text-blue-700",
    Icon: Navigation,
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-green-50 text-green-700",
    Icon: CheckCircle,
  },
  CANCELED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600",
    Icon: XCircle,
  },
};

export function StatusPill({ s }: { s: OrderStatus }) {
  const { t } = useTranslation();
  const config = statusConfig[s];

  if (!config) return null;

  const { Icon, className, label } = config;

  return (
    <span
      className={`px-2 py-1 text-xs rounded-md flex items-center gap-1 ${className}`}
    >
      <Icon size={12} />
      {t(label)}
    </span>
  );
}
