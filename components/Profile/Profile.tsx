"use client";

import ProfileDoc from "@/components/Profile/ProfileDoc";
import { ProfileInfoRow } from "@/components/Profile/ProfileInfoRow";
import ProfilePhotoUpload from "@/components/Profile/ProfilePhotoUpload";
import { ProfileSection } from "@/components/Profile/ProfileSection";
import { USER_STATUS } from "@/consts/user.const";
import { useTranslation } from "@/hooks/use-translation";
import { TFleetManager } from "@/types/fleet-manager.type";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  Building2Icon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  FileTextIcon,
  HashIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";

export default function Profile({ agent }: { agent: TFleetManager }) {

  const { t } = useTranslation();
  const getStatusColor = (status: keyof typeof USER_STATUS) => {
    const colors = {
      APPROVED: "bg-green-100 text-green-700 border-green-200",
      SUBMITTED: "bg-gray-100 text-gray-700 border-gray-200",
      REJECTED: "bg-red-100 text-red-700 border-red-200",
      PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
      BLOCKED: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[status];
  };

  const accountAge = Math.floor(
    (new Date().getTime() - new Date(agent.createdAt).getTime()) /
    (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header with gradient */}
      <div className="relative bg-linear-to-r from-[#DC3173] to-[#FF6B9D] h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="px-4 md:px-6 -mt-20 pb-12">
        {/* Profile Header Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 relative"
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
          }}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <ProfilePhotoUpload currentPhoto={agent.profilePhoto} />

            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {agent.name?.firstName} {agent.name?.lastName}
                </h1>
                <motion.span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    agent.status
                  )}`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {agent.status}
                </motion.span>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  <span>{agent.email}</span>
                </div>
                {agent.isEmailVerified && (
                  <div className="flex items-center gap-1 text-[#DC3173]">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{t("verified")}</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#DC3173]" />
                  <span className="text-lg font-bold text-gray-900">
                    {accountAge}
                  </span>
                  <span className="text-sm text-gray-500">{t("days_active")}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <ProfileSection
            title={t("personal_information")}
            icon={UserIcon}
            delay={0.1}
          >
            <div className="space-y-1">
              <ProfileInfoRow
                label={t("phone_number")}
                value={agent.contactNumber}
                icon={PhoneIcon}
              />
              <ProfileInfoRow
                label={t("email")}
                value={agent.email}
                icon={MailIcon}
              />
            </div>
          </ProfileSection>

          {/* Business Details */}
          <ProfileSection
            title={t("businessDetails")}
            icon={BuildingIcon}
            delay={0.15}
          >
            <div className="space-y-1">
              <ProfileInfoRow
                label={t("business_name")}
                value={agent.businessDetails?.businessName}
                icon={BriefcaseIcon}
              />
              <ProfileInfoRow
                label={t("license_number")}
                value={agent.businessDetails?.businessLicenseNumber}
                icon={HashIcon}
              />
            </div>
          </ProfileSection>

          {/* Business Location */}
          <ProfileSection
            title={t("business_location")}
            icon={MapPinIcon}
            delay={0.2}
          >
            <div className="space-y-1">
              <ProfileInfoRow
                label={t("street_address")}
                value={`${agent.businessLocation?.streetNumber} ${agent.businessLocation?.streetAddress}`}
                icon={MapIcon}
              />
              <ProfileInfoRow
                label={t("city")}
                value={agent.businessLocation?.city}
                icon={Building2Icon}
              />
              <ProfileInfoRow
                label={t("postal_code")}
                value={agent.businessLocation?.postalCode}
                icon={HashIcon}
              />
            </div>
          </ProfileSection>

          {/* Bank Details */}
          <ProfileSection
            title={t("bankDetails")}
            icon={CreditCardIcon}
            delay={0.25}
          >
            <div className="space-y-1">
              <ProfileInfoRow
                label={t("bankName")}
                value={agent.bankDetails?.bankName}
                icon={Building2Icon}
              />
              <ProfileInfoRow
                label={t("accountHolder")}
                value={agent.bankDetails?.accountHolderName}
                icon={UserIcon}
              />
              <ProfileInfoRow
                label={t("iban")}
                value={agent.bankDetails?.iban.replace(/(.{4})/g, "$1 ")}
                icon={CreditCardIcon}
              />
              <ProfileInfoRow
                label={t("swift_code")}
                value={agent.bankDetails?.swiftCode}
                icon={HashIcon}
              />
            </div>
          </ProfileSection>

          {/* Documents */}
          <ProfileSection title={t("documents")} icon={FileTextIcon} delay={0.3}>
            <ProfileDoc documents={agent?.documents} />
          </ProfileSection>

          {/* Activity */}
          <ProfileSection
            title={t("account_activity")}
            icon={ClockIcon}
            delay={0.35}
          >
            <div className="space-y-1">
              <ProfileInfoRow
                label={t("account_created")}
                value={new Date(agent.createdAt).toLocaleDateString()}
                icon={CalendarIcon}
              />
              <ProfileInfoRow
                label={t("two_factor_auth")}
                value={agent.twoFactorEnabled ? "Enabled" : "Disabled"}
                icon={ShieldCheckIcon}
              />
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
}
