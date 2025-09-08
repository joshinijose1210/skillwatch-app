import { FromText, StyledEmptyText } from '@common';
import { StyledChip } from '@components/columnFormatters/FeedbackTagFormatter/FeedbackTagFormatter.styled';
import { Loader } from '@components/reusableComponents';
import { Text } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { getTagId } from '@utils/getTagId';
import format from 'date-fns/format';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import {
    AppreciationItem,
    CardBody,
    FromAndDateDiv,
    OwlCarouselDiv,
    StyledDate
} from '../DashboardAppreciation/DashboardAppreciation.styled';
import { ListHeaderDiv, StyledBox } from '../DashboardFeedbackOverview/DashboardFeedbackOverview.styled';
import Description from '../Description';
import { DashboardAppreciationPropType } from './types';
import { useDashboardFeedback } from './useDashboardFeedback';
import { StyledSwiperSlide } from '../DashboardActionItems/DashboardActionItems.styled';

export const DashboardFeedback = ({ reviewCycleId }: DashboardAppreciationPropType) => {
    const { isLoading, feedbacks, employeeId, userId, minimumFeedback, swiperRef, handleNext, handlePrev } = useDashboardFeedback();
    const { user } = useAppSelector(state => state);
    if (isLoading) {
        return <Loader />;
    }

    return (
        <StyledBox>
            <ListHeaderDiv hasBorder={false}>
                <Text textVariant="h4">Feedback Received</Text>
            </ListHeaderDiv>
            <OwlCarouselDiv>
                {feedbacks.length > minimumFeedback && (
                    <>
                        <span onClick={handlePrev} className="prevIcon">
                            &lt;
                        </span>
                        <span onClick={handleNext} className="nextIcon">
                            &gt;
                        </span>
                    </>
                )}
                {feedbacks.length > 0 ? (
                    <Swiper
                        ref={swiperRef}
                        autoplay={{ delay: 15000 }}
                        draggable
                        modules={[Autoplay, Navigation]}
                        spaceBetween={10}
                        loop
                        direction="horizontal"
                        navigation={{
                            enabled: true,
                            prevEl: '.prev',
                            nextEl: '.next'
                        }}
                        breakpoints={{
                            '0': { slidesPerView: 1 },
                            '660': { slidesPerView: 2 },
                            '1200': { slidesPerView: 3 },
                            '1700': { slidesPerView: 4 }
                        }}
                    >
                        {feedbacks.map((feedback, index) => {
                            return (
                                <StyledSwiperSlide key={index} className={feedback.isDummy ? 'hidden' : ''}>
                                    <AppreciationItem>
                                        <CardBody>
                                            <StyledChip label={feedback.feedbackType} />
                                            <Description
                                                tagId={getTagId(feedback.feedbackType)}
                                                isExternalFeedback={feedback.isExternalFeedback}
                                                externalFeedbackFromEmailId={feedback.externalFeedbackFromEmailId}
                                                feedback={feedback.feedback}
                                                feedbackFrom={feedback.feedbackFromEmployeeId}
                                                feedbackTo={employeeId}
                                                feedbackFromId={feedback.feedbackFromId}
                                                feedbackToId={userId}
                                                isReceivedFeedback
                                                fromEmpName={`${feedback.feedbackFromFirstName} ${feedback.feedbackFromLastName}`}
                                                toEmpName={`${user.firstName} ${user.lastName}`}
                                                feedbackFromEmployeeId={feedback.feedbackFromEmployeeId}
                                                feedbackToEmployeeId={user.employeeId}
                                                tagName={feedback.feedbackType}
                                                date={feedback.submitDate}
                                                fromRoleName={feedback.feedbackFromRoleName}
                                                toRoleName={user.roleName}
                                            />
                                        </CardBody>

                                        <FromAndDateDiv>
                                            <Text textVariant="body2">From: </Text>
                                            <FromText textVariant="h5">
                                                {feedback.isExternalFeedback
                                                    ? feedback.externalFeedbackFromEmailId
                                                    : `${feedback.feedbackFromFirstName} ${feedback.feedbackFromLastName} (
                                                ${feedback.feedbackFromEmployeeId})`}{' '}
                                                |
                                                <StyledDate textVariant="body2">
                                                    {format(new Date(feedback.submitDate), 'dd/MM/yyyy')}
                                                </StyledDate>
                                            </FromText>
                                        </FromAndDateDiv>
                                    </AppreciationItem>
                                </StyledSwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <StyledEmptyText>No Feedback Received for the current review cycle.</StyledEmptyText>
                )}
            </OwlCarouselDiv>
        </StyledBox>
    );
};
