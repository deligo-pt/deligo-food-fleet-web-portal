"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { USER_STATUS } from "@/consts/user.const";
import { useTranslation } from "@/hooks/use-translation";
import { TFleetManager } from "@/types/fleet-manager.type";
import { removeCookie } from "@/utils/cookies";
import { motion } from "framer-motion";
import {
    Award,
    Ban,
    CheckCircle2,
    CircleX,
    Clock,
    LoaderCircle,
    LoaderIcon,
    ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    profile: {
        data: TFleetManager
    };
};

const RegistrationStatus = ({ profile }: Props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [status] = useState(profile?.data?.status || "");
    const [remarks] = useState(profile?.data?.remarks as string || "");

    const logOut = () => {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        toast.success("Logout successfully!")
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-pink-50 to-[#DC3173]/10 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl"
            >
                <Card className="rounded-3xl shadow-2xl border border-[#DC3173]/20 overflow-hidden backdrop-blur-sm bg-white/90">
                    <CardHeader className="bg-linear-to-r from-[#DC3173] to-pink-600 text-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-white/20 p-3">
                                {status === USER_STATUS.PENDING && (
                                    <LoaderIcon className="w-7 h-7 text-white" />
                                )}
                                {status === USER_STATUS.SUBMITTED && (
                                    <CheckCircle2 className="w-7 h-7 text-white" />
                                )}
                                {status === USER_STATUS.APPROVED && (
                                    <Award className="w-7 h-7 text-white" />
                                )}
                                {status === USER_STATUS.REJECTED && (
                                    <CircleX className="w-7 h-7 text-white" />
                                )}
                            </div>
                            <CardTitle className="text-2xl font-bold tracking-wide">
                                {status === USER_STATUS.PENDING && t("registration_pending")}
                                {status === USER_STATUS.SUBMITTED && t("registration_completed")}
                                {status === USER_STATUS.APPROVED && t("registration_approved")}
                                {status === USER_STATUS.REJECTED && t("registration_rejected")}
                            </CardTitle>
                        </div>
                        <p className="mt-2 text-sm text-white/90 max-w-xl">
                            {status === USER_STATUS.PENDING && t("you_didnot_submit")}
                            {status === USER_STATUS.SUBMITTED && t("you_submitted")}
                            {status === USER_STATUS.APPROVED && t("submission_approved")}
                            {status === USER_STATUS.REJECTED && t("submission_rejected")}
                        </p>
                    </CardHeader>

                    <CardContent className="p-8 space-y-8">
                        {status === USER_STATUS.PENDING && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
                            >
                                <div className="rounded-full bg-[#DC3173]/10 p-4">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    >
                                        <LoaderCircle className="w-10 h-10 text-[#DC3173]" />
                                    </motion.div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {t("submissionInProgress")}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        {t("submissionProgressDesc")}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                        {status === USER_STATUS.SUBMITTED && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
                                >
                                    <div className="rounded-full bg-[#DC3173]/10 p-4">
                                        <Clock className="w-10 h-10 text-[#DC3173]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {t("reviewInProgress")}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                            {t("reviewInProgressDesc")}{" "}
                                            <span className="font-medium text-[#DC3173]">
                                                {t("hours24_48")}
                                            </span>{" "}
                                            {t("reviewInProgressDesc2")}
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
                                >
                                    <div className="rounded-full bg-green-100 p-4">
                                        <ShieldCheck className="w-10 h-10 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {t("nextStep")}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                            {t("nextStepDesc")}{" "}
                                            <span className="font-semibold text-green-600">
                                                {t("verifiedPartner")}
                                            </span>{" "}
                                            {t("nextStepDesc2")}
                                        </p>
                                    </div>
                                </motion.div>
                            </>
                        )}
                        {status === USER_STATUS.APPROVED && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
                            >
                                <div className="rounded-full bg-[#DC3173]/10 p-4">
                                    <ShieldCheck className="w-10 h-10 text-[#DC3173]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {t('approvedByAdmin')}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        {remarks}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                        {status === USER_STATUS.REJECTED && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
                            >
                                <div className="rounded-full bg-[#DC3173]/10 p-4">
                                    <Ban className="w-10 h-10 text-[#DC3173]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {t("rejectedByAdmin")}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        {remarks}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="pt-6 text-center"
                        >
                            {status === USER_STATUS.PENDING && (
                                <>
                                    <Button
                                        className="px-8 py-3 bg-[#DC3173] hover:bg-[#b72a63] text-white rounded-xl text-lg font-medium shadow-lg transition-all duration-300"
                                        onClick={() =>
                                            router.push("/become-agent/personal-details")
                                        }
                                    >
                                        {t("submitDetails")}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="px-8 py-3 border-destructive text-destructive hover:text-white hover:bg-destructive rounded-xl text-lg font-medium shadow-lg transition-all duration-300 ml-2"
                                        onClick={logOut}
                                    >
                                        {t("logout")}
                                    </Button>

                                    <p className="text-xs text-gray-500 mt-3">
                                        {t("applicationStatus")}
                                    </p>
                                </>
                            )}
                            {status === USER_STATUS.SUBMITTED && (
                                <>
                                    <Button
                                        className="px-8 py-3 bg-[#DC3173] hover:bg-[#b72a63] text-white rounded-xl text-lg font-medium shadow-lg transition-all duration-300"
                                        onClick={() => router.push("/")}
                                    >
                                        {t("goToHome")}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="px-8 py-3 border-destructive text-destructive hover:text-white hover:bg-destructive rounded-xl text-lg font-medium shadow-lg transition-all duration-300 ml-2"
                                        onClick={logOut}
                                    >
                                        {t("logout")}
                                    </Button>

                                    <p className="text-xs text-gray-500 mt-3">
                                        {t("applicationApproved")}
                                    </p>
                                </>
                            )}
                            {status === USER_STATUS.APPROVED && (
                                <>
                                    <Button
                                        className="px-8 py-3 bg-[#DC3173] hover:bg-[#b72a63] text-white rounded-xl text-lg font-medium shadow-lg transition-all duration-300"
                                        onClick={logOut}
                                    >
                                        {t("loginAgain")}
                                    </Button>

                                    <p className="text-xs text-gray-500 mt-3">
                                        {t("loginAgainDesc")}
                                    </p>
                                </>
                            )}
                            {status === USER_STATUS.REJECTED && (
                                <>
                                    <Button
                                        className="px-8 py-3 bg-[#DC3173] hover:bg-[#b72a63] text-white rounded-xl text-lg font-medium shadow-lg transition-all duration-300"
                                        onClick={logOut}
                                    >
                                        {t("submitDetailsAgain")}
                                    </Button>

                                    <p className="text-xs text-gray-500 mt-3">
                                        {t("applicationTryAgain")}
                                    </p>
                                </>
                            )}
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};


export default RegistrationStatus;
