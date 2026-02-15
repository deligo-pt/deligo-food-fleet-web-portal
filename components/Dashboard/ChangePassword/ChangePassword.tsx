"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { changePasswordReq } from "@/services/dashboard/changePassword/changePassword";
import { TResponse } from "@/types";
import { removeCookie } from "@/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { changePasswordValidation } from "@/validations/auth/change-password.validation";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { useTranslation } from "@/hooks/use-translation";

const PRIMARY = "#DC3173";
const SHADOW = "0px 8px 24px rgba(0,0,0,0.06)";

type ChangePasswordData = z.infer<typeof changePasswordValidation>;

export default function ChangePassword() {
  const { t } = useTranslation();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const form = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: ChangePasswordData) => {
    const toastId = toast.loading("Updating Password...");

    try {
      const changePasswordData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      const result = (await changePasswordReq(
        changePasswordData
      )) as TResponse<null>;

      if (result.success) {
        toast.success("Password Updated Successfully!", { id: toastId });
        form.reset();

        removeCookie("accessToken");
        removeCookie("refreshToken");

        setTimeout(() => {
          router.push("/login");
        }, 500);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message ? error?.message : error?.response?.data?.message || "Password Update Failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="">
      <DashboardPageHeader
        title={t("change_password")}
        desc={t("update_your_account_password_securely")}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[600px] mx-auto space-y-10"
        >
          {/* FORM */}
          <Card
            className="rounded-3xl bg-white border border-[#DC3173]/30 shadow-md"
            style={{ boxShadow: SHADOW }}
          >
            <CardContent className="p-6 space-y-6">
              {/* OLD PASSWORD */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showOld ? "text" : "password"}
                          placeholder="Enter current password"
                          className={cn(
                            "h-12 rounded-xl pr-10",
                            fieldState.invalid ? "border-destructive" : ""
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-500"
                          onClick={() => setShowOld(!showOld)}
                        >
                          {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NEW PASSWORD */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNew ? "text" : "password"}
                          placeholder="Enter new password"
                          className={cn(
                            "h-12 rounded-xl pr-10",
                            fieldState.invalid ? "border-destructive" : ""
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-500"
                          onClick={() => setShowNew(!showNew)}
                        >
                          {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder="Re-enter new password"
                          className={cn(
                            "h-12 rounded-xl pr-10",
                            fieldState.invalid ? "border-destructive" : ""
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-500"
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          {showConfirm ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BUTTON */}
              <>
                <Button
                  className="h-12 px-6 text-white rounded-xl w-full"
                  style={{ background: PRIMARY }}
                // onClick={updatePassword}
                >
                  Update Password
                </Button>
              </>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
