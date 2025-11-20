import { DatePicker } from "@/components/DatePicker/DatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TResponse } from "@/types";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { getCookie } from "@/utils/cookies";
import { fetchData, updateData } from "@/utils/requests";
import { backgroundCheckValidation } from "@/validations/edit-delivery-partner/background-check.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRightIcon, CalendarIcon, ShieldCheckIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormData = z.infer<typeof backgroundCheckValidation>;

interface IProps {
  onNext: () => void;
}

export function BackgroundCheckForm({ onNext }: IProps) {
  const id = useParams()?.id;
  const form = useForm({
    resolver: zodResolver(backgroundCheckValidation),
    defaultValues: {
      haveCriminalRecordCertificate: false,
      issueDate: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const toastId = toast.loading("Updating Delivery Partner details...");
    try {
      const criminalRecord = {
        criminalRecord: {
          certificate: values.haveCriminalRecordCertificate,
          ...(values.haveCriminalRecordCertificate && {
            issueDate: new Date(values.issueDate || "").toISOString(),
          }),
        },
      };
      if (
        !values.haveCriminalRecordCertificate &&
        criminalRecord?.criminalRecord?.issueDate
      ) {
        delete criminalRecord?.criminalRecord?.issueDate;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(criminalRecord));

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
          "haveCriminalRecordCertificate",
          result?.data?.criminalRecord?.certificate ? true : false
        );
        form.setValue(
          "issueDate",
          (result?.data?.criminalRecord?.issueDate as unknown as string) || ""
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
          Criminal Background Check
        </h2>
        <p className="text-gray-600">
          Please provide delivery partner&lsquo;s Criminal Record Certificate
          (Certificado de Registo Criminal)
        </p>
      </motion.div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="bg-[#DC3173]/10 p-4 rounded-lg border border-[#DC3173]/20 mb-6">
              <div className="flex items-start">
                <ShieldCheckIcon className="w-5 h-5 text-[#DC3173] mt-1 mr-3 shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">
                    Background Check Requirement
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    In Portugal, food delivery platforms require a Criminal
                    Record Certificate (Certificado de Registo Criminal) that is
                    less than 3 months old. You can obtain this document from:
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 list-disc list-inside space-y-1">
                    <li>
                      Online at{" "}
                      <span className="font-medium">justica.gov.pt</span>
                    </li>
                    <li>Civil Registry Offices (Conservatórias)</li>
                    <li>Citizen Shops (Lojas de Cidadão)</li>
                  </ul>
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="haveCriminalRecordCertificate"
              render={({ field }) => (
                <FormItem className="content-start">
                  <FormLabel
                    htmlFor="haveCriminalRecordCertificate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <ShieldCheckIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">
                        Have Criminal Record Certificate
                      </span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <FormLabel
                      htmlFor="haveCriminalRecordCertificate"
                      className="text-sm text-gray-700 flex items-center"
                    >
                      <Checkbox
                        id="haveCriminalRecordCertificate"
                        checked={!!field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        className="h-4 w-4 text-[#DC3173] focus:ring-[#DC3173] border-gray-300 rounded data-[state=checked]:bg-[#DC3173] data-[state=checked]:border-[#DC3173]"
                      />
                      Criminal Record Certificate (Certificado de Registo
                      Criminal)
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issueDate"
              render={({ field, fieldState }) => (
                <FormItem className="content-start">
                  <FormLabel
                    htmlFor="issueDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-[#DC3173]" />
                      <span className="ml-2">Certificate Issue Date</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      inputId="issueDate"
                      onChange={field.onChange}
                      value={field.value as string}
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
            Continue to Equipment & Availability
            <ArrowRightIcon className="w-5 h-5 ml-1" />
          </motion.button>
        </form>
      </Form>
    </div>
  );
}
