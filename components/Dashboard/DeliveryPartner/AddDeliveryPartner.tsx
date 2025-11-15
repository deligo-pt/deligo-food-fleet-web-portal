"use client";

import { DeliveryPartnerForm } from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerForm";
import DeliveryPartnerVerifyOtp from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerVerifyOtp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export function AddDeliveryPartner({ refetch }: { refetch: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const onAddSuccess = (emailArg: string) => {
    setEmail(emailArg);
  };

  const onVerifySuccess = () => {
    setIsOpen(false);
    refetch();
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="mt-4 md:mt-0 bg-white text-[#DC3173] px-4 py-2 rounded-md font-medium flex items-center shadow-md"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add New Partner
        </motion.button>
      </DialogTrigger>

      <DialogContent
        className="p-0 bg-transparent overflow-hidden border-none shadow-none"
        aria-describedby="AddDeliveryPartner"
      >
        <DialogTitle />
        <DialogDescription />{" "}
        {!email ? (
          <DeliveryPartnerForm onSuccess={onAddSuccess} />
        ) : (
          <DeliveryPartnerVerifyOtp email={email} onSuccess={onVerifySuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
