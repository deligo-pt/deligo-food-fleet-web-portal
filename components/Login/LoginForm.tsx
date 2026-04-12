"use client";

import ClearSessionModal from "@/components/Login/ClearSessionModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { USER_ROLE } from "@/consts/user.const";
import { useTranslation } from "@/hooks/use-translation";
import { loginReq } from "@/services/auth/auth";
import { setCookie } from "@/utils/cookies";
import { getAndSaveFcmToken } from "@/utils/fcmToken";
import { getDeviceInfo } from "@/utils/getDeviceInfo";
import { loginValidation } from "@/validations/auth/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff, Lock, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm({ redirect }: { redirect?: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const params = useSearchParams();

  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (payload: {
    email: string;
    password: string;
    forceLogin?: boolean;
  }) => {
    const toastId = toast.loading("Logging in...");
    const deviceDetails = await getDeviceInfo();

    const result = await loginReq({
      ...payload,
      deviceDetails,
    });

    if (result?.success) {
      setShowModal(false);

      const decoded = jwtDecode(result.data.accessToken) as {
        role: string;
        status: string;
      };
      if (decoded.role === USER_ROLE.FLEET_MANAGER) {
        setCookie("accessToken", result.data.accessToken, 7);
        setCookie("refreshToken", result.data.refreshToken, 365);
        toast.success(result?.message || "Login successful!", {
          id: toastId,
        });

        // get and save fcm token
        setTimeout(() => {
          getAndSaveFcmToken(result.data.accessToken);
        }, 1000);

        switch (decoded.status) {
          case "PENDING":
          case "SUBMITTED":
          case "REJECTED":
            router.push("/become-agent/registration-status");
            return;
          case "APPROVED":
            if (redirect) {
              router.push(redirect);
              return;
            }
            router.push("/agent/dashboard");
            return;
        }
        return;
      }
      toast.error("You are not a fleet manager", { id: toastId });
      return;
    }

    toast.error(result.message || "Login failed", { id: toastId });
    console.log(result);

    if (result.message === "LIMIT_EXCEEDED") {
      setShowModal(true);
    }
  };

  const onSubmit = async (data: LoginFormInputs) => {
    login(data);
  };

  const clearSession = async () => {
    await login({
      email: form.getValues("email"),
      password: form.getValues("password"),
      forceLogin: true,
    });
  };

  useEffect(() => {
    if (params.get("sessionExpired")) {
      toast.error(
        "Your session has expired as this device is no longer authorized.",
      );
    }
  }, [params]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-tr from-[#FFE0F4] via-white to-[#FFD1E0] overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute w-72 h-72 rounded-full bg-[#DC3173]/20 top-10 left-10 blur-3xl animate-blob"></div>
      <div className="absolute w-64 h-64 rounded-full bg-[#FF8FB6]/30 bottom-20 right-20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute w-56 h-56 rounded-full bg-[#DC3173]/10 top-1/2 left-1/3 blur-3xl animate-blob animation-delay-1000"></div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-10 bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          {t("welcome_back")}
        </h1>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Mail className="absolute top-1/2 left-1 transform -translate-y-1/2 text-gray-500" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="pl-12 pr-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-[#DC3173] 
                           focus:ring focus:ring-[#DC3173]/20
                            focus:border-[#DC3173] transition-all duration-300 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Lock className="absolute top-1/2 left-1 transform -translate-y-1/2 text-gray-500" />
                    </FormLabel>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-[#DC3173] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-12 pr-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-[#DC3173] 
                           focus:ring focus:ring-[#DC3173]/20
                            focus:border-[#DC3173] transition-all duration-300 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 flex items-center justify-center gap-2 rounded-full bg-[#DC3173] text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {t("login")} <Send className="w-4 h-4" />
            </button>
          </form>
        </Form>

        {/* Forgot Password */}
        <p className="text-gray-400 text-center mt-4">
          {t("forgot_password")}{" "}
          <Link
            href="/forgot-password"
            className="text-pink-400 font-medium hover:underline"
          >
            {t("reset_here")}
          </Link>
        </p>

        <p className="mt-6 text-center text-gray-700 text-sm">
          {t("donot_have_an_account")}{" "}
          <Link
            href="/become-agent"
            className="text-[#DC3173] font-medium hover:underline"
          >
            {t("register_fleet_manager")}
          </Link>
        </p>
      </div>

      <ClearSessionModal
        open={showModal}
        onOpenChange={(open) => setShowModal(open)}
        onRemove={clearSession}
      />

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
