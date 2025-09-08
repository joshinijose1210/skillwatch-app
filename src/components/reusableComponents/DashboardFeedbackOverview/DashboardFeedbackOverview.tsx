import { StyledEmptyText } from '@common';
import { Text } from '@medly-components/core';
import { ThumbUpIcon } from '@medly-components/icons';
import { ReactComponent as Appreciation } from '../../../constants/images/icons/apprIcon.svg';
import { ReactComponent as ImprovementIcon } from '../../../constants/images/icons/improvement.svg';
import ListHeader from '../ListHeader';
import { Loader } from '../Loader';
import { Item, ItemsWrapper, ListHeaderDiv, StyledBox } from './DashboardFeedbackOverview.styled';
import { useDashboardFeedbackOverview } from './useDashboardFeedbackOverview';

export const DashboardFeedbackOverview = () => {
    const { isLoading, handleViewAll, feedbackOverview } = useDashboardFeedbackOverview();

    if (isLoading) {
        return <Loader />;
    }
    return (
        <StyledBox>
            <ListHeaderDiv>
                {feedbackOverview && feedbackOverview.startDate ? (
                    <ListHeader
                        title="Feedback Overview"
                        titleVariant="h4"
                        actionButtonLabel="View All"
                        actionButtonVariant="flat"
                        actionButtonClick={handleViewAll}
                        moduleTitle="Received Feedback"
                    />
                ) : (
                    <ListHeader title="Feedback Overview" titleVariant="h4" moduleTitle="Received Feedback" />
                )}
            </ListHeaderDiv>

            <ItemsWrapper>
                {feedbackOverview && feedbackOverview.startDate ? (
                    <>
                        <Item>
                            <ThumbUpIcon />
                            <Text textVariant="h4" textWeight="Medium">
                                Positive
                            </Text>
                            <Text textVariant="h4" textWeight="Medium">
                                {feedbackOverview.positive}
                            </Text>
                        </Item>
                        <Item scaleUpSvg>
                            <ImprovementIcon />
                            <Text textVariant="h4" textWeight="Medium">
                                Improvement
                            </Text>
                            <Text textVariant="h4" textWeight="Medium">
                                {feedbackOverview.improvement}
                            </Text>
                        </Item>
                        <Item scaleUpSvg>
                            <Appreciation />
                            <Text textVariant="h4" textWeight="Medium">
                                Appreciation
                            </Text>
                            <Text textVariant="h4" textWeight="Medium">
                                {feedbackOverview.appreciation}
                            </Text>
                        </Item>
                    </>
                ) : (
                    <StyledEmptyText>No Feedback Overview found for the current Review Cycle</StyledEmptyText>
                )}
            </ItemsWrapper>
        </StyledBox>
    );
};
