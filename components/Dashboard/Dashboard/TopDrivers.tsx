"use client"

import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";


const TopDrivers = ({ deliveryPartners }: { deliveryPartners: Partial<TDeliveryPartner>[] }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">{t("top_rated_drivers")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {deliveryPartners?.map((partner, index) => (
          <motion.div
            key={partner?._id}
            className="bg-gray-50 rounded-lg overflow-hidden"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div className="p-2">
              <div className="flex flex-row justify-between items-center">
                <h4 className="font-medium">{partner?.name?.firstName}{" "}{partner?.name?.lastName}</h4>
                <Badge>{partner?.personalInfo?.gender}</Badge>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <StarIcon
                    size={16}
                    className="text-amber-400 mr-1"
                    fill="currentColor"
                  />
                  <span className="text-sm">{partner.operationalData?.rating?.average}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {partner.operationalData?.totalDeliveries} {t("deliveries")}
                </span>
              </div>

              <div className="mt-2">
                <div className="flex items-center">
                  <p className="text-sm">{partner.personalInfo?.nationality}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm">{partner?.vehicleInfo?.vehicleType}</p>
                  <p className="text-sm">{partner?.vehicleInfo?.brand}</p>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default TopDrivers;
