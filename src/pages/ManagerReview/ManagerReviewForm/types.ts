export interface kpi {
    id: number;
    kpiId: string;
    kraId: number;
    kraName: string;
    title: string;
    description: string;
    status: boolean;
    teamName: string;
    teamId: string;
    response: string;
    rating: string;
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
    reviewToId?: string;
    reviewFromId?: string;
    draft?: boolean;
    published?: boolean;
    name?: string;
}

export interface InputHandlerProps {
    id: string | number;
    name: string;
    value: string;
}
