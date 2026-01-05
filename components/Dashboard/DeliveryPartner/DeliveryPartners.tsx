"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import DeliveryPartnerCard from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerCard";
import AllFilters from "@/components/Filtering/AllFilters";
import PaginationComponent from "@/components/Filtering/PaginationComponent";
import { useTranslation } from "@/hooks/use-translation";
import { TMeta } from "@/types";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { getSortOptions } from "@/utils/sortOptions";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircleIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  partnersResult: { data: TDeliveryPartner[]; meta?: TMeta };
}

export default function DeliveryPartners({ partnersResult }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const sortOptions = getSortOptions(t);

  const filterOptions = [
    {
      label: t("status"),
      key: "status",
      placeholder: t("select_status"),
      type: "select",
      items: [
        {
          label: t("pending"),
          value: "PENDING",
        },
        {
          label: t("submitted"),
          value: "SUBMITTED",
        },
        {
          label: t("approved"),
          value: "APPROVED",
        },
        {
          label: t("rejected"),
          value: "REJECTED",
        },
      ],
    },
  ];

  return (
    <div className="w-full p-8">

      <DashboardPageHeader
        title={t("delivery_partners")}
        desc={t("manage_your_delivery")}
        isButton={true}
        onClick={() => router.push("/agent/add-delivery-partner")}
        icon={<PlusCircleIcon className="mr-2 h-5 w-5" />}
        button_title={t("add_new_partner")}
      />

      <AllFilters sortOptions={sortOptions} filterOptions={filterOptions} />

      {partnersResult?.data?.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            {t("showing")}{" "}
            {((partnersResult.meta?.page || 1) - 1) *
              (partnersResult.meta?.limit || 10) +
              1}
            -
            {(partnersResult.meta?.page || 1) *
              (partnersResult.meta?.limit || 10)}{" "}
            {t("of")} {partnersResult.meta?.total || 0} {t("partners")}
          </p>
        </div>
      )}

      {partnersResult?.data?.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {partnersResult?.data?.map((partner) => (
              <DeliveryPartnerCard key={partner.email} partner={partner} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">{t("no_partners_found")}</h3>
          <p className="text-gray-500 max-w-md">
            {t("no_delivery_partners_match")}
          </p>
        </motion.div>
      )}
      {/* Pagination */}

      {!!partnersResult?.meta?.totalPage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 md:px-6"
        >
          <PaginationComponent
            totalPages={partnersResult?.meta?.totalPage as number}
          />
        </motion.div>
      )}
    </div>
  );
}
