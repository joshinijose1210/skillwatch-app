import { RatingChartData } from '@constants/data';
import { ChildDiv, LineBarContainer, ParentDiv, RatingBarContainer, RatingByText, RatingText } from './Chart.styled';
import { LineChartProps } from './types';

export const LineChart = ({ rating, ratingBy }: LineChartProps) => {
    const progress = rating * 20;
    const isValidRating = Number(rating) >= 0 && rating !== undefined;
    const ratingData = Math.floor(rating) - 1 >= 0 ? RatingChartData[Math.floor(rating) - 1] : undefined;
    return (
        <LineBarContainer>
            <RatingByText>{ratingBy}</RatingByText>
            <RatingBarContainer>
                <RatingText>{isValidRating ? String(rating.toFixed(1)) : '0.0'}</RatingText>
                <ParentDiv>
                    {!ratingData || !isValidRating ? (
                        <ChildDiv progress={progress} bgcolor="#dfe4e9" />
                    ) : (
                        <ChildDiv progress={progress} bgcolor={ratingData.color} />
                    )}
                </ParentDiv>
            </RatingBarContainer>
        </LineBarContainer>
    );
};
