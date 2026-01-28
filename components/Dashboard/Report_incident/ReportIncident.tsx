'use client';

import DashboardPageHeader from '@/components/common/DashboardPageHeader/DashboardPageHeader';
import { useTranslation } from '@/hooks/use-translation';
import { motion } from 'framer-motion';
import SosReportCard from './SosReportCard';

const ReportIncident = () => {
    const { t } = useTranslation();

    return (
        <div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
            >
                <DashboardPageHeader
                    title={t("report_incident")}
                    desc={t("send_us_your_accidents_and_incidents")}
                />
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='max-w-2xl mx-auto my-20'
            >
                <SosReportCard />
            </motion.div>

        </div>
    );
};

export default ReportIncident;