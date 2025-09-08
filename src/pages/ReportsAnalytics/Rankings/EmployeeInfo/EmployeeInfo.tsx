import { Avatar, Box, Text } from '@medly-components/core';
import { defaultTheme } from '@theme';
import { FC, memo, useMemo } from 'react';
import { ReactComponent as StarIcon } from '../../../../constants/images/icons/starIcon.svg';
import { InfoWrapper, RankingDetail, StyledBadge } from '../Rankings.styled';
import { IEmployeeInfo } from './types';

export const EmployeeInfo: FC<IEmployeeInfo> = memo(({ firstName, lastName, employeeId, checkInRating }) => {
    const acronym = useMemo(() => `${firstName?.charAt(0)?.toUpperCase()}${lastName?.charAt(0)?.toUpperCase()}`, [firstName, lastName]);
    return (
        <RankingDetail>
            <InfoWrapper>
                <Avatar size="M">{acronym}</Avatar>
                <Box display="flex" bg="inherit">
                    <Text textVariant="body2" textWeight="Strong">{`${firstName} ${lastName}`}</Text>
                    <Text className="employeeId" textColor="#999">
                        {employeeId}
                    </Text>
                </Box>
            </InfoWrapper>
            <StyledBadge bgColor={defaultTheme.customColors.ratingBgColor}>
                <StarIcon />
                <Text textVariant="body1" textWeight="Strong" textColor="#3872D2">
                    {checkInRating.toFixed(1)}
                </Text>
            </StyledBadge>
        </RankingDetail>
    );
});

EmployeeInfo.displayName = 'EmployeeInfo';
