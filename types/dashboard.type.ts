import { IDeliveryPartnerCard } from "./delivery-partner.type"

export interface IDashboardAnalytics {
    cards: {
        availabilityRate: string
        deliveriesToday: {
            avgPerPartner: string
            total: number
        }
        onlineNow: {
            count: number
            percentage: string
        }
        totalPartners: number
    }

    fleetComposition: {
        vehicle: string
        count: number
    }[]

    partnerStatus: {
        offline: number
        onDelivery: number
        waiting: number
    }

    topRatedDrivers: IDeliveryPartnerCard[]
}
