import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/utils/formatPrice";
import { format } from "date-fns";
import {
    CalendarIcon,
    CheckCircleIcon,
    CheckLine,
    EuroIcon,
    HashIcon,
    UserIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TOrder } from "@/types/order-deliveries";
import { Column } from "@/components/common/ReusableTable/ReusableTable";

type TFunction = (key: string) => string;

interface GetOrderColumnsParams {
    t: TFunction;
    isSelectMode?: boolean;
    selectedIds?: string[];
    onToggleSelect?: (orderId: string, canSelect: boolean) => void;
}

export function getOrderColumns({
    t,
    isSelectMode = false,
    selectedIds = [],
    onToggleSelect,
}: GetOrderColumnsParams): Column<TOrder>[] {
    const columns: Column<TOrder>[] = [];

    // ── Checkbox column (only in select mode) ─────────────
    if (isSelectMode) {
        columns.push({
            header: (
                <div className="w-8" /> // empty header, or put "Select"
            ),
            className: "w-10",
            accessor: (order) => {
                const canSelect =
                    order.orderStatus === "DELIVERED" &&
                    order.payoutMetadata?.rider?.isSettled === false;
                const isChecked = selectedIds.includes(order._id);

                return (
                    <Checkbox
                        checked={isChecked}
                        disabled={!canSelect}
                        onCheckedChange={() =>
                            onToggleSelect?.(order._id, canSelect)
                        }
                        className="data-[state=checked]:bg-[#DC3173] data-[state=checked]:border-[#DC3173]"
                    />
                );
            },
        });
    }

    columns.push(
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <HashIcon className="w-4" />
                    {t("order_id")}
                </div>
            ),
            accessor: "orderId",
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <CalendarIcon className="w-4" />
                    {t("date")}
                </div>
            ),
            accessor: (order) => format(order.createdAt, "do MMM yyyy"),
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <UserIcon className="w-4" />
                    {t("customer")}
                </div>
            ),
            accessor: (order) => (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={order.customerId?.profilePhoto} />
                        <AvatarFallback>
                            {order.customerId?.name?.firstName?.charAt(0)}
                            {order.customerId?.name?.lastName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">
                            {order.customerId?.name?.firstName || "N/A"}{" "}
                            {order.customerId?.name?.lastName}
                        </div>
                        {order.deliveryAddress && (
                            <div className="text-xs text-slate-500">
                                {order.deliveryAddress.street || "-"},{" "}
                                {order.deliveryAddress.city || "-"}
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <CheckCircleIcon className="w-4" />
                    {t("order_status")}
                </div>
            ),
            accessor: (order) =>
                order.orderStatus
                    ?.split("_")
                    ?.map(
                        (word) => word.charAt(0) + word.slice(1)?.toLowerCase()
                    )
                    ?.join(" "),
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <CheckLine className="w-4" />
                    {t("refund_status")}
                </div>
            ),
            accessor: (order) =>
                order.refundStatus
                    ?.split("_")
                    ?.map(
                        (word) => word.charAt(0) + word.slice(1)?.toLowerCase()
                    )
                    ?.join(" "),
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <EuroIcon className="w-4" />
                    {t("amount")}
                </div>
            ),
            accessor: (order) =>
                `€${formatPrice(order.payoutSummary?.grandTotal || 0)}`,
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <EuroIcon className="w-4" />
                    {t("is_settled")}
                </div>
            ),
            accessor: (order) =>
                order?.payoutMetadata?.rider?.isSettled === true ? t("settled") : t("not_settled"),
        }
    );

    return columns;
}