import { Text } from '@medly-components/core';
import { VideoCardWrapperProp } from './types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { SwiperButtonNext, SwiperButtonPrev } from './SwiperNavigationButtons';
import { NavigationArrowsContainer } from './SwiperNavigation.styled';
import { ReactComponent as RightArrow } from '../../../constants/images/icons/arrow-right.svg';
export const VideoCardContainer = ({
    props,
    onClickVideo,
    toggleModal
}: {
    props: VideoCardWrapperProp[];
    onClickVideo: (videoId: string, videoLabel: string) => void;
    toggleModal: () => void;
}): JSX.Element => {
    return (
        <Swiper
            style={{
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: 'auto'
            }}
            modules={[Navigation]}
            spaceBetween={45}
            slidesPerView="auto"
        >
            {props.length > 2 && (
                <NavigationArrowsContainer>
                    <SwiperButtonPrev>
                        <RightArrow style={{ rotate: '180deg', height: '100%', width: '100%', paddingLeft: '3px' }} />
                    </SwiperButtonPrev>
                    <SwiperButtonNext>
                        <RightArrow style={{ height: '100%', width: '100%', paddingLeft: '3px' }} />
                    </SwiperButtonNext>
                </NavigationArrowsContainer>
            )}

            {props.map((video, id) => {
                return (
                    <SwiperSlide
                        style={{
                            height: '30rem',
                            minWidth: '35rem',
                            maxWidth: '40rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
                        key={id}
                    >
                        {/* might need in future if vidoes are not from youtube */}
                        {/* <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                alignItems: 'center',
                            }}
                        > */}
                        {/* <img
                                src={PlayButton}
                                style={{
                                    position: 'absolute',
                                    height: '30%'
                                }}
                                alt="play_button"
                            /> */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer'
                            }}
                            onClick={event => {
                                event.preventDefault();
                                toggleModal();
                                onClickVideo(video.videoURL, video.cardLabel);
                            }}
                        />
                        <iframe
                            style={{ borderRadius: 4, height: '22.5rem', width: '100%' }}
                            src={`${video.videoURL}?showcontrols=0?muted=1?autoplay=1`}
                        />
                        {/* <video autoPlay={false} style={{ borderRadius: 4 }} width={'100%'} muted src={video.videoURL} /> */}
                        {/* </div> */}
                        <Text textVariant="h4" textWeight="Regular">
                            {video.cardLabel}
                        </Text>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
