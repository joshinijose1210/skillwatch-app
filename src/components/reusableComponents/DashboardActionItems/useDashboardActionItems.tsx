import { useWindowSize } from '@medly-components/utils';
import { ActionItem } from '@pages/ViewPreviousGoals/types';
import { useAppDispatch } from '@slice';
import { setGoalModal } from '@slice/goalModalSlice';
import { useMemo, useRef } from 'react';
import { SwiperRef } from 'swiper/react';

const useDashboardActionItems = () => {
    const { width } = useWindowSize();
    const swiperRef = useRef<SwiperRef>(null);
    const dispatch = useAppDispatch();

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

    const minimumGoals = useMemo(() => {
        if (width < 1200) {
            return 2;
        } else if (width > 1700) {
            return 4;
        } else return 3;
    }, [width]);

    const handleOnClick = (item: ActionItem) => {
        dispatch(setGoalModal(item));
    };

    return {
        swiperRef,
        handleNext,
        handlePrev,
        minimumGoals,
        handleOnClick
    };
};

export default useDashboardActionItems;
