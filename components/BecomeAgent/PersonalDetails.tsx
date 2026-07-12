"use client";

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
import { personalDetailsValidation } from "@/validations/become-agent/personal-details.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeftCircle, Mail, PhoneIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import { toast } from "sonner";

type PersonalForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

interface Props {
  profile: TFleetManager
}

const PersonalDetails = ({ profile }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  console.log("profile", profile);
  const form = useForm<PersonalForm>({
    resolver: zodResolver(personalDetailsValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const { formState: { isSubmitting } } = form;

  useEffect(() => {
    if (!profile?.name) return;

    form.setValue("firstName", profile?.name.firstName || "");
    form.setValue("lastName", profile?.name.lastName || "");
    form.setValue("email", profile?.email || "");
    form.setValue("phoneNumber", profile?.contactNumber || "");
  }, [form, profile]);

  const onSubmit = async (data: PersonalForm) => {
    const toastId = toast.loading("Updating personal details...");

    const personalDetails = {
      name: { firstName: data.firstName, lastName: data.lastName },
      contactNumber: data.phoneNumber,
    };

    const result = await updateFleetInformation(
      profile?.userId as string,
      personalDetails,
    );

    if (result.success) {
      toast.success(
        result.message || "Personal details updated successfully!",
        { id: toastId },
      );

      router.push("/become-agent/business-details");
      return;
    }

    toast.error(result.message || "Update failed", { id: toastId });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-xl border border-white/60 backdrop-blur-xl bg-white/80 rounded-2xl p-6 relative">
          <div className="absolute top-3 left-0">
            <Button
              onClick={() => router.push("/")}
              variant="link"
              className="inline-flex items-center px-4 text-sm gap-2 text-[#DC3173] p-0 h-4 cursor-pointer"
            >
              <ArrowLeftCircle /> {t("go_home")}
            </Button>
          </div>
          <CardHeader className="text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="bg-[#DC3173]/10 p-4 rounded-full border border-[#DC3173]/20">
                <User className="w-8 h-8 text-[#DC3173]" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-[#DC3173] tracking-wide">
              {t("personalDetails")}
            </CardTitle>
            <p className="text-gray-500 text-sm">{t("personalDetailsDesc")}</p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-[#DC3173]" />
                          <span className="ml-2">{t("first_name")}</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          className="pl-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-[#DC3173] focus:border-[#DC3173] transition-all duration-300 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-[#DC3173]" />
                          <span className="ml-2">{t("last_name")}</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          className="pl-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-[#DC3173] focus:border-[#DC3173] transition-all duration-300 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        <div className="flex items-center">
                          <Mail className="text-[#DC3173] w-5 h-5" />
                          <span className="ml-2">{t("email")}</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          className="pl-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-[#DC3173] focus:border-[#DC3173] transition-all duration-300 rounded-xl"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <PhoneIcon className="w-5 h-5 text-[#DC3173]" />
                        <span className="ml-2">{t("phone_number")}</span>
                      </div>

                      <FormControl>
                        <PhoneInput
                          defaultCountry="pt"
                          value={field.value || ""}
                          onChange={(phone) => {
                            field.onChange(phone);
                          }}
                          forceDialCode={true}
                          disableDialCodePrefill={false}

                          className="w-full flex"

                          inputStyle={{
                            width: "100%",
                            height: "40px",
                            fontSize: "14px",
                            color: "#374151",
                            borderRadius: "0.5rem",
                            border: "1px solid #D1D5DB",
                            outline: "none",
                            paddingLeft: "52px",
                          }}
                          countrySelectorStyleProps={{
                            buttonStyle: {
                              position: "absolute",
                              left: "1px",
                              top: "-1px",
                              bottom: "1px",
                              border: "none",
                              backgroundColor: "transparent",
                              height: "44px",
                              padding: "0 12px",
                              borderTopLeftRadius: "0.5rem",
                              borderBottomLeftRadius: "0.5rem",
                            },
                          }}
                          inputClassName="focus-visible:ring-2 focus-visible:ring-[#D1D5DB] focus-visible:border-[#D1D5DB]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-3 rounded-xl bg-linear-to-r from-[#DC3173] to-[#a72b5c] text-white shadow-lg shadow-pink-200 hover:brightness-110 transition-all duration-300 ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
                  >
                    {t("saveContinue")}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PersonalDetails;
