import SearchFilter from "@/components/Filtering/SearchFilter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { ArrowUp, RefreshCcw, Search, Star } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IProps {
    deliveryPartners: {
        data: TDeliveryPartner[];
        meta: {
            page: number
            limit: number
            total: number
            totalPage: number
        };
    };
    selectedPartner: TDeliveryPartner;
    setSelectedPartner: (value: TDeliveryPartner | null) => void;
}

const AllDrivers = ({ deliveryPartners, selectedPartner, setSelectedPartner }: IProps) => {
    const router = useRouter();
    const { t } = useTranslation();
    const [, startTransition] = useTransition();

    const handleViewLocation = (deliveryPartner: TDeliveryPartner) => {
        if (!deliveryPartner?.currentSessionLocation?.coordinates) {
            toast.error("Driver hasn't updated his location yet");
        }
        setSelectedPartner(deliveryPartner);
    };

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
            setSelectedPartner(null);
        })
    }

    return (
        <div className="bg-white p-2 md:p-3 xl:p-5 rounded-xl h-screen w-full space-y-5">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg font-semibold">All Drivers</h1>
                <Button
                    variant="ghost"
                    className="hover:bg-pink-600 hover:text-white"
                    onClick={handleRefresh}
                >
                    <RefreshCcw className="h-4 w-4" />
                </Button>

            </div>
            <SearchFilter paramName="searchTerm" placeholder="Search driver" className="w-full" />
            <Separator />

            {deliveryPartners?.data?.length > 0 && (
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-500">
                        {t("showing")}{" "}
                        {((deliveryPartners.meta?.page || 1) - 1) *
                            (deliveryPartners.meta?.limit || 10) +
                            1}
                        -
                        {(deliveryPartners.meta?.page || 1) *
                            (deliveryPartners.meta?.limit || 10)}{" "}
                        {t("of")} {deliveryPartners.meta?.total || 0} {t("partners")}
                    </p>
                </div>
            )}
            {/* delivery partners */}
            {deliveryPartners?.data?.length > 0 ? (
                <motion.div
                    layout
                    className={deliveryPartners?.data?.length > 6 ? "overflow-y-scroll h-auto space-y-3" : "space-y-3"}
                >
                    <AnimatePresence>
                        {deliveryPartners?.data?.map((partner: TDeliveryPartner) => (
                            <div
                                key={partner?._id}
                                className="flex flex-wrap items-center justify-between gap-2 border rounded-xl p-4 hover:bg-gray-50 transition">

                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                                        {(
                                            (partner?.name?.firstName?.[0] || "") +
                                            (partner?.name?.lastName?.[0] || "")
                                        ).toUpperCase()}
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {partner?.name?.firstName} {partner?.name?.lastName}
                                        </p>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                            {partner?.rating?.average ? partner?.rating?.average : "Unrated"}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleViewLocation(partner)}
                                    className={`flex items-center gap-2 ${selectedPartner?._id === partner?._id ? "bg-gray-200 text-black hover:bg-gray-400" : "bg-[#DC3173] hover:bg-[#DC3173]/90 text-white"} px-4 py-2 rounded-lg text-sm font-medium`}
                                >
                                    <ArrowUp className="w-4 h-4" />
                                    {selectedPartner?._id === partner?._id ? "Selected" : "View Location"}
                                </button>
                            </div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">{t("no_partners_found")}</h3>
                    <p className="text-gray-500 max-w-md">
                        {t("no_delivery_partners_match")}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default AllDrivers;