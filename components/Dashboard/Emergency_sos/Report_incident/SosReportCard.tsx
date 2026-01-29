/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
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
import { SOS_ISSUE_TAGS } from "@/consts/sos.const";
import { useTranslation } from "@/hooks/use-translation";
import { triggerSos } from "@/services/sos/sos.service";
import { TSosIssueTag } from "@/types/sos.type";
import { createSosValidationSchema } from "@/validations/sos/sos.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type TSosForm = z.infer<typeof createSosValidationSchema>;

const SosReportCard = () => {
    const { t } = useTranslation();
    const form = useForm<TSosForm>({
        resolver: zodResolver(createSosValidationSchema),
        defaultValues: {
            userNote: "",
            issueTags: [],
        },
    });

    const [watchIssueTags] = useWatch({
        control: form.control,
        name: ["issueTags"],
    });

    const addIssueTag = (tag: TSosIssueTag) => {
        if (tag && !form.getValues("issueTags")?.includes(tag)) {
            const prevTags = form.getValues("issueTags") || [];
            form.setValue("issueTags", [...prevTags, tag]);
        }
    };

    const removeIssueTag = (tagToRemove: string) => {
        const newTags = form
            .getValues("issueTags")
            ?.filter((t) => t !== tagToRemove);
        form.setValue("issueTags", newTags);
    };

    const handleSubmit = async (data: TSosForm) => {
        const toastId = toast.loading("Sending SOS...");

        try {
            const result = await triggerSos({
                userNote: data.userNote,
                issueTags: data.issueTags,
            });

            if (result.success) {
                toast.success(result.message || "SOS Sent Successfully!", {
                    id: toastId,
                });
                form.reset();
            } else {
                toast.error(result.message || "Failed to send SOS", {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to send SOS",
                { id: toastId }
            );
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border p-6 max-w-xl">
            {/* Header */}
            <div className="flex flex-col gap-3 mb-4">
                <h2 className="text-lg font-semibold text-[#DC3173]">
                    {t("sos_emergency_alert")}
                </h2>
                <p className="text-sm text-gray-500">
                    {t("instantly_send_emergency_alert")}
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-5"
                >
                    {/* USER NOTE */}
                    <FormField
                        control={form.control}
                        name="userNote"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("what_going_wrong")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("describe_issue_here")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ISSUE TAGS */}
                    <div>
                        <FormLabel>{t("issue_tags")}</FormLabel>

                        {watchIssueTags?.length > 0 && (
                            <div className="flex flex-wrap gap-2 my-2">
                                {watchIssueTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-2 bg-[#DC3173]/10 text-[#DC3173] px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeIssueTag(tag)}
                                        >
                                            <XIcon className="h-4 w-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <Select onValueChange={(value: TSosIssueTag) => addIssueTag(value)}>
                            <SelectTrigger className="mt-2 w-full">
                                <SelectValue placeholder="Add an issue tag" />
                            </SelectTrigger>
                            <SelectContent>
                                {SOS_ISSUE_TAGS.map((tag) => (
                                    <SelectItem key={tag} value={tag}>
                                        {tag}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                        >
                            {t("reset")}
                        </Button>

                        <Button
                            type="submit"
                            className="bg-[#DC3173] hover:bg-[#DC3173]/90"
                        >
                            {t("send_sos")}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SosReportCard;
