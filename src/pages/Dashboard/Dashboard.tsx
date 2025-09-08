import { Loader, PageContent } from '@components';
import { Grid } from '@components/layout/Grid/Grid';
import { DashboardActionItems } from '@components/reusableComponents/DashboardActionItems';
import { DashboardAppreciation } from '@components/reusableComponents/DashboardAppreciation/DashboardAppreciation';
import { DashboardFeedback } from '@components/reusableComponents/DashboardFeedback';
import { StyledModalActions, StyledModalContent } from '@components/TutorialCardModal/TutorialCardModal.styled';
import { routeConstants } from '@constants';
import { addToast, Button, Modal } from '@medly-components/core';
import { TUTORIALS_DATA } from '@pages/Tutorial/constants';
import format from 'date-fns/format';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Buttons, ChartContainer, Heading, LeftSection, SubText } from './Dashboard.styled';
import LineChartTile from './LineChartTile';
import PieChartTile from './PieChartTile';
import { useDashboard } from './useDashboard';
import IframeVideo from '@components/reusableComponents/IframeVideo';
import { StyledVideoModal } from '@common';

export const Dashboard: FC = () => {
    const { data, isLoading, userDetails, modalState, toggleModal, handleGiveFeedback, handleGiveSelfReview, handleOnboardingDone } =
        useDashboard();

    const state = useLocation().state as any;

    useEffect(() => {
        if (state?.error) {
            addToast({
                variant: 'error',
                header: state.header,
                message: state.message
            });
        }
    }, [state]);
    window.history.replaceState({}, document.title);

    if (isLoading) {
        return <Loader />;
    } else if (userDetails.isSuperAdmin) {
        return <Navigate to={routeConstants.superAdminRoot} />;
    }

    // "Temporarily commented out as per requirement, might be added back later"

    // else if (userDetails && !userDetails.onboardingFlow && userDetails.roleName === 'Org Admin') {
    //     return <Navigate to={routeConstants.firstDepartment} />;
    // }
    else
        return (
            <PageContent>
                <StyledVideoModal minHeight="707px" minWidth="1099px" open={modalState} onCloseModal={toggleModal}>
                    <StyledModalContent>
                        <IframeVideo videoId={TUTORIALS_DATA[0].videoId} />
                    </StyledModalContent>
                    <StyledModalActions>
                        <Button variant="solid" onClick={handleOnboardingDone}>
                            Done
                        </Button>
                    </StyledModalActions>
                </StyledVideoModal>

                <Grid row={true} expanded justify="space-between" marginBottom={2}>
                    <LeftSection>
                        {data && data[0] && data[0].startDate ? (
                            <>
                                <Heading textVariant="h4" textWeight="Medium">
                                    Review Cycle
                                </Heading>
                                <SubText textVariant="body2" textColor="#86888A">
                                    {format(new Date(data[0].startDate), 'do MMM yyyy')} to{' '}
                                    {format(new Date(data[0].endDate), 'do MMM yyyy')}
                                </SubText>
                            </>
                        ) : (
                            <Heading textVariant="h4" textWeight="Medium">
                                No Review Cycle is active at the moment.
                            </Heading>
                        )}
                    </LeftSection>
                    <Buttons>
                        <Button data-testid="addFeedbackBtn" size="S" onClick={handleGiveFeedback}>
                            Add Feedback
                        </Button>
                        <Button
                            size="S"
                            data-testid="reviewBtn"
                            onClick={handleGiveSelfReview}
                            disabled={
                                data && data[0] && data[0]
                                    ? new Date(data[0].selfReviewStartDate) > new Date()
                                        ? true
                                        : new Date(data[0].selfReviewEndDate + 86400000) < new Date() &&
                                          (!data[0].selfReviewPublish || data[0].selfReviewDraft)
                                        ? true
                                        : data[0].selfReviewPublish
                                        ? true
                                        : false
                                    : true
                            }
                        >
                            Add Self Review
                        </Button>
                    </Buttons>
                </Grid>
                <ChartContainer>
                    <PieChartTile />
                    <LineChartTile />
                    {/* <EmptyChart /> */}
                </ChartContainer>
                <DashboardAppreciation reviewCycleId={data?.[0]?.reviewCycleId ?? -1} />
                <DashboardFeedback reviewCycleId={data?.[0]?.reviewCycleId ?? -1} />
                <DashboardActionItems />
            </PageContent>
        );
};
