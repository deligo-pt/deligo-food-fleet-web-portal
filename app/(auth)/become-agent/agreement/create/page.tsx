import CreateAgreement from "@/components/BecomeAgent/CreateAgreement";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


const CreateAgreementPage = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value || "";
    const decoded = jwtDecode(accessToken) as { userId: string };

    return (
        <div>
            <CreateAgreement fleetId={decoded?.userId} />
        </div>
    );
};

export default CreateAgreementPage;