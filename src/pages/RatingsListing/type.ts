export interface RatingsData {
    checkInRating: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    reviewCycleId: number;
}

export interface RatingsListing {
    ratingListing: RatingsData[];
    ratingListingCount: number;
}

export interface ReviewCycleOptions {
    label: string;
    value: string | number;
}

export interface LocationState {
    title: string;
    reviewCycle: string | number;
    ratingLabel: string;
}
