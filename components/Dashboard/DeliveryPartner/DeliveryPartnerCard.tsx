import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { USER_STATUS } from "@/consts/user.const";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { motion } from "framer-motion";
import { Calendar, Mail, Phone, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  partner: TDeliveryPartner;
}

export default function DeliveryPartnerCard({ partner }: IProps) {
  const router = useRouter();
  const getStatusVariant = (status: keyof typeof USER_STATUS) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-600";
      case "SUBMITTED":
        return "bg-blue-600";
      case "APPROVED":
        return "bg-[#DC3173]";
      case "REJECTED":
        return "bg-destructive";
      default:
        return "default";
    }
  };

  const fullName = partner.name
    ? `${partner.name.firstName || ""} ${partner.name.lastName || ""}`.trim()
    : "No Name";

  const formattedDate = partner.createdAt
    ? new Date(partner.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <motion.div
      className="w-full"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      layout
    >
      <Card className="overflow-hidden border-2 hover:border-[#DC3173] transition-all duration-200 py-0">
        <CardHeader className="relative pb-0 pt-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-[#DC3173]">
              {partner.profilePhoto ? (
                <Image
                  src={partner.profilePhoto}
                  alt={fullName}
                  className="h-full w-full object-cover"
                  width={500}
                  height={500}
                />
              ) : (
                <span className="text-2xl font-bold text-[#DC3173]">
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <Badge
                className={getStatusVariant(partner.status)}
                variant="default"
              >
                {partner.status}
              </Badge>
              <div className="flex items-center mt-1">
                {partner.operationalData?.rating && (
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">
                      {partner.operationalData.rating.average.toFixed(1)}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({partner.operationalData.rating.totalReviews} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold mb-4">{fullName}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 text-[#DC3173] mr-2" />
              <span>{partner.email}</span>
              {partner.isEmailVerified && (
                <Badge variant="outline" className="ml-2 bg-green-50">
                  Verified
                </Badge>
              )}
            </div>
            {partner.contactNumber && (
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-[#DC3173] mr-2" />
                <span>{partner.contactNumber}</span>
              </div>
            )}
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 text-[#DC3173] mr-2" />
              <span>Joined: {formattedDate}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between pt-0! px-0 bg-[#DC3173] hover:bg-[#DC3173]/90 h-12">
          <Button
            variant="link"
            size="sm"
            onClick={() => router(`/delivery-partner/${partner.userId}`)}
            className=" w-full py-3 text-white"
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
