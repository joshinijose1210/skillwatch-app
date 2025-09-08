import { Loader } from '@components';
import { Text } from '@medly-components/core';
import { FC, memo } from 'react';
import { TileTitle } from '../ChartSection/ChartSection.styled';
import { EmployeeInfo } from './EmployeeInfo/EmployeeInfo';
import { IEmployeeInfo } from './EmployeeInfo/types';
import { RankingDetailsWrapper, StyledBox, TitleHeader } from './Rankings.styled';
import { useRankings } from './useRankings';

export const Rankings: FC<{ reviewCycleId: string }> = memo(({ reviewCycleId }) => {
    const { rankings, isLoading } = useRankings(reviewCycleId);

    return (
        <StyledBox>
            <TitleHeader>
                <TileTitle textVariant="h4">Top 5 Performers</TileTitle>
            </TitleHeader>
            <RankingDetailsWrapper>
                {isLoading && <Loader />}
                {!isLoading &&
                    (rankings?.length ? (
                        rankings?.map((ranking: IEmployeeInfo) => (
                            <EmployeeInfo
                                key={ranking.id}
                                employeeId={ranking.employeeId}
                                firstName={ranking.firstName}
                                lastName={ranking.lastName}
                                checkInRating={ranking.checkInRating}
                            />
                        ))
                    ) : (
                        <Text>Ranking will be shown once Check-in with Manager is submitted</Text>
                    ))}
            </RankingDetailsWrapper>
        </StyledBox>
    );
});

Rankings.displayName = 'Rankings';
