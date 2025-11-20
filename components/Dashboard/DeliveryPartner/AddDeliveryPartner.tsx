"use client";

import { DeliveryPartnerForm } from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerForm";
import DeliveryPartnerVerifyOtp from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerVerifyOtp";
import { useState } from "react";

export function AddDeliveryPartner() {
  const [email, setEmail] = useState("");

  const onAddSuccess = (emailArg: string) => {
    setEmail(emailArg);
  };

  return (
    <div className="p-4 md:p-6 flex justify-center items-center max-w-2xl mx-auto h-full">
      {!email ? (
        <DeliveryPartnerForm onSuccess={onAddSuccess} />
      ) : (
        <DeliveryPartnerVerifyOtp email={email} />
      )}
    </div>
  );
}
