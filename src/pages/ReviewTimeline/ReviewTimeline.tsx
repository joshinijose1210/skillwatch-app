import { Loader, PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import TimelineIcon from '@components/reusableComponents/TimelineIcon';
import { Text } from '@medly-components/core';
import { defaultTheme } from '@theme/index';
import { format } from 'date-fns';
import { FC } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { ContentText, ContentWrapper, StyledLink, StyledLinkTitle, TimelineContentWrapper } from './ReviewTimeline.styled';
import ReviewTimelineAccordion from './ReviewTimelineAccordion';
import { contentListItem } from './types';
import { useReviewTimeline } from './useReviewTimeline';
import { reviewStatusConstants } from '@constants/reviewStatusConstants';
import ReviewCycleTips from './ReviewCycleTips';

export const ReviewTimeline: FC = () => {
    const {
        isLoading,
        data,
        itemStatus,
        employees,
        userDetails,
        handleStartReviewCycle,
        handleAddSelfReview,
        handleCheckIn,
        isManagerReviewIncomplete,
        isCheckInWithManagerIncomplete,
        modulePermission,
        onEmployeeReviewLinkClick,
        onEmployeeCheckInLinkClick,
        navigateAccordingToReviewCycleStatus,
        setButtonLabel
    } = useReviewTimeline();

    if (isLoading) {
        return <Loader />;
    }
    const employeesReviewContentList = employees.map(emp => {
        const { managerState, managerLinkText, empId } = emp;
        return {
            state: managerState,
            component: (
                <StyledLink state={managerState} key={empId} textVariant="body2" onClick={() => onEmployeeReviewLinkClick(emp)}>
                    {managerLinkText}
                </StyledLink>
            )
        };
    });
    const checkInEmployeesContentList: contentListItem[] = employees.map(emp => {
        const { checkInState, checkInLinkText, empId } = emp;
        return {
            state: checkInState,
            component: (
                <StyledLink state={checkInState} key={empId} textVariant="body2" onClick={() => onEmployeeCheckInLinkClick(emp)}>
                    {checkInLinkText}
                </StyledLink>
            )
        };
    });
    const managerReviewContentList: contentListItem[] = [];
    if (data[0] && Object.keys(data[0]).length > 0) {
        managerReviewContentList.push({
            state: data[0].firstManagerReviewPublish ? 'complete' : 'active',
            component: (
                <Text style={{ fontSize: '14px' }} textVariant="body2">
                    {data[0].firstManagerReviewPublish
                        ? `
                Manager 1 Review submitted on ${format(new Date(data[0].firstManagerReviewDate), 'do MMM yyyy')}, by ${
                              data[0].firstManagerFirstName
                          } ${data[0].firstManagerLastName} - ${data[0].firstManagerEmployeeId}`
                        : `Your Manager 1 ${data[0].firstManagerFirstName} ${data[0].firstManagerLastName} - ${data[0].firstManagerEmployeeId} Review is pending.`}
                </Text>
            )
        });

        if (data[0].secondManagerId) {
            managerReviewContentList.push({
                state: data[0].secondManagerReviewPublish ? 'complete' : 'active',
                component: (
                    <Text textVariant="body2" style={{ fontSize: '14px' }}>
                        {data[0].secondManagerReviewPublish
                            ? `
                Manager 2 Review submitted on ${format(new Date(data[0].secondManagerReviewDate), 'do MMM yyyy')}, by ${
                                  data[0].secondManagerFirstName
                              } ${data[0].secondManagerLastName} - ${data[0].secondManagerEmployeeId}).`
                            : `Your Manager 2 ${data[0].secondManagerFirstName} ${data[0].secondManagerLastName} - ${data[0].secondManagerEmployeeId} Review is pending.`}
                    </Text>
                )
            });
        }
    }

    const showTimeline = (data && data[0]) || modulePermission?.find(module => module.moduleName === 'Review Cycles')?.edit;
    return (
        <PageContent>
            {showTimeline && (
                <ListHeader
                    title="Review Timeline"
                    actionButtonLabel={setButtonLabel()}
                    actionButtonClick={() => {
                        navigateAccordingToReviewCycleStatus();
                    }}
                />
            )}
            <ContentWrapper>
                {showTimeline ? (
                    <VerticalTimeline layout="1-column" lineColor={defaultTheme.colors.blue[200]}>
                        <VerticalTimelineElement
                            icon={
                                // only exception for Review Cycle started/scheduled icon
                                // cycle ongoing(already started) => show green tick icon (state named as complete)
                                // cycle scheduled => show yellow icon (state named as ongoing)
                                <TimelineIcon
                                    state={
                                        itemStatus.startCycle === 'ongoing'
                                            ? 'complete'
                                            : itemStatus.startCycle === 'scheduled'
                                            ? 'ongoing'
                                            : itemStatus.startCycle
                                    }
                                    number={1}
                                />
                            }
                            iconStyle={{ boxShadow: 'none' }}
                            contentStyle={{ boxShadow: 'none', padding: '0' }}
                        >
                            <TimelineContentWrapper>
                                {itemStatus.startCycle === 'active' ? (
                                    <StyledLinkTitle state="active" textVariant="h4" onClick={handleStartReviewCycle}>
                                        Start Review Cycle
                                    </StyledLinkTitle>
                                ) : (
                                    <Text textVariant="h4">
                                        {itemStatus.startCycle === 'ongoing' ? 'Review Cycle started' : 'Review Cycle scheduled'}
                                    </Text>
                                )}
                            </TimelineContentWrapper>
                        </VerticalTimelineElement>
                        {itemStatus.startCycle !== 'disabled' && itemStatus.startCycle !== 'active' && (
                            <VerticalTimelineElement
                                icon={<TimelineIcon state="active" isSubTask={true} />}
                                iconStyle={{ boxShadow: 'none', width: '30px', height: '30px', top: '5px', left: '5px' }}
                                contentStyle={{ boxShadow: 'none', padding: '0' }}
                                id="sub-item"
                            >
                                <TimelineContentWrapper>
                                    <ContentText textVariant="body2">
                                        {data[0] &&
                                            `Scheduled from ${format(new Date(data[0].startDate), 'do MMM yyyy')} to ${format(
                                                new Date(data[0].endDate),
                                                'do MMM yyyy'
                                            )}`}
                                    </ContentText>
                                </TimelineContentWrapper>
                            </VerticalTimelineElement>
                        )}
                        {!(data && userDetails.roleName === 'Org Admin' && !data[0]?.empDetails && !data[0]?.firstManagerId) && (
                            <>
                                <VerticalTimelineElement
                                    icon={<TimelineIcon state={itemStatus.selfReview} number={2} />}
                                    iconStyle={{ boxShadow: 'none' }}
                                    contentStyle={{ boxShadow: 'none', padding: '0' }}
                                >
                                    <TimelineContentWrapper>
                                        <StyledLinkTitle state={itemStatus.selfReview} textVariant="h4" onClick={handleAddSelfReview}>
                                            {itemStatus.selfReview === 'complete'
                                                ? reviewStatusConstants.SelfReviewSubmitted
                                                : itemStatus.selfReview === 'ongoing'
                                                ? reviewStatusConstants.SelfReviewPending
                                                : itemStatus.selfReview === 'disabled' &&
                                                  data &&
                                                  data[0] &&
                                                  data[0].isSelfReviewDatePassed &&
                                                  !data[0].isSelfReviewActive &&
                                                  !data[0].selfReviewPublish
                                                ? reviewStatusConstants.SelfReviewDatePassed
                                                : 'Start Self Review'}
                                        </StyledLinkTitle>
                                    </TimelineContentWrapper>
                                </VerticalTimelineElement>

                                {data && data.length > 0 && itemStatus.startCycle !== 'disabled' && (
                                    <VerticalTimelineElement
                                        id="sub-item"
                                        icon={<TimelineIcon state="active" isSubTask={true} />}
                                        iconStyle={{ boxShadow: 'none', width: '30px', height: '30px', top: '5px', left: '5px' }}
                                        contentStyle={{ boxShadow: 'none', padding: '0' }}
                                    >
                                        <TimelineContentWrapper>
                                            <ContentText textVariant="body2">
                                                {itemStatus.selfReview === 'complete'
                                                    ? `Submitted on ${format(new Date(data[0].selfReviewDate), 'do MMM yyyy')}`
                                                    : itemStatus.selfReview === 'disabled'
                                                    ? `Scheduled from ${format(
                                                          new Date(data[0].selfReviewStartDate),
                                                          'do MMM yyyy'
                                                      )} to ${format(new Date(data[0].selfReviewEndDate), 'do MMM yyyy')}`
                                                    : `Submit it before ${format(new Date(data[0].selfReviewEndDate), 'do MMM yyyy')}`}
                                            </ContentText>
                                        </TimelineContentWrapper>
                                    </VerticalTimelineElement>
                                )}
                                <VerticalTimelineElement
                                    icon={<TimelineIcon state={itemStatus.managerReview} number={3} />}
                                    iconStyle={{ boxShadow: 'none' }}
                                    contentStyle={{ boxShadow: 'none', padding: '0' }}
                                >
                                    <TimelineContentWrapper>
                                        <StyledLinkTitle state={itemStatus.managerReview} textVariant="h4" noUnderline>
                                            {itemStatus.managerReview === 'complete'
                                                ? 'Manager Review completed'
                                                : data && data[0] && data[0].empDetails && data[0].empDetails.length > 0
                                                ? itemStatus.managerReview === 'ongoing'
                                                    ? 'Manager Review Pending'
                                                    : itemStatus.managerReview === 'disabled' &&
                                                      isManagerReviewIncomplete &&
                                                      data[0].isManagerReviewDatePassed
                                                    ? 'Manager Review date passed'
                                                    : 'Start Manager Review'
                                                : itemStatus.managerReview === 'ongoing'
                                                ? 'Manager review in progress'
                                                : 'Manager review pending'}
                                        </StyledLinkTitle>
                                    </TimelineContentWrapper>
                                </VerticalTimelineElement>

                                {data && data.length > 0 && (
                                    <VerticalTimelineElement
                                        id="sub-item"
                                        icon={<TimelineIcon state="active" isSubTask={true} />}
                                        iconStyle={{ boxShadow: 'none', width: '30px', height: '30px', top: '5px', left: '5px' }}
                                        contentStyle={{ boxShadow: 'none', padding: '0' }}
                                    >
                                        <TimelineContentWrapper>
                                            <ContentText textVariant="body2">
                                                {`Scheduled from ${format(
                                                    new Date(data[0].managerReviewStartDate),
                                                    'do MMM yyyy'
                                                )} to ${format(new Date(data[0].managerReviewEndDate), 'do MMM yyyy')}`}
                                            </ContentText>
                                        </TimelineContentWrapper>
                                    </VerticalTimelineElement>
                                )}

                                {data && data.length > 0 && data[0].firstManagerId && data[0].firstManagerId !== userDetails.id && (
                                    <ReviewTimelineAccordion header="Manager Review" contentList={managerReviewContentList} />
                                )}

                                {data && data.length > 0 && employees && employees.length > 0 && (
                                    <ReviewTimelineAccordion header="Team's Review" contentList={employeesReviewContentList} />
                                )}
                                <VerticalTimelineElement
                                    icon={<TimelineIcon state={itemStatus.checkInWithManager} number={4} />}
                                    iconStyle={{ boxShadow: 'none' }}
                                    contentStyle={{ boxShadow: 'none', padding: '0' }}
                                >
                                    <TimelineContentWrapper>
                                        <StyledLinkTitle state={itemStatus.checkInWithManager} textVariant="h4" noUnderline>
                                            {itemStatus.checkInWithManager === 'complete'
                                                ? reviewStatusConstants.CheckInWithManagerCompleted
                                                : data && data[0] && data[0].empDetails && data[0].empDetails.length > 0
                                                ? itemStatus.checkInWithManager === 'ongoing'
                                                    ? reviewStatusConstants.CheckInWithManagerPending
                                                    : itemStatus.checkInWithManager === 'disabled' &&
                                                      isCheckInWithManagerIncomplete &&
                                                      data[0].isCheckInWithManagerDatePassed
                                                    ? 'Check-in with Manager date passed'
                                                    : 'Start Check-in with Manager'
                                                : itemStatus.checkInWithManager === 'ongoing'
                                                ? reviewStatusConstants.CheckInWithManagerInProgress
                                                : reviewStatusConstants.CheckInWithManagerPending}
                                        </StyledLinkTitle>
                                    </TimelineContentWrapper>
                                </VerticalTimelineElement>

                                {data && data.length > 0 && (
                                    <VerticalTimelineElement
                                        id="sub-item"
                                        icon={<TimelineIcon state="active" isSubTask={true} />}
                                        iconStyle={{ boxShadow: 'none', width: '30px', height: '30px', top: '5px', left: '5px' }}
                                        contentStyle={{ boxShadow: 'none', padding: '0' }}
                                    >
                                        <TimelineContentWrapper>
                                            <ContentText textVariant="body2">
                                                {`Scheduled from ${format(
                                                    new Date(data[0].checkInWithManagerStartDate),
                                                    'do MMM yyyy'
                                                )} to ${format(new Date(data[0].checkInWithManagerEndDate), 'do MMM yyyy')}`}
                                            </ContentText>
                                        </TimelineContentWrapper>
                                    </VerticalTimelineElement>
                                )}

                                {data && data.length > 0 && itemStatus.checkInWithManager !== 'disabled' && (
                                    <VerticalTimelineElement
                                        id="sub-item"
                                        icon={<TimelineIcon state="active" isSubTask={true} />}
                                        iconStyle={{ boxShadow: 'none', width: '30px', height: '30px', top: '5px', left: '5px' }}
                                        contentStyle={{ boxShadow: 'none', padding: '0' }}
                                    >
                                        <TimelineContentWrapper>
                                            {data[0].checkInWithManagerPublish ? (
                                                <StyledLinkTitle
                                                    state="active"
                                                    textVariant="body2"
                                                    onClick={() =>
                                                        handleCheckIn(
                                                            userDetails.firstName,
                                                            userDetails.lastName,
                                                            userDetails.id,
                                                            data[0].firstManagerId,
                                                            data[0].secondManagerId,
                                                            data[0].checkInFromId &&
                                                                data[0].checkInWithManagerPublish &&
                                                                data[0].checkInFromId,
                                                            false,
                                                            true,
                                                            userDetails.employeeId
                                                        )
                                                    }
                                                >
                                                    Check-in with Manager submitted on{' '}
                                                    {format(new Date(data[0].checkInWithManagerDate), 'do MMM yyyy')}
                                                    {data[0].checkInFromId &&
                                                        ` Submitted by ${data[0].checkInFromFirstName} ${data[0].checkInFromLastName}-${data[0].checkInFromEmployeeId}`}
                                                    .
                                                </StyledLinkTitle>
                                            ) : (
                                                <ContentText textVariant="body2">Your Check-in with Manager pending.</ContentText>
                                            )}
                                        </TimelineContentWrapper>
                                    </VerticalTimelineElement>
                                )}
                                {data && data.length > 0
                                    ? employees &&
                                      employees.length > 0 && (
                                          <ReviewTimelineAccordion header="Team's Check-in" contentList={checkInEmployeesContentList} />
                                      )
                                    : ''}
                            </>
                        )}
                        <VerticalTimelineElement
                            icon={
                                <TimelineIcon
                                    state={itemStatus.endCycle}
                                    number={!(data && userDetails.roleName === 'Org Admin' && !data[0]?.empDetails) ? 5 : 2}
                                />
                            }
                            iconStyle={{ boxShadow: 'none' }}
                            contentStyle={{ boxShadow: 'none', padding: '0' }}
                        >
                            <TimelineContentWrapper>
                                <StyledLinkTitle state={itemStatus.endCycle} textVariant="h4" noUnderline>
                                    {itemStatus.endCycle === 'disabled' && data[0] && data[0].endDate > new Date()
                                        ? `Review Cycle will end on ${format(new Date(data[0]?.endDate || new Date()), 'do MMM yyyy')}`
                                        : 'Review Cycle completed'}
                                </StyledLinkTitle>
                            </TimelineContentWrapper>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                ) : (
                    <Text textVariant="h3" textColor="red">
                        No Review Cycle active at the moment.
                    </Text>
                )}

                <ReviewCycleTips timelineData={data} />
            </ContentWrapper>
        </PageContent>
    );
};
