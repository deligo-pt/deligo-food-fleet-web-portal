import { USER_STATUS } from "@/consts/user.const";

export type TFleetManager = {
  // ---------------------------------------------
  // Core Identifiers
  // ---------------------------------------------
  _id?: string;
  userId: string;
  registeredBy?: string;
  role: 'FLEET_MANAGER';
  email: string;
  password: string;

  status: keyof typeof USER_STATUS;
  isEmailVerified: boolean;
  isDeleted: boolean;
  isUpdateLocked: boolean;

  // Push notifications
  fcmTokens?: string[];

  // --------------------------------------------------------
  // Pending temporary Email and contact number
  // --------------------------------------------------------
  pendingEmail?: string;
  pendingContactNumber?: string;

  // ---------------------------------------------
  // OTP & Password Reset
  // ---------------------------------------------
  otp?: string;
  isOtpExpired?: Date;

  passwordResetToken?: string;
  passwordResetTokenExpiresAt?: Date;
  passwordChangedAt?: Date;

  // ---------------------------------------------
  // Personal Information
  // ---------------------------------------------
  name?: {
    firstName?: string;
    lastName?: string;
  };

  contactNumber?: string;
  profilePhoto?: string;

  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    longitude?: number;
    latitude?: number;
    geoAccuracy?: number;
  };

  currentSessionLocation?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
    accuracy?: number; // GPS Accuracy in meters
    lastLocationUpdate: Date; // Timestamp for data freshness
  };

  // ---------------------------------------------
  // Business Details
  // ---------------------------------------------
  businessDetails?: {
    businessName: string;
    businessLicenseNumber?: string;
    NIF?: string;
    totalBranches?: number;
  };

  businessLocation?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude?: number;
    longitude?: number;
    geoAccuracy?: number;
  };

  // ---------------------------------------------
  // Bank & Payment Information
  // ---------------------------------------------
  bankDetails?: {
    bankName: string;
    accountHolderName: string;
    iban: string;
    swiftCode: string;
  };

  // ---------------------------------------------
  // Documents & Verification
  // ---------------------------------------------
  documents?: IDocs;

  // ---------------------------------------------
  // Operational Data
  // ---------------------------------------------
  operationalData?: {
    totalDrivers: number;
    activeVehicles?: number;
    totalDeliveries?: number;
  };

  // ---------------------------------------------
  // Security & Access
  // ---------------------------------------------
  twoFactorEnabled?: boolean;
  loginDevices?: { deviceId: string; lastLogin: Date | string }[];

  // ---------------------------------------------
  // Admin Workflow / Audit
  // ---------------------------------------------
  approvedBy?: string;
  rejectedBy?: string;
  blockedBy?: string;

  submittedForApprovalAt?: Date;
  approvedOrRejectedOrBlockedAt?: Date;

  remarks?: string;

  rating?: {
    average: number;
    totalReviews: number;
  };

  // ---------------------------------------------
  // Timestamps
  // ---------------------------------------------
  createdAt: Date;
  updatedAt: Date;
};

export interface IDocs {
  myPhoto?: string;
  idProofFront?: string;
  idProofBack?: string;
  businessLicense?: string;
};

export type TFleetManagerImageDocuments = {
  docImageTitle: 'idProofFront' | 'idProofBack' | 'businessLicense';
};