
export const ORDER_STATUS = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    AWAITING_PARTNER: 'AWAITING_PARTNER',
    DISPATCHING: 'DISPATCHING',
    ASSIGNED: 'ASSIGNED',
    REASSIGNMENT_NEEDED: 'REASSIGNMENT_NEEDED',
    PREPARING: 'PREPARING',
    READY_FOR_PICKUP: 'READY_FOR_PICKUP',
    PICKED_UP: 'PICKED_UP',
    ON_THE_WAY: 'ON_THE_WAY',
    DELIVERED: 'DELIVERED',
    CANCELED: 'CANCELED',
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;


export type TAddress = {
    label?: 'Home' | 'Work' | 'Other';
    street: string;
    city: string;
    state?: string;
    country?: string;
    postalCode?: string;
    latitude: number;
    longitude: number;
    geoAccuracy?: number;
};

export interface TOfferApplied {
    rewardSnapshot?: Record<string, unknown>;
    promoId: string;
    title: string;
    promoType: string;
    discountType: string;
    discountValue: number;
    maxDiscountAmount?: number | null;
}

export interface TOrderAddress {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    longitude: number;
    latitude: number;
    geoAccuracy: number | null;
    detailedAddress: string;
}

export interface TOrder {
    _id: string;
    orderId: string;

    customerId: {
        _id: string;
        userId: string;
        role: string;
        name: {
            firstName: string;
            lastName: string;
        };
        profilePhoto?: string;
        contactNumber?: string;
        NIF?: string;
        currentSessionLocation?: {
            type: string;
            coordinates: number[];
            geoAccuracy?: number;
            isMocked?: boolean;
            lastLocationUpdate?: string;
        };
    };

    vendorId: {
        _id: string;
        userId: string;
        role: string;
        name: {
            firstName: string;
            lastName: string;
        };
        contactNumber?: string;
        businessDetails?: {
            businessName: string;
            openingHours?: string;
            closingHours?: string;
            closingDays?: string[];
            businessType?: {
                _id: string;
                name: {
                    en: string;
                    pt: string;
                };
            };
        };
        documents?: {
            storePhoto?: string[];
        };
    };

    deliveryPartnerId?: {
        _id: string;
        userId: string;
        role: string;
        name: {
            firstName: string;
            lastName: string;
        };
        contactNumber?: string;
        profilePhoto?: string;
        currentSessionLocation?: {
            type: string;
            coordinates: number[];
            geoAccuracy?: number;
            lastLocationUpdate?: string;
        };
    } | null;

    deliveryPartnerCancelReason?: string | null;
    fulfillmentType: string;
    emailThreadMessageId?: string;

    items: Array<{
        productId: string;
        vendorId: string;
        name: string;
        image?: string;
        hasVariations: boolean;
        variationSku?: string | null;
        isPromoRewardLine?: boolean;
        addons?: Array<{
            _id: string;
            vendorId?: string;
            title: {
                en: string;
                pt: string;
            };
            minSelectable: number;
            maxSelectable: number;
            isActive: boolean;
            isDeleted: boolean;
        }>;
        productPricing: {
            originalPrice: number;
            productDiscountAmount: number;
            discountType: string;
            priceAfterProductDiscount: number;
            promoDiscountAmount: number;
            unitPrice: number;
            lineTotal: number;
            taxRate: number;
            taxAmount: number;
        };
        itemSummary: {
            quantity: number;
            totalTaxAmount: number;
            totalPromoDiscount: number;
            totalProductDiscount: number;
            grandTotal: number;
        };
        commission: {
            deliGoCommissionRate: number;
            deliGoCommissionAmount: number;
            deliGoCommissionVatRate: number;
            deliGoCommissionVatAmount: number;
        };
        vendor: {
            vendorEarningsWithoutTax: number;
            payableTax: number;
            vendorNetEarnings: number;
        };
    }>;

    totalItems: number;
    totalQuantity: number;

    orderCalculation: {
        totalOriginalPrice: number;
        totalProductDiscount: number;
        totalOfferDiscount: number;
        totalTaxAmount: number;
        itemsSubtotal: number;
        serviceCharge: number;
        serviceChargeVatRate: number;
        serviceChargeVatAmount: number;
    };

    delivery: {
        charge: number;
        vatRate: number;
        vatAmount: number;
        totalDeliveryCharge: number;
        distance: number;
        estimatedTime: number;
        estimatedTotalMinutes?: number;
        notes?: string;
    };

    payoutSummary: {
        grandTotal: number;
        deliGoCommission: {
            rate: number;
            amount: number;
            vatAmount: number;
            totalDeduction: number;
            earnedServiceCharge: number;
            serviceChargeVatAmount: number;
            deliveryVatAmount?: number;
            totalPlatformNetRevenue: number;
            totalPlatformPayableTax: number;
            totalPlatformGrossHolding: number;
        };
        fleet: {
            rate: number;
            fee: number;
        };
        vendor: {
            earningsWithoutTax: number;
            payableTax: number;
            vendorNetPayout: number;
        };
        rider: {
            earningsWithoutTax?: number;
            payableTax?: number;
            riderNetPayout?: number;
            riderNetEarnings?: number; // legacy field, keep optional
        };
    };

    offer?: {
        isApplied: boolean;
        offerApplied: TOfferApplied | null;
    } | null;

    paymentMethod: string;
    paymentStatus: string;
    transactionId?: string;
    checkoutSummaryId?: string;
    isPaid: boolean;

    orderStatus: string;
    statusHistory: Array<{
        status: string;
        timestamp: string;
        updatedBy?: string;
        note?: string | null;
    }>;

    refundStatus: string;
    remarks?: string;
    vendorInstructions?: string;

    dispatchPartnerPool?: Array<{
        _id: string;
        name: {
            en: string;
            pt: string;
        };
        userId: string;
    }>;
    dispatchRejectedPartnerPool?: Array<{
        _id: string;
        name: {
            en: string;
            pt: string;
        };
        userId: string;
    }>;
    dispatchEscalatedAt?: string | null;
    dispatchExpiresAt?: string;

    deliveryAddress: TOrderAddress;
    pickupAddress?: TOrderAddress;

    preparationTime?: number;
    autoAcceptDeadlineAt?: string;
    estimatedReadyAt?: string;
    foodReadyAt?: string | null;
    vendorRespondedAt?: string | null;
    needMoreTimeCount?: number;

    ratingStatus?: {
        isProductRated: boolean;
        isDeliveryRated: boolean;
    };
    isRated?: boolean;

    /** Payout settlement tracking */
    payoutMetadata?: {
        vendor?: {
            isSettled: boolean;
            payoutId?: string | null;
        };
        rider?: {
            isSettled: boolean;
            payoutId?: string | null;
            payoutModel?: string;
        };
        fleet?: {
            isSettled: boolean;
            payoutId?: string | null;
        };
    };

    invoiceSync?: {
        isSynced: boolean;
        invoiceNo?: string;
        atcud?: string;
        signature?: string;
        syncedAt?: string;
        syncError?: string | null;
    };

    deliveryOtp?: {
        generatedAt?: string;
        verifiedAt?: string;
        verifiedBy?: string;
        attempts?: number;
        lockedAt?: string | null;
        generation?: number;
        resetCount?: number;
        resetAt?: string | null;
        resetBy?: string | null;
    };

    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
