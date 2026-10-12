"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getFleetManagerProfile } from "@/services/getFleetManagerInfo/getFleetManagerInfo";
import { logoutReq } from "@/services/auth/auth";
import { getCurrentAgreementVersion } from "@/services/dashboard/agreement/agreement.service";
import { IAgreement } from "@/types/agreement.type";
import AgreementViewer from "@/components/BecomeAgent/AgreementViewer";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/use-translation";
import { FileText } from "lucide-react";

interface Props {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();

    const [mustResign, setMustResign] = useState(false);
    const [agreement, setAgreement] = useState<IAgreement | null>(null);

    // ─────────────────────────────────────────────
    // 1. Account Blocked check
    // ─────────────────────────────────────────────
    const checkBlocked = useCallback(async () => {
        try {
            const { data } = await getFleetManagerProfile();

            if (data?.success === false && data?.errorKey === "ACCOUNT_BLOCKED") {
                await logoutReq().catch(() => { });
                router.replace("/login?clearSession=true&blocked=true");
            }
        } catch (e) {
            console.error("AuthGuard – blocked check error:", e);
        }
    }, [router]);

    // ─────────────────────────────────────────────
    // 2. New Agreement version check
    // ─────────────────────────────────────────────
    const checkAgreement = useCallback(async () => {
        try {
            const res = await getCurrentAgreementVersion();
            const data = res?.data as IAgreement | undefined;

            // status === true  →  admin published a new version, force re-sign
            if (data?.status) {
                setAgreement(data);
                setMustResign(true);
            } else {
                setAgreement(null);
                setMustResign(false);
            }
        } catch (e) {
            console.error("AuthGuard – agreement check error:", e);
        }
    }, []);

    // Run both checks on mount + route change
    useEffect(() => {
        let cancelled = false;

        async function run() {
            if (cancelled) return;
            await Promise.all([checkBlocked(), checkAgreement()]);
        }

        run();

        // Re-check every 45 seconds while tab is open
        const interval = setInterval(run, 45_000);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [pathname, checkBlocked, checkAgreement]);

    // Called after successful re-sign inside AgreementViewer
    const handleAgreementSigned = () => {
        setMustResign(false);
        setAgreement(null);
        router.refresh();
    };

    return (
        <>
            {children}

            {/* ───────── Force Re-sign Agreement Modal (non-dismissible) ───────── */}
            <Dialog open={mustResign} onOpenChange={() => { /* prevent close */ }}>
                <DialogContent
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    className="
      w-[95vw] 
      min-w-[50vw] 
      max-w-6xl 
      max-h-[92vh] 
      overflow-y-auto 
      p-0 
      gap-0
      sm:w-[85vw]
      md:w-[75vw]
      lg:w-[70vw]
    "
                >
                    <DialogTitle className="sr-only">
                        {t("re_sign_agreement") || "Re-sign Agreement"}
                    </DialogTitle>

                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#DC3173]/10 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-[#DC3173]" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900 text-lg">
                                {t("re_sign_agreement") || "New Agreement Available"}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {t("review_nd_sign_the_agreement_below") ||
                                    "Please review and sign the updated agreement to continue using the platform."}
                            </p>
                        </div>
                    </div>

                    {/* Agreement content */}
                    {/* Agreement content */}
<div className="p-0 md:p-2 w-full h-full">
  {agreement ? (
    <div className="w-full min-h-[70vh]">
      <AgreementViewer
        agreement={agreement}
        type="re-sign"
        onSuccess={handleAgreementSigned}
      />
    </div>
  ) : (
    <div className="py-16 text-center text-gray-500 text-sm">
      Loading agreement...
    </div>
  )}
</div>
                </DialogContent>
            </Dialog>
        </>
    );
}