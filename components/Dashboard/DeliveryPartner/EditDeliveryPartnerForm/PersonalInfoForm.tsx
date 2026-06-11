"use client";

import { DatePicker } from "@/components/DatePicker/DatePicker";
import { countries } from 'countries-list';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { updatePartnerInformation } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { personalInfoValidation } from "@/validations/edit-delivery-partner/personal-info.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CalendarIcon,
  FlagIcon,
  IdCardIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  Check, ChevronsUpDown
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof personalInfoValidation>;

interface IProps {
  onNext: () => void;
  partner: TDeliveryPartner
}

export function PersonalInfoForm({ onNext, partner }: IProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const id = useParams()?.id;
  const form = useForm<FormData>({
    resolver: zodResolver(personalInfoValidation),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      // prefixPhoneNumber: "+351",
      phoneNumber: "",
      dateOfBirth: "",
      nationality: "",
      gender: "MALE",
      nifNumber: "",
      passportNumber: "",
      street: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
    },
  });
  const { formState: { isSubmitting } } = form;

  // Create an optimized, sorted list outside the component so it doesn't recalculate on every render
  const countryOptions = Object.entries(countries)
    .map(([code, country]) => ({
      value: country.name,
      label: country.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const onSubmit = async (values: FormData) => {
    const toastId = toast.loading("Updating Delivery Partner details...");

    const payload = {
      name: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      contactNumber: values.phoneNumber,
      personalInfo: {
        dateOfBirth: new Date(values.dateOfBirth).toISOString(),
        nationality: values.nationality,
        gender: values.gender,
        NIF: values.nifNumber,
        passportNumber: values.passportNumber,
      },
      address: {
        street: values.street,
        city: values.city,
        postalCode: values.postalCode,
        state: values.state,
        country: values.country,
      },
    };
    const result = await updatePartnerInformation(id as string, payload);

    if (result.success) {
      toast.success(
        result?.message || "Delivery Partner details updated successfully!",
        {
          id: toastId,
        },
      );
      onNext();
      return;
    }

    toast.error(
      result?.message || "Failed to update Delivery Partner details.",
      {
        id: toastId,
      },
    );
  };

  useEffect(() => {

    const getPartnerData = async () => {
      try {
        if (partner?._id) {

          form.setValue("firstName", partner?.name?.firstName || "");
          form.setValue("lastName", partner?.name?.lastName || "");
          form.setValue("phoneNumber", partner?.contactNumber || "");
          form.setValue(
            "dateOfBirth",
            (partner?.personalInfo?.dateOfBirth as unknown as string) || "",
          );
          form.setValue("nationality", partner?.personalInfo?.nationality || "");
          form.setValue("gender", partner?.personalInfo?.gender || "MALE");
          form.setValue("nifNumber", partner?.personalInfo?.NIF || "");
          form.setValue(
            "passportNumber",
            partner?.personalInfo?.passportNumber || "",
          );
          form.setValue("street", partner?.address?.street || "");
          form.setValue("city", partner?.address?.city || "");
          form.setValue("postalCode", partner?.address?.postalCode || "");
          form.setValue("state", partner?.address?.state || "");
          form.setValue("country", partner?.address?.country || "");
        }
      } catch (error) {
        console.log("Error fetching delivery partner data:", error);
      }
    };

    getPartnerData();
  }, [partner]);

  useEffect(() => {
    const currentPhone = form.getValues("phoneNumber");
    if (!currentPhone) {
      form.setValue("phoneNumber", "+351", { shouldValidate: true });
    }
  }, [form]);

  return (
    <div>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          {t("personal_information")}
        </h2>
        <p className="text-gray-600">{t("please_provide_partner_details")}</p>
      </motion.div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("first_name")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. John"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("last_name")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Doe"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field, fieldState }) => (
                <FormItem className="content-start">
                  <FormLabel
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("date_of_birth")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      inputId="dateOfBirth"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={fieldState.invalid}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field, fieldState }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("gender")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all",
                          fieldState.invalid
                            ? "border-red-500"
                            : "border-gray-300",
                        )}
                      >
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">{t("male")}</SelectItem>
                        <SelectItem value="FEMALE">{t("female")}</SelectItem>
                        <SelectItem value="OTHER">{t("other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FlagIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("nationality")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Portugese"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nifNumber"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <IdCardIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("nif_number")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <IdCardIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">
                        {t("passport_number_optional")}
                      </span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("street")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("city")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("postal_code")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("state_optional")}</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="content-start flex flex-col">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FlagIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">{t("country")}</span>
                    </div>
                  </FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full p-3 h-9 justify-between font-normal border rounded-lg outline-none transition-all border-gray-300 bg-white hover:bg-white text-left",
                            !field.value && "text-muted-foreground",
                            open && "ring-2 ring-[#DC3173] border-[#DC3173]"
                          )}
                        >
                          {field.value
                            ? countryOptions.find((country) => country.value.toLowerCase() === field.value.toLowerCase())?.label
                            : t("Select country...") || "Select country..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-gray-500" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                      <Command>
                        <CommandInput placeholder={`${t("Search country")}...`} className="h-9" />
                        <CommandList>
                          <CommandEmpty>{t("No country found.") || "No country found."}</CommandEmpty>
                          <CommandGroup className="max-h-[250px] overflow-y-auto">
                            {countryOptions.map((country) => (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  form.setValue("country", country.value, { shouldValidate: true });
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-[#DC3173]",
                                    country.value.toLowerCase() === field.value?.toLowerCase()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {country.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full bg-[#DC3173] text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-[#c21c5e] transition-colors duration-300 flex items-center justify-center"
          >
            {t("continue_to_legal_status")}
            <ArrowRightIcon className="w-5 h-5 ml-1" />
          </motion.button>
        </form>
      </Form>
    </div>
  );
}
