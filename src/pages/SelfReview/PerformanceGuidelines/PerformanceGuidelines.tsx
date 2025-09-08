import { Loader, PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { usePerformanceGuidelines } from './usePerformanceGuidelines';
import { Text } from '@medly-components/core';
import * as Styled from './PerformanceGuidelines.styled';
import { KraType } from '@pages/KraManagement/useKraManagement';
import HelpBox from './HelpBox';
import { Step, StepsList } from '@pages/FeedbackForm/FeedbackTipsDesc.styles';
import { useLocation } from 'react-router-dom';

export const PerformanceGuidelines = () => {
    const {
        handleAddSelfReview,
        handleManagerReview,
        handleNavigation,
        kras,
        firstName,
        lastName,
        groupedKpis,
        reviewToEmployeeId,
        reviewCycle,
        isKrasLoading,
        initialKpiLoading,
        actionButtonLabel,
        defaultKpiRating,
        isReviewTimelineLoading,
        ManagerReviewLoading
    } = usePerformanceGuidelines();
    const path = useLocation().pathname;

    if (initialKpiLoading || isKrasLoading || isReviewTimelineLoading || ManagerReviewLoading) return <Loader />;

    return (
        <PageContent>
            <ListHeader title="Performance Guidelines" actionButtonLabel={actionButtonLabel} actionButtonClick={handleNavigation} />

            {(path.includes(`team's-review`) ||
                path.includes(`team's-check-in`) ||
                path.includes('reports/performance-review/performance-guidelines')) && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem',
                        marginBottom: '2rem'
                    }}
                >
                    <Text style={{ fontSize: '14px' }} textVariant="body1" textWeight="Medium">
                        Team member:{' '}
                        <Text textVariant="body1" textWeight="Regular">
                            {firstName} {lastName} ({reviewToEmployeeId})
                        </Text>
                    </Text>
                    <Text style={{ fontSize: '14px' }} textVariant="body1" textWeight="Medium">
                        Review Cycle:{' '}
                        <Text textVariant="body1" textWeight="Regular">
                            {reviewCycle}
                        </Text>
                    </Text>
                </div>
            )}

            <Text textVariant="h4" textWeight="Medium">
                Weightage
            </Text>
            <Styled.Section>
                <Styled.Container>
                    <Styled.KrasContainer>
                        {kras?.map((kra: KraType, index: number) => (
                            <Styled.Kra key={index}>
                                <Text textVariant="h3" style={{ fontSize: '30px' }} textWeight="Strong">
                                    {kra.weightage}%
                                </Text>
                                <Text textVariant="h4" style={{ fontSize: '14px' }} textWeight="Regular">
                                    {kra.name}
                                </Text>
                            </Styled.Kra>
                        ))}
                    </Styled.KrasContainer>

                    <Styled.MetricsContainer>
                        <Styled.FlexRow>
                            <Text textVariant="h4" textWeight="Medium">
                                Performance Metrics Preview
                            </Text>
                            <Text textVariant="h4" textWeight="Medium">
                                Value
                            </Text>
                        </Styled.FlexRow>

                        {groupedKpis &&
                            Object.entries(groupedKpis).map(([kraName, kpis]: [string, string[]]) => (
                                <Styled.KpiItemContainer key={kraName}>
                                    <Text style={{ fontSize: '14px' }} className={'KPI-title'} textVariant="h4" textWeight="Medium">
                                        {kraName}
                                    </Text>

                                    <StepsList>
                                        {kpis.map((kpi, index) => (
                                            <Step
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}
                                                key={index}
                                            >
                                                <Text style={{ fontSize: '14px' }} textVariant="h4" textWeight="Regular">
                                                    {kpi}
                                                </Text>
                                                <Text style={{ fontSize: '14px' }} textVariant="h4" textWeight="Regular">
                                                    {defaultKpiRating}
                                                </Text>
                                            </Step>
                                        ))}
                                    </StepsList>
                                </Styled.KpiItemContainer>
                            ))}
                    </Styled.MetricsContainer>
                </Styled.Container>
                <HelpBox />
            </Styled.Section>
        </PageContent>
    );
};
