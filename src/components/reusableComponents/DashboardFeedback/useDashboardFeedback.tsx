import { useWindowSize } from '@medly-components/utils';
import { useAppSelector } from '@slice';
import { useGetAppreciationsMutation } from '@slice/services/dashboardAppreciation';
import { useEffect, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';
import { IFeedback } from './types';

export const useDashboardFeedback = () => {
    const userDetails = useAppSelector(state => state.user);
    const reviewCycle = useAppSelector(state => state.dashboardReviewFilter.reviewCycle);
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
    const [minimumFeedback, setMinimumFeedback] = useState(3);
    const swiperRef = useRef<SwiperRef>(null);
    const { width } = useWindowSize();

    const [getFeedback, { data, isLoading }] = useGetAppreciationsMutation();

    const handleNext = () => {
        if (swiperRef?.current) {
            swiperRef.current.swiper.slideNext();
        }
    };
    const handlePrev = () => {
        if (swiperRef?.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    useEffect(() => {
        if (data?.feedbacks) {
            const updatedFeedback = [...data.feedbacks];
            if (data.feedbacks.length && data.feedbacks.length < minimumFeedback) {
                const dummyFeedback = {
                    feedbackType: 'Positive',
                    feedback: 'a',
                    feedbackFromId: 73,
                    feedbackFromEmployeeId: 'SR0050',
                    feedbackFromFirstName: 'abc',
                    feedbackFromLastName: 'abc',
                    feedbackFromRoleName: 'Org Admin',
                    submitDate: 1688735276632,
                    isDraft: false,
                    isDummy: true
                };
                for (let i = 0; i < minimumFeedback - data.feedbacks.length; i++) {
                    updatedFeedback.push(dummyFeedback);
                }
            }
            setFeedbacks(updatedFeedback);
        } else {
            setFeedbacks([]);
        }
    }, [data, minimumFeedback]);

    useEffect(() => {
        if (width < 1200) {
            setMinimumFeedback(2);
        } else if (width > 1700) {
            setMinimumFeedback(4);
        }
    }, [width]);

    useEffect(() => {
        getFeedback({
            path: '',
            params: [
                { name: 'id', value: userDetails.id },
                { name: 'organisationId', value: userDetails.organisationId },
                {
                    name: 'feedbackTypeId',
                    value: [1, 2]
                },
                { name: 'reviewCycleId', value: reviewCycle }
            ]
        });
    }, [getFeedback, reviewCycle, userDetails.id, userDetails.organisationId]);

    return {
        isLoading,
        swiperRef,
        handleNext,
        handlePrev,
        feedbacks,
        minimumFeedback,
        employeeId: userDetails.employeeId,
        userId: userDetails.id
    };
};
