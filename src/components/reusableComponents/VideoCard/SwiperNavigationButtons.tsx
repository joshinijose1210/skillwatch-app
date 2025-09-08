import { useSwiper } from 'swiper/react';
import { NavigationStyledArrow } from './SwiperNavigation.styled';
import { ReactNode } from 'react';

const SwiperButtonNext = ({ children }: { children: ReactNode }) => {
    const swiper = useSwiper();
    return <NavigationStyledArrow onClick={() => swiper.slideNext()}>{children}</NavigationStyledArrow>;
};
const SwiperButtonPrev = ({ children }: { children: ReactNode }) => {
    const swiper = useSwiper();
    return <NavigationStyledArrow onClick={() => swiper.slidePrev()}>{children}</NavigationStyledArrow>;
};

export { SwiperButtonNext, SwiperButtonPrev };
