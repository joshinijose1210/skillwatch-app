import { PageContent } from '@components';
import Grid from '@components/layout/Grid';
import { Badge } from '@components/reusableComponents/Badge/Badge';
import RatingsHeader from '@components/reusableComponents/RatingsHeader';
import { Text } from '@medly-components/core';
import { DotsLoader } from '@medly-components/loaders';
import { defaultTheme } from '@theme';
import { FC, memo } from 'react';
import { ChartAnalytics } from './ChartAnalytics/ChartAnalytics';
import ChartSection from './ChartSection';
import { Demographic } from './Demographic/Demographic';
import Rankings from './Rankings';
import { Container, ContentWrapper, StyledHeading } from './ReportsAnalytics.styled';
import { useReportsAnalytics } from './useReportsAnalytics';

export const ReportsAnalytics: FC = memo(() => {
    const { employeesCount, isCompanyInfoLoading, reviewCycle, ratingsInfo, isRatingsLoading, analyticsData, isAnalyticsDataLoading } =
        useReportsAnalytics();

    return (
        <PageContent>
            <Grid row={true} expanded justify="space-between" marginBottom={2}>
                <StyledHeading textVariant="h4" textWeight="Medium">
                    Analytics
                </StyledHeading>
                <Badge bgColor={defaultTheme.customColors.badgeGreyBgColor} pd="0.8rem 2rem">
                    <Grid columnGap={1} alignItems="center">
                        {isCompanyInfoLoading ? (
                            <DotsLoader />
                        ) : (
                            <Text textVariant="h4" textWeight="Strong">
                                {employeesCount ?? 0}
                            </Text>
                        )}
                        <Text color={defaultTheme.customColors.badgeTypoColor}>Active Employees</Text>
                    </Grid>
                </Badge>
            </Grid>
            <Container>
                <RatingsHeader title="Ratings" ratingList={ratingsInfo} isLoading={isRatingsLoading} reviewCycle={reviewCycle} />
                <ContentWrapper>
                    <ChartSection reviewCycleId={reviewCycle} />
                    <Rankings reviewCycleId={reviewCycle} />
                </ContentWrapper>

                <Demographic demographics={analyticsData} isLoading={isAnalyticsDataLoading} />
                <ChartAnalytics analyticsData={analyticsData} isLoading={isAnalyticsDataLoading} />
            </Container>
        </PageContent>
    );
});

ReportsAnalytics.displayName = 'ReportsAnalytics';
