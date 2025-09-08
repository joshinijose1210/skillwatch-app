import { FromText, StyledEmptyText } from '@common';
import { Avatar, Text } from '@medly-components/core';
import { defaultTheme } from '@theme';
import format from 'date-fns/format';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import { ListHeaderDiv, StyledBox } from '../DashboardFeedbackOverview/DashboardFeedbackOverview.styled';
import Description from '../Description';
import { Loader } from '../Loader';
import { AppreciationItem, FromAndDateDiv, IconAndNameDiv, OwlCarouselDiv, StyledDate } from './DashboardAppreciation.styled';
import { Appreciation, DashboardAppreciationPropType } from './types';
import { useDashboardAppreciation } from './useDashboardAppreciation';
import { StyledSwiperSlide } from '../DashboardActionItems/DashboardActionItems.styled';

export const DashboardAppreciation = ({ reviewCycleId }: DashboardAppreciationPropType) => {
    const { isLoading, swiperRef, appreciations, minimumFeedback, handleNext, handlePrev } = useDashboardAppreciation({
        reviewCycleId
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <StyledBox>
            <ListHeaderDiv hasBorder={false}>
                <Text textVariant="h4">Wall of Fame</Text>
            </ListHeaderDiv>
            <OwlCarouselDiv>
                {appreciations.length > minimumFeedback && (
                    <>
                        <span onClick={handlePrev} className="prevIcon">
                            &lt;
                        </span>
                        <span onClick={handleNext} className="nextIcon">
                            &gt;
                        </span>
                    </>
                )}
                {appreciations.length > 0 ? (
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
                            prevEl: '.prevIcon',
                            nextEl: '.nextIcon'
                        }}
                        slidesPerView="auto"
                        breakpoints={{
                            '0': { slidesPerView: 1 },
                            '660': { slidesPerView: 2 },
                            '1200': { slidesPerView: 3 },
                            '1700': { slidesPerView: 4 }
                        }}
                    >
                        {appreciations.map((appreciation: Appreciation, index: number) => {
                            return (
                                <StyledSwiperSlide key={index} className={appreciation.isDummy ? 'hidden' : ''}>
                                    <AppreciationItem>
                                        <IconAndNameDiv>
                                            <Avatar bgColor={defaultTheme.colors.blue[200]}>
                                                {appreciation.appreciationToFirstName[0]}
                                                {appreciation.appreciationToLastName[0]}
                                            </Avatar>
                                            <Text textVariant="h4" textWeight="Medium">
                                                {appreciation.appreciationToFirstName} {appreciation.appreciationToLastName} (
                                                {appreciation.appreciationToEmployeeId})
                                            </Text>
                                        </IconAndNameDiv>
                                        <Description
                                            feedback={appreciation.appreciation}
                                            tagId={3}
                                            isExternalFeedback={appreciation.isExternalFeedback}
                                            externalFeedbackFromEmailId={appreciation.externalFeedbackFromEmailId}
                                            feedbackFrom={appreciation.appreciationFromEmployeeId}
                                            feedbackTo={appreciation.appreciationToEmployeeId}
                                            feedbackFromId={appreciation.appreciationFromId}
                                            feedbackToId={appreciation.appreciationToId}
                                            fromEmpName={`${appreciation.appreciationFromFirstName} ${appreciation.appreciationFromLastName}`}
                                            toEmpName={`${appreciation.appreciationToFirstName} ${appreciation.appreciationToLastName}`}
                                            feedbackFromEmployeeId={appreciation.appreciationFromEmployeeId}
                                            feedbackToEmployeeId={appreciation.appreciationToEmployeeId}
                                            tagName="Appreciation"
                                            date={appreciation.submitDate}
                                            fromRoleName={appreciation.appreciationFromRoleName}
                                            toRoleName={appreciation.appreciationToRoleName}
                                        />
                                        <FromAndDateDiv>
                                            <Text textVariant="body2" color="#333">
                                                From:{' '}
                                            </Text>
                                            <FromText>
                                                {appreciation.isExternalFeedback
                                                    ? appreciation.externalFeedbackFromEmailId
                                                    : `${appreciation.appreciationFromFirstName} ${appreciation.appreciationFromLastName} (
                                                ${appreciation.appreciationFromEmployeeId})`}{' '}
                                                |<StyledDate>{format(new Date(appreciation.submitDate), 'dd/MM/yyyy')}</StyledDate>
                                            </FromText>
                                        </FromAndDateDiv>
                                    </AppreciationItem>
                                </StyledSwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <StyledEmptyText>No Appreciation found for the current review cycle.</StyledEmptyText>
                )}
            </OwlCarouselDiv>
        </StyledBox>
    );
};
