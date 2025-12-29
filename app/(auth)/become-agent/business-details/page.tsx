"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import { TResponse } from "@/types";
import { getCookie } from "@/utils/cookies";
import { fetchData, updateData } from "@/utils/requests";
import { businessDetailsValidation } from "@/validations/become-agent/business-details.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { ArrowLeftCircle, Building2, FileCheck2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type BusinessForm = {
  businessName: string;
  businessLicenseNumber: string;
};

export default function BusinessDetailsPage() {
  const { t } = useTranslation();
  const form = useForm<BusinessForm>({
    resolver: zodResolver(businessDetailsValidation),
    defaultValues: {
      businessName: "",
      businessLicenseNumber: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: BusinessForm) => {
    const toastId = toast.loading("Updating...");
    try {
      const accessToken = getCookie("accessToken");
      const decoded = jwtDecode(accessToken || "") as { id: string };

      const businessDetails = {
        businessDetails: {
          businessName: data.businessName,
          businessLicenseNumber: data.businessLicenseNumber.toUpperCase(),
        },
      };

      const result = (await updateData(
        "/fleet-managers/" + decoded?.id,
        businessDetails,
        {
          headers: { authorization: accessToken },
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )) as unknown as TResponse<any>;

      if (result.success) {
        toast.success("Business details updated successfully!", {
          id: toastId,
        });

        router.push("/become-agent/business-location");
        return;
      }
      toast.error(result.message, { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Business details update failed",
        { id: toastId }
      );
      console.log(error);
    }
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken || "") as {
        email: string;
        id: string;
      };
      if (decoded?.email) {
        const fetchUserData = async (id: string, token: string) => {
          try {
            const result = (await fetchData(`/fleet-managers/${id}`, {
              headers: {
                authorization: token,
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            })) as unknown as TResponse<any>;

            if (result.success) {
              const data = result.data;

              form.setValue(
                "businessName",
                data?.businessDetails?.businessName || ""
              );
              form.setValue(
                "businessLicenseNumber",
                data?.businessDetails?.businessLicenseNumber || ""
              );
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchUserData(decoded.id, accessToken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-linear-to-br from-pink-50 via-white to-pink-100 px-"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="w-full max-w-2xl p-6 shadow-2xl border-t-4 border-[#DC3173] bg-white rounded-2xl relative">
        <div className="absolute top-3 left-0">
          <Button
            onClick={() => router.push("/become-agent/personal-details")}
            variant="link"
            className="inline-flex items-center px-4 text-sm gap-2 text-[#DC3173] p-0 h-4 cursor-pointer"
          >
            <ArrowLeftCircle /> {t("go_back")}
          </Button>
        </div>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#DC3173]">
            {t("businessDetails")}
          </CardTitle>
          <p className="text-center text-gray-500 mt-1 text-sm">
            {t("businessDetailsDesc")}
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* ========== Section 1: Basic Info ========== */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
                  {t("basicInformation")}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Business Name */}
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-3.5 text-[#DC3173]" />
                              <Input
                                placeholder="Business Name"
                                className="pl-10 h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-[#DC3173]/60"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* License */}
                  <FormField
                    control={form.control}
                    name="businessLicenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <div className="relative">
                              <FileCheck2 className="absolute left-3 top-3.5 text-[#DC3173]" />
                              <Input
                                placeholder="License Number"
                                className="pl-10 h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-[#DC3173]/60 uppercase"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#DC3173] hover:bg-[#b12b61] text-white text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  {t("saveContinue")}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
