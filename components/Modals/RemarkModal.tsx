/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}
type TSosForm = z.infer<typeof createSosValidationSchema>;

const RemarkModal = ({ open, onOpenChange, isSubmitting, setIsSubmitting }: IProps) => {
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
    if (tag && !form?.getValues("issueTags")?.includes(tag)) {
      const prevTags = form?.getValues("issueTags") || [];
      const newTags = [...prevTags, tag] as typeof prevTags;
      form.setValue("issueTags", newTags);
    }
  };

  const removeIssueTag = (tagToRemove: string) => {
    const newTags = form
      ?.getValues("issueTags")
      ?.filter((t) => t !== tagToRemove);
    form.setValue("issueTags", newTags);
  };

  const handleSubmit = async (data: TSosForm) => {
    setIsSubmitting(true);

    const toastId = toast.loading("Sending SOS...");
    const payload = {
      userNote: data.userNote as string,
      issueTags: data.issueTags as TSosIssueTag[],
    };

    try {
      const result = await triggerSos(payload);

      if (result.success) {
        toast.success(result.message || "SOS Sent Successfully!", {
          id: toastId,
        });
        form.reset();
        onOpenChange(false);
        setIsSubmitting(false);
        return;
      } else {
        toast.error(result.message || "Failed to send SOS", { id: toastId });
        setIsSubmitting(false);
      }
      console.log(result);

    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
        "Failed to update Delivery Partner details",
        {
          id: toastId,
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="text-[#DC3173]">{t("sos_emergency_alert")}</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              {t("instantly_send_emergency_alert")}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              id="sosForm"
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="userNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("what_going_wrong")}</FormLabel>
                    <FormControl>
                      <Input
                        id="userNote"
                        name="userNote"
                        onBlur={(e) => field.onChange(e.target.value)}
                        placeholder={t("describe_issue_here")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("issue_tags")}
                </label>
                {watchIssueTags && watchIssueTags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-1">
                    {watchIssueTags?.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center bg-[#DC3173] bg-opacity-10 text-white px-3 py-1 rounded-full"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeIssueTag(tag)}
                          className="ml-2 text-white hover:text-[#CCC]"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="issueTags"
                  render={() => (
                    <FormItem className="gap-1">
                      <FormControl>
                        <Select
                          onValueChange={(value: TSosIssueTag) => {
                            addIssueTag(value);
                          }}
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-10">
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => form.reset()}>{t("cancel")}</Button>
            </DialogClose>

            <Button
              form="sosForm"
              type="submit"
              className="bg-[#DC3173] hover:bg-[#DC3173]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending SOS..." : "Send SOS"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default RemarkModal;
