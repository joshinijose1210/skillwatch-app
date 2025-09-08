import { ReviewDataType } from '@components/MetricsTable/types';

export interface kpi {
    // id?: number;
    id: string;
    title: string;
    kraId: number;
    kraName: string;
    description: string;
    status?: boolean;
    teamName?: string;
    teamId?: string;
    response: string;
    rating: string;
    manager1Response?: string;
    manager1Rating?: string;
    manager2Response?: string;
    manager2Rating?: string;
    checkInResponse?: string;
    checkInRating?: string;
    responseError: string;
    ratingError: string;
}

export interface handleInputProps {
    kpiId: number;
    name: 'response' | 'rating';
    value: string;
}

export interface Error {
    status: number;
    data: any;
}

export interface ReviewCycleInfo {
    reviewDetailsId?: number;
    reviewCycleId?: number;
    reviewTo?: string;
    reviewFrom?: string;
    draft?: boolean;
    published?: boolean;
    name?: string;
}

export type KpiRecords = Record<string, string[]>;
export interface ReviewDataObjectType extends ReviewDataType {
    title: string;
}

export interface InputHandlerProps {
    id: string | number;
    name: string;
    value: string;
}
