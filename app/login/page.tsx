"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, Send } from "lucide-react";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function PremiumLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#FFE0F4] via-[#fff] to-[#FFD1E0] overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute w-72 h-72 rounded-full bg-[#DC3173]/20 top-10 left-10 blur-3xl animate-blob"></div>
      <div className="absolute w-64 h-64 rounded-full bg-[#FF8FB6]/30 bottom-20 right-20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute w-56 h-56 rounded-full bg-[#DC3173]/10 top-1/2 left-1/3 blur-3xl animate-blob animation-delay-1000"></div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-10 bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Welcome Back
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-[#DC3173] focus:ring focus:ring-[#DC3173]/20 transition-all duration-300`}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:border-[#DC3173] focus:ring focus:ring-[#DC3173]/20 transition-all duration-300`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-[#DC3173] transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <p className="mt-1 text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2 rounded-full bg-[#DC3173] text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Login <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700 text-sm">
          Don&apos;t have an account?{" "}
          <a href="/become-agent" className="text-[#DC3173] font-medium hover:underline">
            Register Agent
          </a>
        </p>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
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
