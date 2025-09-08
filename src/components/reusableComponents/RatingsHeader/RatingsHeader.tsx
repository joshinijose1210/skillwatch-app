import { routeConstants } from '@constants';
import { Text } from '@medly-components/core';
import { DotsLoader } from '@medly-components/loaders';
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeWrapper, Container, StyledBadge, StyledRatingCardText, TileTitle } from './RatingsHeader.styled';
import { Props } from './types';

export const RatingsHeader: FC<Props> = memo(({ title, ratingList, isLoading, reviewCycle }) => {
    const navigate = useNavigate();
    const handleNavigation = useCallback(
        (title: string) => {
            navigate(routeConstants.ratings, {
                state: { title: `${title.split(' ')[0].toLowerCase()}${title.split(' ')?.[1] ?? ''}`, reviewCycle, ratingLabel: title }
            });
        },
        [navigate, reviewCycle]
    );
    return (
        <Container>
            <TileTitle textVariant="h4">{title}</TileTitle>
            <BadgeWrapper>
                {ratingList.map((ratingItem, index) => (
                    <StyledBadge
                        key={`${ratingItem.subTitle}_${index}`}
                        bgColor={ratingItem.bgColor}
                        onClick={() => handleNavigation(ratingItem.subTitle)}
                    >
                        {isLoading ? (
                            <DotsLoader />
                        ) : (
                            <Text textVariant="h2" textWeight="Strong" textColor={ratingItem.titleColor}>
                                {ratingItem.rating}
                            </Text>
                        )}
                        <StyledRatingCardText>{ratingItem.subTitle}</StyledRatingCardText>
                    </StyledBadge>
                ))}
            </BadgeWrapper>
        </Container>
    );
});

RatingsHeader.displayName = 'RatingsHeader';
