"use client";

import ImagePreview from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerDetails.tsx/DeliveryPartnerImagePreview";
import InfoRow from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerDetails.tsx/DeliveryPartnerInfoRow";
import DeliveryPartnerSection from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerDetails.tsx/DeliveryPartnerSection";
import DeliveryPartnerStatusBadge from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerDetails.tsx/DeliveryPartnerStatusBadge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowLeftCircle,
  Bike,
  Briefcase,
  CalendarClock,
  Car,
  CreditCard,
  FileText,
  Gavel,
  Mail,
  MapPin,
  Motorbike,
  Package,
  Phone,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  partner: TDeliveryPartner;
}

export const DeliveryPartnerDetails = ({ partner }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const fullName =
    `${partner?.name?.firstName || ""} ${partner?.name?.lastName || ""
      }`.trim() || "No Name Provided";

  const getVehicleIcon = () => {
    switch (partner.vehicleInfo?.vehicleType) {
      case "BICYCLE":
      case "SCOOTER":
      case "E-BIKE":
        return <Bike className="w-5 h-5" />;
      case "MOTORBIKE":
        return <Motorbike className="w-5 h-5" />;
      default:
        return <Car className="w-5 h-5" />;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Button
          onClick={() => router.push("/agent/delivery-partners")}
          variant="link"
          className="inline-flex items-center text-sm gap-2 text-[#DC3173] px-0! py-0 h-4 cursor-pointer"
        >
          <ArrowLeftCircle /> {t("go_back")}
        </Button>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-[#DC3173] text-white p-6 rounded-t-lg"
      >
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="w-20 h-20 rounded-full bg-white/20 overflow-hidden flex items-center justify-center"
          >
            {partner.profilePhoto ? (
              <Image
                src={partner.profilePhoto}
                alt={fullName}
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
            ) : (
              <User className="w-10 h-10 text-white/70" />
            )}
          </motion.div>
          <div className="flex-1">
            <motion.h2
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="text-2xl font-bold"
            >
              {fullName}
            </motion.h2>
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="flex items-center space-x-1 text-white/80"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">{partner.email}</span>
            </motion.div>
            {partner?.contactNumber && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
                className="flex items-center space-x-1 text-white/80"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{partner?.contactNumber}</span>
              </motion.div>
            )}
          </div>
          <div className="flex flex-col justify-end items-end gap-1">
            <DeliveryPartnerStatusBadge status={partner.status} />
            {partner?.remarks && <p className="hidden md:block text-sm">{partner?.remarks}</p>}
          </div>
        </div>
      </motion.div>
      <div className="bg-gray-50 my-4 rounded-b-lg">
        <DeliveryPartnerSection
          title={t("personal_details")}
          icon={<User />}
          defaultOpen={true}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div>
              <InfoRow label={t("full_name")} value={fullName} />
              <InfoRow label={t("email")} value={partner.email} />
              <InfoRow
                label={t("contact_number")}
                value={partner?.contactNumber || "N/A"}
              />
              <InfoRow
                label={t("gender")}
                value={partner.personalInfo?.gender || "N/A"}
              />
            </div>
            <div>
              <InfoRow
                label={t("date_of_birth")}
                value={
                  partner.personalInfo?.dateOfBirth
                    ? format(partner.personalInfo?.dateOfBirth, "dd/MM/yyyy")
                    : "N/A"
                }
              />
              <InfoRow
                label={t("nationality")}
                value={partner.personalInfo?.nationality || "N/A"}
              />
              <InfoRow
                label={t("email_verified")}
                value={
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${partner.isEmailVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {partner.isEmailVerified ? "Yes" : "No"}
                  </span>
                }
              />
              <InfoRow
                label={t("id_expiry_date")}
                value={
                  partner.personalInfo?.idExpiryDate
                    ? format(partner.personalInfo?.idExpiryDate, "dd/MM/yyyy")
                    : "N/A"
                }
              />
            </div>
          </div>
        </DeliveryPartnerSection>
        <DeliveryPartnerSection title={t("address")} icon={<MapPin />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div>
              <InfoRow
                label={t("street")}
                value={partner?.address?.street || "N/A"}
              />
              <InfoRow label={t("city")} value={partner?.address?.city || "N/A"} />
            </div>
            <div>
              <InfoRow label={t("state")} value={partner?.address?.state || "N/A"} />
              <InfoRow
                label={t("country")}
                value={partner?.address?.country || "N/A"}
              />
              <InfoRow
                label={t("zip_code")}
                value={partner?.address?.postalCode || "N/A"}
              />
            </div>
          </div>
        </DeliveryPartnerSection>
        <DeliveryPartnerSection
          title={t("vehicle_information")}
          icon={getVehicleIcon()}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div>
              <InfoRow
                label={t("vehicle_type")}
                value={partner.vehicleInfo?.vehicleType || "N/A"}
              />
              <InfoRow
                label={t("brand")}
                value={partner.vehicleInfo?.brand || "N/A"}
              />
              <InfoRow
                label={t("model")}
                value={partner.vehicleInfo?.model || "N/A"}
              />
              <InfoRow
                label={t("license_plate")}
                value={partner.vehicleInfo?.licensePlate || "N/A"}
              />
            </div>
            <div>
              <InfoRow
                label={t("driving_license_number")}
                value={partner.vehicleInfo?.drivingLicenseNumber || "N/A"}
              />
              <InfoRow
                label={t("license_expiry")}
                value={
                  partner.vehicleInfo?.drivingLicenseExpiry
                    ? format(
                      partner.vehicleInfo?.drivingLicenseExpiry,
                      "dd/MM/yyyy"
                    )
                    : "N/A"
                }
              />
              <InfoRow
                label={t("insurance_policy_number")}
                value={partner.vehicleInfo?.insurancePolicyNumber || "N/A"}
              />
              <InfoRow
                label={t("insurance_expiry")}
                value={
                  partner.vehicleInfo?.insuranceExpiry
                    ? format(partner.vehicleInfo?.insuranceExpiry, "dd/MM/yyyy")
                    : "N/A"
                }
              />
            </div>
          </div>
        </DeliveryPartnerSection>
        <DeliveryPartnerSection title={t("bank_details")} icon={<CreditCard />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div>
              <InfoRow
                label={t("bank_name")}
                value={partner.bankDetails?.bankName || "N/A"}
              />
              <InfoRow
                label={t("account_holder")}
                value={partner.bankDetails?.accountHolderName || "N/A"}
              />
            </div>
            <div>
              <InfoRow
                label={t("iban")}
                value={partner.bankDetails?.iban || "N/A"}
              />
              <InfoRow
                label={t("swift_code")}
                value={partner.bankDetails?.swiftCode || "N/A"}
              />
            </div>
          </div>
        </DeliveryPartnerSection>
        <DeliveryPartnerSection title={t("legal_status")} icon={<Gavel />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div>
              <InfoRow
                label={t("residence_permit_type")}
                value={partner.legalStatus?.residencePermitType || "N/A"}
              />
              <InfoRow
                label={t("residence_permit_number")}
                value={partner.legalStatus?.residencePermitNumber || "N/A"}
              />
            </div>
            <div>
              <InfoRow
                label={t("permit_expiry_date")}
                value={
                  partner.legalStatus?.residencePermitExpiry
                    ? format(
                      partner.legalStatus?.residencePermitExpiry,
                      "dd/MM/yyyy"
                    )
                    : "N/A"
                }
              />
              <InfoRow
                label={t("criminal_record_certification")}
                value={
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${partner.criminalRecord?.certificate
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {partner.criminalRecord?.certificate
                      ? t("provided")
                      : t("not_provided")}
                  </span>
                }
              />
            </div>
          </div>
        </DeliveryPartnerSection>
        <DeliveryPartnerSection title={t("documents")} icon={<FileText />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-6">
            {partner.documents?.idProofFront && (
              <div>
                <div className="mb-2 text-gray-500 text-sm">{t("id_proof_front")}</div>
                <ImagePreview
                  url={partner.documents?.idProofFront}
                  alt="ID Prrof"
                />
              </div>
            )}
            {partner.documents?.idProofBack && (
              <div>
                <div className="mb-2 text-gray-500 text-sm">{t("id_proof_back")}</div>
                <ImagePreview
                  url={partner.documents?.idProofBack}
                  alt="ID Prrof"
                />
              </div>
            )}
            {partner.documents?.drivingLicenseFront && (
              <div>
                <div className="mb-2 text-gray-500 text-sm">
                  {t("driving_license_front")}
                </div>
                <ImagePreview
                  url={partner.documents.drivingLicenseFront}
                  alt="Driving License"
                />
              </div>
            )}
            {partner.documents?.drivingLicenseBack && (
              <div>
                <div className="mb-2 text-gray-500 text-sm">
                  {t("driving_license_back")}
                </div>
                <ImagePreview
                  url={partner.documents.drivingLicenseBack}
                  alt="Driving License"
                />
              </div>
            )}
            {partner.documents?.vehicleRegistration && (
              <div>
                <div className="mb-2 text-gray-500 text-sm">
                  {t("vehicle_registration")}
                </div>
                <ImagePreview
                  url={partner.documents.vehicleRegistration}
                  alt="Vehicle Registration"
                />
              </div>
            )}
            {partner.documents?.criminalRecordCertificate && (
              <div>
                <div className="mb-2 text-gray-500 text-sm">
                  {t("criminal_record_certificate")}
                </div>
                <ImagePreview
                  url={partner.documents.criminalRecordCertificate}
                  alt="Criminal Record"
                />
              </div>
            )}
            {partner.documents?.activity && (
              <div>
                <div className="mb-2 text-gray-500 text-sm">
                  {t("criminal_record_certificate")}
                </div>
                <ImagePreview
                  url={partner.documents.activity}
                  alt="Criminal Record"
                />
              </div>
            )}
            {partner.documents?.insurancePolicy && (
              <div>
                <div className="mb-2 text-gray-500 text-sm">
                  {t("criminal_record_certificate")}
                </div>
                <ImagePreview
                  url={partner.documents.insurancePolicy}
                  alt="Criminal Record"
                />
              </div>
            )}
          </div>
        </DeliveryPartnerSection>
        <DeliveryPartnerSection title={t("operational_data")} icon={<Package />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-gray-500 text-xs mb-1">{t("total_deliveries")}</div>
              <div className="text-2xl font-bold text-gray-900">
                {partner.operationalData?.totalDeliveries || 0}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-gray-500 text-xs mb-1">{t("completed")}</div>
              <div className="text-2xl font-bold text-green-600">
                {partner.operationalData?.completedDeliveries || 0}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-gray-500 text-xs mb-1">{t("cancelled")}</div>
              <div className="text-2xl font-bold text-red-600">
                {partner.operationalData?.canceledDeliveries || 0}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-gray-500 text-xs mb-1">{t("rating")}</div>
              <div className="text-2xl font-bold text-amber-500 flex items-center justify-center">
                {partner?.rating?.average.toFixed(1) || "N/A"}{" "}
                <Star className="w-4 h-4 ml-1" fill="currentColor" />
              </div>
              <div className="text-xs text-gray-500">
                {partner?.rating?.totalReviews || 0} {t("reviews")}
              </div>
            </div>
          </div>
          {partner.earnings && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {t("earnings")}
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">
                    {t("total_earnings")}
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    €{partner.earnings.totalEarnings?.toFixed(2) || "0.00"}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">
                    {t("pending_earnings")}
                  </div>
                  <div className="text-xl font-bold text-[#DC3173]">
                    €{partner.earnings.pendingEarnings?.toFixed(2) || "0.00"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DeliveryPartnerSection>
        <DeliveryPartnerSection title={t("work_preferences")} icon={<Briefcase />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div>
              <InfoRow
                label={t("preferred_zones")}
                value={
                  partner.workPreferences?.preferredZones?.join(", ") ||
                  t("none_specified")
                }
              />
              <InfoRow
                label={t("preferred_hours")}
                value={
                  partner.workPreferences?.preferredHours?.join(", ") ||
                  t("none_specified")
                }
              />
              <InfoRow
                label={t("worked_with_other_platforms")}
                value={
                  partner.workPreferences?.workedWithOtherPlatform
                    ? "Yes"
                    : "No"
                }
              />
              {partner.workPreferences?.workedWithOtherPlatform && (
                <InfoRow
                  label={t("platform_name")}
                  value={
                    partner.workPreferences?.otherPlatformName ||
                    t("not_specified")
                  }
                />
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {t("equipment")}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${partner.workPreferences?.hasEquipment?.isothermalBag
                      ? "bg-[#DC3173]"
                      : "bg-gray-300"
                      }`}
                  ></div>
                  <span className="text-sm text-gray-700">{t("isothermal_bag")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${partner.workPreferences?.hasEquipment?.helmet
                      ? "bg-[#DC3173]"
                      : "bg-gray-300"
                      }`}
                  ></div>
                  <span className="text-sm text-gray-700">{t("helmet")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${partner.workPreferences?.hasEquipment?.powerBank
                      ? "bg-[#DC3173]"
                      : "bg-gray-300"
                      }`}
                  ></div>
                  <span className="text-sm text-gray-700">{t("power_bank")}</span>
                </div>
              </div>
            </div>
          </div>
        </DeliveryPartnerSection>
        <DeliveryPartnerSection
          title={t("account_information")}
          icon={<CalendarClock />}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div>
              <InfoRow
                label={t("account_created")}
                value={
                  partner.createdAt
                    ? format(partner.createdAt, "dd/MM/yyyy")
                    : "N/A"
                }
              />
              <InfoRow
                label={t("last_updated")}
                value={
                  partner.updatedAt
                    ? format(partner.updatedAt, "dd/MM/yyyy")
                    : "N/A"
                }
              />
              <InfoRow
                label={t("submitted_for_approval")}
                value={
                  partner.submittedForApprovalAt
                    ? format(partner.submittedForApprovalAt, "dd/MM/yyyy")
                    : "N/A"
                }
              />
            </div>
            <div>
              <InfoRow
                label={t("approved_rejected_blocked_at")}
                value={
                  partner.approvedOrRejectedOrBlockedAt
                    ? format(
                      partner.approvedOrRejectedOrBlockedAt,
                      "dd/MM/yyyy"
                    )
                    : "N/A"
                }
              />
              {partner.remarks && (
                <InfoRow label={t("remarks")} value={partner.remarks} />
              )}
            </div>
          </div>
        </DeliveryPartnerSection>
      </div>
    </div>
  );
};
