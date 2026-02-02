"use client";

import DashboardPageHeader from '@/components/common/DashboardPageHeader/DashboardPageHeader';
import { useTranslation } from '@/hooks/use-translation';
import { TDeliveryPartner } from '@/types/delivery-partner.type';
import { motion } from 'framer-motion';
import AllDrivers from './AllDrivers';
import TrackingMapView from './TrackingMapView';
import PaginationComponent from '@/components/Filtering/PaginationComponent';
import { useState } from 'react';

interface IProps {
    data: TDeliveryPartner[];
    meta: {
        page: number
        limit: number
        total: number
        totalPage: number
    }
}

const LiveTracking = ({ deliveryPartners }: { deliveryPartners: IProps }) => {
    const { t } = useTranslation();
    const [selectedPartner, setSelectedPartner] = useState<TDeliveryPartner | null>();

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
                    title={t("live_delivery_partner_tracking")}
                    desc={t("tracking_drivers_live_location_and_where_they_are")}
                />

                <div className='my-5 grid grid-cols-12 gap-5'>
                    <div className='col-span-4'>
                        <AllDrivers
                            deliveryPartners={deliveryPartners}
                            selectedPartner={selectedPartner as TDeliveryPartner}
                            setSelectedPartner={setSelectedPartner}
                        />
                    </div>
                    <div className='col-span-8'>
                        <TrackingMapView selectedPartner={selectedPartner as TDeliveryPartner} />
                    </div>
                </div>

                {!!deliveryPartners?.meta?.totalPage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 md:px-6"
                    >
                        <PaginationComponent
                            totalPages={deliveryPartners?.meta?.totalPage as number}
                        />
                    </motion.div>
                )}

            </motion.div>
        </div>
    );
};

export default LiveTracking;