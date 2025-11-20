import { DatePicker } from "@/components/DatePicker/DatePicker";
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
import { cn } from "@/lib/utils";
import { TResponse } from "@/types";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { getCookie } from "@/utils/cookies";
import { fetchData, updateData } from "@/utils/requests";
import { legalStatusValidation } from "@/validations/edit-delivery-partner/legal-status.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  BuildingIcon,
  CalendarIcon,
  IdCardIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface IProps {
  onNext: () => void;
}

type FormData = z.infer<typeof legalStatusValidation>;

const permitTypes = [
  "D2 Visa",
  "D4 Student Visa",
  "Temporary Residence",
  "Permanent Residence",
  "EU Citizen",
  "Other",
];

export function LegalStatusForm({ onNext }: IProps) {
  const id = useParams()?.id;
  const form = useForm<FormData>({
    resolver: zodResolver(legalStatusValidation),
    defaultValues: {
      residencePermitType: "",
      residencePermitNumber: "",
      residencePermitExpiry: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const toastId = toast.loading("Updating Delivery Partner details...");
    try {
      const legalStatus = {
        legalStatus: {
          residencePermitType: values.residencePermitType,
          residencePermitNumber: values.residencePermitNumber,
          residencePermitExpiry: new Date(
            values.residencePermitExpiry
          ).toISOString(),
        },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(legalStatus));

      const result = (await updateData(`/delivery-partners/${id}`, formData, {
        headers: { authorization: getCookie("accessToken") },
      })) as unknown as TResponse<TDeliveryPartner[]>;

      if (result.success) {
        toast.success("Delivery Partner details updated successfully!", {
          id: toastId,
        });
        onNext();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to update Delivery Partner details",
        {
          id: toastId,
        }
      );
    }
  };

  const getPartnerData = async () => {
    try {
      const result = (await fetchData(`/delivery-partners/${id}`, {
        headers: {
          authorization: getCookie("accessToken"),
        },
      })) as unknown as TResponse<TDeliveryPartner>;

      if (result.success) {
        form.setValue(
          "residencePermitType",
          result?.data?.legalStatus?.residencePermitType || ""
        );
        form.setValue(
          "residencePermitNumber",
          result?.data?.legalStatus?.residencePermitNumber || ""
        );
        form.setValue(
          "residencePermitExpiry",
          (result?.data?.legalStatus
            ?.residencePermitExpiry as unknown as string) || ""
        );
      }
    } catch (error) {
      console.error("Error fetching delivery partner data:", error);
    }
  };

  useEffect(() => {
    (() => getPartnerData())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Right to Work / Legal Status
        </h2>
        <p className="text-gray-600">
          Please provide details about partner&lsquo;s legal status
        </p>
      </motion.div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="residencePermitType"
              render={({ field, fieldState }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <BuildingIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">Residence Permit Type</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all",
                          fieldState.invalid
                            ? "border-red-500"
                            : "border-gray-300"
                        )}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {permitTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="residencePermitNumber"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <IdCardIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">
                        ARC / título de residência Number
                      </span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Residence Permit Number"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DC3173] focus:border-[#DC3173] outline-none transition-all border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="residencePermitExpiry"
              render={({ field, fieldState }) => (
                <FormItem className="content-start">
                  <FormLabel
                    htmlFor="residencePermitExpiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">Expiration Date</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      inputId="residencePermitExpiry"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={fieldState.invalid}
                    />
                  </FormControl>
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
            className="mt-8 w-full bg-[#DC3173] text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-[#c21c5e] transition-colors duration-300 flex items-center justify-center"
          >
            Continue to Payment Details
            <ArrowRightIcon className="w-5 h-5 ml-1" />
          </motion.button>
        </form>
      </Form>
    </div>
  );
}
