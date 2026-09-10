import Re_SignAgreement from "@/components/Profile/Re_SignAgreement";
import { getCurrentAgreementVersion } from "@/services/dashboard/agreement/agreement.service";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


const Re_SignAgreementPage = async () => {
    const { data } = await getCurrentAgreementVersion();
    const accessToken = (await cookies()).get("accessToken")?.value || "";
    const decoded = jwtDecode(accessToken) as { userId: string };

    return (
        <div>
            <Re_SignAgreement agreement={data} fleetId={decoded?.userId as string} />
        </div>
    );
};

export default Re_SignAgreementPage;