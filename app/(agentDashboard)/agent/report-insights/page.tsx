import ReportInsights from "@/components/Dashboard/Emergency_sos/ReportInsights/ReportInsights";
import { getPartnerSosAlerts } from "@/services/dashboard/sos/sos.service";
import { queryStringFormatter } from "@/utils/formatter";

type IProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const ReportInsightsPage = async ({ searchParams }: IProps) => {
    const params = await searchParams;
    const queryString = queryStringFormatter(params);
    const sosAlerts = await getPartnerSosAlerts(queryString);

    return (
        <div>
            <ReportInsights sosAlerts={sosAlerts} />
        </div>
    );
};

export default ReportInsightsPage;