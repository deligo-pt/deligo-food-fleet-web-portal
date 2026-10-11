
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getFleetManagerProfile } from "@/services/getFleetManagerInfo/getFleetManagerInfo";
import { logoutReq } from "@/services/auth/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let cancelled = false;

        async function check() {
            try {
                const { data } = await getFleetManagerProfile();
                if (cancelled) return;

                if (data?.success === false && data?.errorKey === "ACCOUNT_BLOCKED") {
                    await logoutReq().catch(() => { });
                    router.replace("/login?clearSession=true&blocked=true");
                }
            } catch (e) {
                console.log("error", e);
            }
        }

        check();

        // also re-check every 30–60 seconds while the tab is open
        const interval = setInterval(check, 45_000);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [pathname, router]);

    return <>{children}</>;
}