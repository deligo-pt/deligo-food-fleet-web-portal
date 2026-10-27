

export type TFleetEarningsOverview = {
    grossInflow: number;
    netFleetEarnings: number;
    totalRiderPayable: number;
    riderPayable: number;
    totalSettledToRiders: number;
    monthlyEarnings: number;
    weeklyEarnings: number;
    currentUnpaidBalance: number;
};

export type TFleetEarningsGraphPoint = {
    name: string;
    earnings: number;
};

export type TFleetEarningsAnalytics = {
    overview: TFleetEarningsOverview;
    graph: TFleetEarningsGraphPoint[];
};