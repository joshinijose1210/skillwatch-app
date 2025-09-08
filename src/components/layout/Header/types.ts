export interface NotificationData {
    toastMessage: string;
    onClick: (e: any) => void;
}

export interface LocationData {
    action: string;
    from: string;
}

export interface BreadcrumbItemData {
    match: any;
    location: any;
    key: string;
    breadcrumb: any;
}

export interface MyComponentProps {
    route: string;
    employeeName: string;
    breadCrumbValue: string;
    breadcrumbLength: boolean;
}

export interface ReviewCycle {
    organisationId: number;
    reviewCycleId: number;
    startDate: number;
    endDate: number;
    publish: boolean;
    lastModified: number;
    selfReviewStartDate: number;
    selfReviewEndDate: number;
    managerReviewStartDate: number;
    managerReviewEndDate: number;
    checkInWithManagerStartDate: number;
    checkInWithManagerEndDate: number;
}
