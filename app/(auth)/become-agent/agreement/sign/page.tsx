import AgreementViewer from "@/components/BecomeAgent/AgreementViewer";
import { getSingleAgreement } from "@/services/dashboard/agreement/agreement.service";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


interface IProps {
    searchParams: Promise<{ agreementId: string }>;
}

const AgreementSignPage = async ({ searchParams }: IProps) => {
    const agreementId = (await searchParams).agreementId || "";
    const data = await getSingleAgreement(agreementId);

    const accessToken = (await cookies()).get("accessToken")?.value || "";
    const decoded = jwtDecode(accessToken) as { userId: string };

    return (
        <div>
            <AgreementViewer agreement={data?.data} fleetId={decoded?.userId} />
        </div>
    );
};

export default AgreementSignPage;