export type UserRole = 'ADMIN' | 'FLEET_MANAGER' | 'DELIVERY_PARTNER' | 'VENDOR';

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
    profilePhoto: string;
    role: UserRole;
}

export interface BankDetails {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    iban: string;
    swiftCode: string;
}

export interface IPayout {
    _id: string;
    payoutId: string;
    amount: number;
    status: 'PENDING' | 'PROCESSING' | 'PAID' | 'REJECTED';
    paymentMethod: 'BANK_TRANSFER' | 'CASH' | string;
    payoutCategory: 'PAID_TO_PARTNER' | string;
    remarks: string;
    payoutProof?: string | null;
    bankDetails: BankDetails;
    bankReferenceId?: string;

    // User being paid
    userId: PayoutUser;
    userModel: 'DeliveryPartner' | 'Vendor';

    // Person who initiated/processed
    senderId: PayoutSender;
    senderModel: 'FleetManager' | 'Admin';

    createdAt: string;
    updatedAt: string;
    __v: number;
}