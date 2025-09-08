import { StyledEmptyText } from '@common';
import { Text } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useGetActionItemsQuery } from '@slice/services';
import format from 'date-fns/format';
import { Loader } from '../Loader';
import { NoActionItemDiv, StyledChip, StyledSwiperSlide } from './DashboardActionItems.styled';
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
import useDashboardActionItems from './useDashboardActionItems';
import { GoalCycle } from '@pages/ViewPreviousGoals/types';
import DOMPurify from 'dompurify';
import { DescriptionDiv, ShowMoreLink } from '../Description/Description.styled';
import { GoalModal } from '@pages/ViewPreviousGoals/GoalsModal';

const GoalsCarousel = ({ data }: { data: GoalCycle }) => {
    const { minimumGoals, handlePrev, handleNext, swiperRef, handleOnClick } = useDashboardActionItems();
    return (
        <StyledBox>
            <OwlCarouselDiv>
                {data.actionItems.length > minimumGoals && (
                    <>
                        <span onClick={handlePrev} className="prevIcon">
                            &lt;
                        </span>
                        <span onClick={handleNext} className="nextIcon">
                            &gt;
                        </span>
                    </>
                )}
                {data.actionItems.length > 0 ? (
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
                        slidesPerView="auto"
                        breakpoints={{
                            '0': { slidesPerView: 1 },
                            '660': { slidesPerView: 2 },
                            '1200': { slidesPerView: 3 },
                            '1700': { slidesPerView: 4 }
                        }}
                    >
                        {data.actionItems.map(item => {
                            return (
                                <StyledSwiperSlide key={item.id}>
                                    <AppreciationItem>
                                        <CardBody>
                                            <StyledChip progressId={item.progressId} label={item.progressName} />
                                            <DescriptionDiv
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(item.actionItem)
                                                }}
                                            />
                                        </CardBody>
                                        <FromAndDateDiv className="with-edit">
                                            <div>
                                                <Text textVariant="body2">Deadline: </Text>
                                                <StyledDate textVariant="body2">
                                                    {format(new Date(item.targetDate), 'dd/MM/yyyy')}
                                                </StyledDate>
                                            </div>
                                            <ShowMoreLink onClick={() => handleOnClick(item)}>Edit</ShowMoreLink>
                                        </FromAndDateDiv>
                                    </AppreciationItem>
                                </StyledSwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <StyledEmptyText>No Goals for the current review cycle.</StyledEmptyText>
                )}
            </OwlCarouselDiv>
        </StyledBox>
    );
};

export const DashboardActionItems = () => {
    const userDetails = useAppSelector(state => state.user);
    const reviewCycle = useAppSelector(state => state.dashboardReviewFilter.reviewCycle);
    const { data, isLoading, refetch } = useGetActionItemsQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'id', value: userDetails.id },
                { name: 'reviewCycleId', value: reviewCycle }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    if (isLoading) {
        return <Loader />;
    }

    return (
        <StyledBox>
            <ListHeaderDiv hasBorder={false}>
                <Text textVariant="h4">Goals</Text>
            </ListHeaderDiv>
            <GoalModal refetchData={refetch} />

            {data && data.totalActionItems > 0 ? (
                <GoalsCarousel data={data} />
            ) : (
                <NoActionItemDiv>
                    <StyledEmptyText>No Goals found</StyledEmptyText>
                </NoActionItemDiv>
            )}
        </StyledBox>
    );
};
