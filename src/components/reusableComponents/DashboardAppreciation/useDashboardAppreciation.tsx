import { useWindowSize } from '@medly-components/utils';
import { useAppSelector } from '@slice';
import { useGetAppreciationsMutation } from '@slice/services/dashboardAppreciation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { SwiperRef } from 'swiper/react';
import { DashboardAppreciationPropType } from './types';

export const useDashboardAppreciation = ({ reviewCycleId }: DashboardAppreciationPropType) => {
    const userDetails = useAppSelector(state => state.user);
    const reviewCycle = useAppSelector(state => state.dashboardReviewFilter.reviewCycle);
    const [getAppreciations, { data, isLoading }] = useGetAppreciationsMutation();
    const swiperRef = useRef<SwiperRef>(null);

    const { width } = useWindowSize();

    const handleNext = useCallback(() => {
        if (swiperRef && swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    }, []);
    const handlePrev = useCallback(() => {
        if (swiperRef && swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    }, []);

    const minimumFeedback = useMemo(() => {
        if (width < 1200) {
            return 2;
        } else if (width > 1700) {
            return 4;
        } else return 3;
    }, [width]);

    useEffect(() => {
        getAppreciations({
            path: '',
            params: [
                { name: 'id', value: -99 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'feedbackTypeId', value: ['3'] },
                { name: 'reviewCycleId', value: reviewCycle }
            ]
        });
    }, [getAppreciations, reviewCycleId, reviewCycle, userDetails.organisationId]);

    return { isLoading, swiperRef, handleNext, handlePrev, appreciations: data?.feedbacks ?? [], minimumFeedback };
};
