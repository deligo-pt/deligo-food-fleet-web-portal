"use client";
import AllFilters from "@/components/Filtering/AllFilters";
import PaginationComponent from "@/components/Filtering/PaginationComponent";
import { TMeta } from "@/types";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheckBig, Cog, IdCard, Mail, MoreVertical, Phone } from "lucide-react";


interface IProps {
  partnersResult: { data: TDeliveryPartner[]; meta?: TMeta };
}

const sortOptions = [
  { label: "Newest First", value: "-createdAt" },
  { label: "Oldest First", value: "createdAt" },
  { label: "Name (A-Z)", value: "name.firstName" },
  { label: "Name (Z-A)", value: "-name.lastName" },
];

export default function SuspendedPartners({
  partnersResult,
}: IProps): JSX.Element {
  const router = useRouter();

  return (
    <>
      <AllFilters sortOptions={sortOptions} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-md rounded-2xl p-4 md:p-6 mb-2 overflow-x-auto"
      >
        <Table className="max-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="text-[#DC3173] flex gap-2 items-center">
                  <IdCard className="w-4" />
                  Name
                </div>
              </TableHead>
              <TableHead>
                <div className="text-[#DC3173] flex gap-2 items-center">
                  <Mail className="w-4" />
                  Email
                </div>
              </TableHead>
              <TableHead>
                <div className="text-[#DC3173] flex gap-2 items-center">
                  <Phone className="w-4" />
                  Phone
                </div>
              </TableHead>
              <TableHead>
                <div className="text-[#DC3173] flex gap-2 items-center">
                  <CircleCheckBig className="w-4" />
                  Status
                </div>
              </TableHead>
              <TableHead className="text-right text-[#DC3173] flex gap-2 items-center justify-end">
                <Cog className="w-4" />
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partnersResult &&
              partnersResult?.data?.length > 0 &&
              partnersResult?.data?.map((partner) => (
                <TableRow key={partner._id}>
                  <TableCell>
                    {partner.name?.firstName} {partner.name?.lastName}
                  </TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.contactNumber}</TableCell>
                  <TableCell>
                    {partner.isDeleted ? "Deleted" : partner.status}
                  </TableCell>
                  <TableCell className="text-right">
                    {!partner.isDeleted && (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end"
                          className="min-w-20 w-auto px-2">
                          <DropdownMenuItem
                            className=""
                            onClick={() =>
                              router.push("/agent/delivery-partners/" + partner.userId)
                            }
                          >
                            View
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {partnersResult?.data?.length === 0 && (
              <TableRow>
                <TableCell
                  className="text-[#DC3173] text-lg text-center"
                  colSpan={5}
                >
                  No partners found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

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

      {/* <ApproveOrRejectModal
        open={statusInfo?.vendorId?.length > 0}
        onOpenChange={() =>
          setStatusInfo({ vendorId: "", status: "", vendorName: "" })
        }
        status={
          statusInfo.status as "APPROVED" | "REJECTED" | "BLOCKED" | "UNBLOCKED"
        }
        userId={statusInfo.vendorId}
        userName={statusInfo.vendorName}
      /> */}
    </>
  );
}
