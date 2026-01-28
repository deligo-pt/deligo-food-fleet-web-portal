import { SOS_ISSUE_TAGS } from "@/consts/sos.const";
import { TUserRole } from "./user.type";

export type TSosIssueTag = (typeof SOS_ISSUE_TAGS)[number];

export type TSosStatus =
    | 'ACTIVE'
    | 'INVESTIGATING'
    | 'RESOLVED'
    | 'FALSE_ALARM';

export interface ISos {
    _id: string;
    userId: {
        id: {
            name: {
                firstName: string;
                lastName: string;
            },
            userId: string;
            _id: string;
        };
        model: 'Vendor' | 'FleetManager' | 'DeliveryPartner';
        role: TUserRole;
    };
    orderId?: string;
    role: TUserRole;
    status: TSosStatus;
    userNote?: string;
    issueTags?: TSosIssueTag[];
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    deviceSnapshot?: {
        batteryLevel?: number;
        deviceModel?: string;
        osVersion?: string;
        appVersion?: string;
        networkType?: string;
    };

    resolvedBy?: string;
    resolvedAt?: Date;

    createdAt: Date;
    updatedAt: Date;
};
