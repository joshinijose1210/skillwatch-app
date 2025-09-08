import { Button, Modal, Text } from '@medly-components/core';
import { PlayArrowIcon } from '@medly-components/icons';
import { categoryColorMap } from '@pages/Tutorial/constants';
import { FlexBoxRow, StyledCard } from '@pages/Tutorial/Tutorial.styled';
import { TutorialItem } from '@pages/Tutorial/types';
import { useTutorial } from '@pages/Tutorial/useTutorial';
import {
    CardContentWrapper,
    CardDescription,
    CardTitle,
    Overlay,
    PlayButtonWrapper,
    StyledButtonWrapper,
    StyledModalContent,
    TagChip,
    ThumbnailImage,
    ThumbnailWrapper
} from './TutorialCardModal.styled';
import { Tooltip } from 'react-tooltip';
import IframeVideo from '@components/reusableComponents/IframeVideo';
import { StyledVideoModal } from '@common';

const TutorialCardModal = ({ video }: { video: TutorialItem }) => {
    const { toggleModal, openModal, viewCount } = useTutorial(video.videoId);
    return (
        <>
            <StyledCard display="flex" flowDirection="vertical" alignItems="left" withoutPadding>
                <ThumbnailWrapper onClick={toggleModal}>
                    <ThumbnailImage src={video.thumbnail} alt="video" />
                    <Overlay />
                    <PlayButtonWrapper>
                        <PlayArrowIcon size="XL" iconColor="#eff9ff" />
                    </PlayButtonWrapper>
                </ThumbnailWrapper>
                <CardContentWrapper>
                    <CardTitle data-tooltip-id={`${video.cardLabel}-card-label`}>{`${
                        video.cardLabel.length > 90 ? `${video.cardLabel.slice(0, 90)}...` : video.cardLabel
                    }`}</CardTitle>
                    <TagChip
                        style={{ marginTop: '' }}
                        label={video.category}
                        variant="solid"
                        textColor={categoryColorMap[video.category].text}
                        color={categoryColorMap[video.category].bg}
                    />
                    <CardDescription data-tooltip-id={`${video.cardLabel}-card-description`}>
                        {`${video.cardDescription.length > 220 ? `${video.cardDescription.slice(0, 220)}...` : video.cardDescription}`}
                    </CardDescription>

                    {video.cardLabel.length > 90 && (
                        <Tooltip
                            style={{ backgroundColor: '#555', maxWidth: '300px' }}
                            place="top"
                            id={`${video.cardLabel}-card-label`}
                            content={video.cardLabel}
                        />
                    )}

                    {video.cardDescription.length > 220 && (
                        <Tooltip
                            style={{ backgroundColor: '#555', maxWidth: '300px' }}
                            place="top"
                            id={`${video.cardLabel}-card-description`}
                            content={video.cardDescription}
                        />
                    )}

                    <FlexBoxRow gap="0">
                        {video.cardTag.map((tag: string, idx: number) => (
                            <TagChip key={idx} label={`#${tag}`} variant="solid" color="#F3F4F6" />
                        ))}
                    </FlexBoxRow>
                    <StyledButtonWrapper>
                        <Text textVariant="body3">{viewCount} views</Text>
                        <Button onClick={toggleModal} variant="outlined">
                            Watch Now
                        </Button>
                    </StyledButtonWrapper>
                </CardContentWrapper>
            </StyledCard>

            <StyledVideoModal minHeight="708px" minWidth="1199px" open={openModal} onCloseModal={toggleModal}>
                <StyledModalContent>
                    <IframeVideo videoId={video.videoId} />
                </StyledModalContent>
            </StyledVideoModal>
        </>
    );
};

export default TutorialCardModal;
