export interface RatingBadge {
    rating: number;
    subTitle: string;
    titleColor: string;
    bgColor: string;
}

export type Props = {
    title: string;
    ratingList: RatingBadge[];
    reviewCycle?: string | number;
    isLoading: boolean;
};
