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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import { updateFleetInformation } from "@/services/becomeAgent/becomeAgentManagement";
import { TFleetManager } from "@/types/fleet-manager.type";
import { bankDetailsValidation } from "@/validations/become-agent/bank-details.validation";
import z from "zod";
import { cn } from "@/lib/utils";
import { bankNames } from "@/consts/bankName.const";

type TBankForm = z.infer<typeof bankDetailsValidation>;

interface Props {
  profile: {
    existingFleetManager: TFleetManager;
  };
}

const BankDetails = ({ profile }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const form = useForm<TBankForm>({
    resolver: zodResolver(bankDetailsValidation),
    defaultValues: {
      bankName: "",
      accountHolderName: "",
      iban: "",
      swiftCode: "",
    },
  });

  const { formState: { isSubmitting } } = form;

  useEffect(() => {
    if (!profile?.existingFleetManager?.bankDetails) return;

    form.setValue("bankName", profile?.existingFleetManager?.bankDetails.bankName || "");
    form.setValue(
      "accountHolderName",
      profile?.existingFleetManager?.bankDetails.accountHolderName || "",
    );
    form.setValue("iban", profile?.existingFleetManager?.bankDetails.iban || "");
    form.setValue("swiftCode", profile?.existingFleetManager?.bankDetails.swiftCode || "");
  }, [profile?.existingFleetManager, form]);

  const onSubmit = async (data: TBankForm) => {
    const toastId = toast.loading("Updating bank details...");

    const payload = {
      bankDetails: {
        bankName: data.bankName,
        accountHolderName: data.accountHolderName,
        iban: data.iban.toUpperCase(),
        swiftCode: data.swiftCode.toUpperCase(),
      },
    };

    const result = await updateFleetInformation(
      profile?.existingFleetManager?.userId as string,
      payload,
    );

    if (result?.success) {
      toast.success(result?.message || "Bank details updated successfully!", {
        id: toastId,
      });
      router.push("/become-agent/document-image-details");
      return;
    }

    toast.error(result?.message || "Update failed", { id: toastId });
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
          <div>
            <Button
              onClick={() => router.push("/become-agent/business-location")}
              variant="link"
              className="flex items-center gap-2 text-[#DC3173]"
            >
              <ArrowLeftCircle /> {t("go_back")}
            </Button>
          </div>

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
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>
                          <CreditCard className="text-[#DC3173]" /> {t("bankName")}
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value || profile?.existingFleetManager?.bankDetails?.bankName || ""}>
                            <SelectTrigger
                              className={cn(
                                "w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all",
                                fieldState.invalid
                                  ? "border-red-500"
                                  : "border-gray-300",
                              )}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {bankNames.map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                          <User className="text-[#DC3173]" /> {t("accountHolder")}
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
                          <FileText className="text-[#DC3173]" /> {t("iban")}
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
                          <Globe className="text-[#DC3173]" /> {t("swift_bic")}
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
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex gap-1 px-4 bg-[#DC3173] text-white py-3 rounded-xl ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
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
