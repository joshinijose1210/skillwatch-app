import { reviewRatingOptionsChip } from '@constants/data';
import { Chip, Text } from '@medly-components/core';
import { ChipDiv, ChipDivNotGiven, ChipNotGiven, TextNotGiven } from './RatingChip.styled';
import { RatingChipProps } from './types';

export const RatingChip: React.FC<RatingChipProps> = ({ rating, isInReviewTimeline }) => {
    if (rating !== -1)
        return (
            <ChipDiv border={reviewRatingOptionsChip[Math.floor(rating) - 1].color}>
                <Chip color={reviewRatingOptionsChip[Math.floor(rating) - 1].color} label={String(rating.toFixed(1))} />
                <Text textColor={reviewRatingOptionsChip[Math.floor(rating) - 1].color} textVariant="body2" textWeight="Medium">
                    {reviewRatingOptionsChip[Math.floor(rating) - 1].label}
                </Text>
            </ChipDiv>
        );
    else
        return (
            <ChipDivNotGiven>
                <ChipNotGiven label="0" />
                <TextNotGiven textVariant="body2" textWeight="Medium">
                    {isInReviewTimeline ? 'Not yet given.' : 'N/A'}
                </TextNotGiven>
            </ChipDivNotGiven>
        );
};
