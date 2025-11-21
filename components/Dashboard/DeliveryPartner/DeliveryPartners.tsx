"use client";

import DeliveryPartnerCard from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerCard";
import AllFilters from "@/components/Filtering/AllFilters";
import PaginationComponent from "@/components/Filtering/PaginationComponent";
import { TMeta } from "@/types";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircleIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  partnersResult: { data: TDeliveryPartner[]; meta?: TMeta };
}

const sortOptions = [
  { label: "Newest First", value: "-createdAt" },
  { label: "Oldest First", value: "createdAt" },
  { label: "Name (A-Z)", value: "name.firstName" },
  { label: "Name (Z-A)", value: "-name.lastName" },
];

const filterOptions = [
  {
    label: "Status",
    key: "status",
    placeholder: "Select Status",
    type: "select",
    items: [
      {
        label: "Pending",
        value: "PENDING",
      },
      {
        label: "Submitted",
        value: "SUBMITTED",
      },
      {
        label: "Approved",
        value: "APPROVED",
      },
      {
        label: "Rejected",
        value: "REJECTED",
      },
    ],
  },
];

export default function DeliveryPartners({ partnersResult }: IProps) {
  const router = useRouter();

  return (
    <div className="w-full p-8">
      <div className="bg-linear-to-r from-[#DC3173] to-[#FF6CAB] p-6 rounded-lg mb-6 shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Delivery Partners
            </h1>
            <p className="text-pink-100 mt-1">
              Manage your delivery partner network
            </p>
          </div>
          <motion.button
            onClick={() => router.push("/agent/add-delivery-partner")}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="mt-4 md:mt-0 bg-white text-[#DC3173] px-4 py-2 rounded-md font-medium flex items-center shadow-md"
          >
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Add New Partner
          </motion.button>
        </div>
      </div>

      <AllFilters sortOptions={sortOptions} filterOptions={filterOptions} />

      {partnersResult?.data?.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {((partnersResult.meta?.page || 1) - 1) *
              (partnersResult.meta?.limit || 10) +
              1}
            -
            {(partnersResult.meta?.page || 1) *
              (partnersResult.meta?.limit || 10)}{" "}
            of {partnersResult.meta?.total || 0} partners
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
          <h3 className="text-xl font-medium mb-2">No partners found</h3>
          <p className="text-gray-500 max-w-md">
            No delivery partners match your current filters. Try adjusting your
            search or filters to find what you&lsquo;re looking for.
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
