
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

export type TOrderItemSnapshot = {
    productId: string;
    name: string;
    image?: string;
    variantName?: string;
    addons?: {
        name: string;
        price: number;
        quantity: number;
    }[];
    quantity: number;

    price: number;
    taxRate?: number;
    taxAmount?: number;
    totalBeforeTax: number;
    subtotal: number;
};

export type TOrder = {
    _id?: string;

    orderId: string;

    customerId: string;
    vendorId: string;

    deliveryPartnerId?: string | null;
    deliveryPartnerCancelReason?: string | null;

    items: TOrderItemSnapshot[];

    totalItems: number;
    totalPrice: number;
    taxAmount?: number;
    deliveryCharge?: number;
    discount?: number;
    subTotal: number;

    couponId?: string | null;

    paymentMethod: 'CARD' | 'MOBILE';
    paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
    transactionId?: string;
    isPaid: boolean;

    orderStatus: OrderStatus;
    cancelReason?: string;
    rejectReason?: string;
    remarks?: string;

    deliveryOtp?: string;
    isOtpVerified?: boolean;

    dispatchPartnerPool?: string[];

    deliveryAddress: TAddress;
    pickupAddress?: TAddress;

    estimatedDeliveryTime?: string;
    deliveredAt?: Date;
    preparationTime?: number;

    isDeleted: boolean;

    rating?: {
        foodRating?: number;
        deliveryRating?: number;
        review?: string;
    };

    createdAt: Date;
    updatedAt: Date;
};
