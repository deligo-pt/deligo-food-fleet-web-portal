import { TMeta } from ".";

export type UserRole =
  | "DELIVERY_PARTNER"
  | "FLEET_MANAGER"
  | "ADMIN"
  | "CUSTOMER";
export type PayoutStatus = "PENDING" | "PROCESSING" | "PAID" | "FAILED";
export type PaymentMethod = "BANK_TRANSFER" | "MOBILE_BANKING" | "CASH";
export type PayoutCategory =
  | "PAID_TO_PARTNER"
  | "RECEIVED_FROM_ADMIN"
  | "GENERAL";

interface UserName {
  firstName: string;
  lastName: string;
}

interface PayoutUser {
  _id: string;
  userId?: string;
  name: UserName;
  role: UserRole;
  profilePhoto?: string;
}

export interface PayoutData {
  _id: string;
  payoutId: string;
  userId: PayoutUser;
  userModel: "Vendor" | "DeliveryPartner" | "FleetManager";
  senderId: PayoutUser;
  senderModel: "FleetManager" | "Admin";
  amount: number;
  status: PayoutStatus;
  paymentMethod: PaymentMethod;
  payoutCategory: PayoutCategory;
  bankDetails?: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    iban?: string;
    swiftCode?: string;
  };
  bankReferenceId?: string;
  payoutProof?: string;
  remarks?: string;

  failedAt?: Date;
  failedReason?: string;

  retryAt?: Date;
  retryRemarks?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PayoutResponse {
  success: boolean;
  data: PayoutData[];
  message?: string;
  meta: TMeta;
}
