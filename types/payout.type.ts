export type UserRole = "ADMIN" | "FLEET_MANAGER" | "DELIVERY_PARTNER" | "VENDOR";

export interface PayoutName {
    firstName: string;
    lastName: string;
}

export interface PayoutSender {
    _id: string;
    name: PayoutName;
    role: UserRole;
}

export interface PayoutUser {
    _id: string;
    userId: string;
    name: PayoutName;
    NIF?: string;
    profilePhoto?: string;
    role?: UserRole;
    email?: string;
    contactNumber?: string;
}

export interface BankDetails {
    accountHolderName?: string;
    bankName?: string;
    accountNumber?: string;
    iban?: string;
    swiftCode?: string;
}

/** Classic payout (vendor / general) */
export interface IPayout {
    _id: string;
    payoutId: string;
    amount: number;
    status: "PENDING" | "PROCESSING" | "PAID" | "REJECTED" | "FAILED";
    paymentMethod: "BANK_TRANSFER" | "CASH" | string;
    payoutCategory?: "PAID_TO_PARTNER" | string;
    remarks?: string;
    payoutProof?: string | null;
    bankDetails?: BankDetails;
    bankReferenceId?: string;

    userId: PayoutUser;
    userModel: "DeliveryPartner" | "Vendor";

    senderId: PayoutSender;
    senderModel: "FleetManager" | "Admin";

    createdAt: string;
    updatedAt: string;
    __v?: number;
}

/** Rider settlement initiated by Fleet Manager */
export interface TRiderSettlementOrder {
    _id: string;
    orderId: string;
    orderStatus: string;
    createdAt: string;
}

export interface TRiderSettlementBreakdown {
    orderId: string;
    grossEarnings: number;
    fleetFee: number;
    riderSlice: number;
}

export interface TRiderSettlementPerson {
    _id: string;
    userId: string;
    name: PayoutName;
    email?: string;
    contactNumber?: string;
    profilePhoto?: string;
}

export interface TRiderSettlement {
    _id: string;
    fleetManagerId: TRiderSettlementPerson;
    deliveryPartnerId: TRiderSettlementPerson;
    totalAmount: number;
    orderIds: TRiderSettlementOrder[];
    breakdown: TRiderSettlementBreakdown[];
    status: "PENDING" | "PROCESSING" | "PAID" | "FAILED" | string;
    createdAt: string;
    updatedAt: string;
    __v?: number;

    // optional fields that may appear after settlement
    payoutProof?: string | null;
    bankReferenceId?: string;
    remarks?: string;
    paymentMethod?: string;
}