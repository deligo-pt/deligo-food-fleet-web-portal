"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Building2,
  Briefcase,
  FileCheck2,
  BadgeInfo,
  MapPin,
  Clock,
  CalendarX2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type BusinessForm = {
  businessName: string;
  businessLicenseNumber: string;
  NIF: string;
};

const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${minute}`;
});



export default function BusinessDetailsPage() {
  const { register, handleSubmit } = useForm<BusinessForm>();
  
  const router = useRouter();

  

  const onSubmit = (data: BusinessForm) => {
    console.log("✅ Business details:", data);
    router.push("/become-agent/business-location");
    
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="w-full max-w-2xl p-6 shadow-2xl border-t-4 border-[#DC3173] bg-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#DC3173]">
            Business Details
          </CardTitle>
          <p className="text-center text-gray-500 mt-1 text-sm">
            Fill in your business information to complete registration
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* ========== Section 1: Basic Info ========== */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
                🏢 Basic Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Business Name */}
                <div className="relative">
                  <Building2 className="absolute left-3 top-3.5 text-[#DC3173]" />
                  <Input
                    {...register("businessName")}
                    placeholder="Business Name"
                    required
                    className="pl-10 h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-[#DC3173]/60"
                  />
                </div>

                
                {/* License */}
                <div className="relative">
                  <FileCheck2 className="absolute left-3 top-3.5 text-[#DC3173]" />
                  <Input
                    {...register("businessLicenseNumber")}
                    placeholder="License Number"
                    required
                    className="pl-10 h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-[#DC3173]/60"
                  />
                </div>

                {/* NIF */}
                <div className="relative">
                  <BadgeInfo className="absolute left-3 top-3.5 text-[#DC3173]" />
                  <Input
                    {...register("NIF")}
                    placeholder="NIF"
                    required
                    className="pl-10 h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-[#DC3173]/60"
                  />
                </div>
              </div>
            </div>

           

           

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                className="w-full h-12 bg-[#DC3173] hover:bg-[#b12b61] text-white text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Save & Continue
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
