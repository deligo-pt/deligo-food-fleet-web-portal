/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowLeftCircle,
  CreditCard,
  FileText,
  Globe,
  Save,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import { updateFleetInformation } from "@/services/becomeAgent/becomeAgentManagement";
import { TFleetManager } from "@/types/fleet-manager.type";
import { bankDetailsValidation } from "@/validations/become-agent/bank-details.validation";

type FormValues = {
  bankName: string;
  accountHolderName: string;
  iban: string;
  swiftCode: string;
};

interface Props {
  profile: {
    data: TFleetManager;
  };
}

const BankDetails = ({ profile }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(bankDetailsValidation),
    defaultValues: {
      bankName: "",
      accountHolderName: "",
      iban: "",
      swiftCode: "",
    },
  });

  useEffect(() => {
    if (!profile?.data?.bankDetails) return;

    form.setValue("bankName", profile?.data?.bankDetails.bankName || "");
    form.setValue(
      "accountHolderName",
      profile?.data?.bankDetails.accountHolderName || "",
    );
    form.setValue("iban", profile?.data?.bankDetails.iban || "");
    form.setValue("swiftCode", profile?.data?.bankDetails.swiftCode || "");
  }, [profile?.data, form]);

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Updating bank details...");

    try {
      const payload = {
        bankDetails: {
          bankName: data.bankName,
          accountHolderName: data.accountHolderName,
          iban: data.iban.toUpperCase(),
          swiftCode: data.swiftCode.toUpperCase(),
        },
      };

      const result = await updateFleetInformation(
        profile?.data?.userId as string,
        payload,
      );

      if (result?.success) {
        toast.success("Bank details updated successfully!", { id: toastId });
        router.push("/become-agent/document-image-details");
        return;
      }

      toast.error(result?.message || "Update failed", { id: toastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-linear-to-b from-white via-gray-50 to-gray-100 py-12 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-2xl shadow-2xl border">
          <Button
            onClick={() => router.push("/become-agent/business-location")}
            variant="link"
            className="flex items-center gap-2 text-[#DC3173]"
          >
            <ArrowLeftCircle /> {t("go_back")}
          </Button>

          <CardHeader className="bg-linear-to-r from-[#DC3173] to-pink-600 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/25 p-3 rounded-xl">
                <CreditCard className="w-7 h-7" />
              </div>
              <CardTitle>{t("bankDetails")}</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-6 bg-white">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <CreditCard /> {t("bankName")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <User /> {t("accountHolder")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="iban"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <FileText /> {t("iban")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="uppercase" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="swiftCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Globe /> {t("swift_bic")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="uppercase" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex gap-1 px-4 bg-[#DC3173] text-white py-3 rounded-xl"
                >
                  <Save /> {t("saveContinue")}
                </motion.button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default BankDetails;
