/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { toast } from "sonner";
import { contactUsformReq } from "@/services/contact-us/contact.service";

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactUsForm = () => {
    const { t } = useTranslation();
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: ContactFormValues) => {
        const toastId = toast.loading("Sending...");
        const payload = {
            name: values.name,
            sender: values.email,
            message: values.message
        };

        try {
            const result = await contactUsformReq(payload);
            if (result.success) {
                toast.success(result?.message, { id: toastId });
            } else {
                toast.error(result?.message || "Message sending failed");
            };
        } catch (error: any) {
            console.log(error.response);
            toast.error(error?.response?.data?.message || "Password Update Failed", {
                id: toastId,
            });
        }
    };

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
        >
            <h2 className="text-3xl font-bold text-[#DC3173] mb-6">
                {t("send_a_message")}
            </h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("your_name")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("your_name")!}
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
                                <FormLabel>{t("your_email")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder={t("your_email")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Message */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("your_message")}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={5}
                                        placeholder={t("your_message")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 rounded-md bg-[#DC3173] hover:bg-[#c42a66]"
                        >
                            {t("send_message")}
                            <Send className="w-5 h-5" />
                        </Button>
                    </motion.div>
                </form>
            </Form>
        </motion.div>
    );
};

export default ContactUsForm;
