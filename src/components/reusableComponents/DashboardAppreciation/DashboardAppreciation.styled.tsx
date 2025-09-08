import { Avatar, Text } from '@medly-components/core';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const OwlCarouselDiv = styled.div`
    min-height: 124px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 0 2rem;
    position: relative;

    .swiper.swiper-initialized.swiper-horizontal {
        margin-left: unset;
    }

    .swiper {
        width: 100%;
    }
    .prev,
    .prevIcon {
        background: transparent;
        padding: 0;
        transform: scale(1, 2);
        position: absolute;
        top: 47%;
        left: 0;
        display: inline-block;
        font-size: 2rem;
        width: 3rem;
        color: ${({ theme }) => theme.colors.blue[400]};
        z-index: 2;
        cursor: pointer;
    }

    .next,
    .nextIcon {
        padding: 0;
        transform: scale(1, 2);
        position: absolute;
        top: 47%;
        right: -18px;
        background: transparent;
        font-size: 2rem;
        width: 3rem;
        color: ${({ theme }) => theme.colors.blue[400]};
        display: inline-block;
        z-index: 2;
        cursor: pointer;
    }

    .swiper-slide {
        transition: none;
    }

    .hidden {
        visibility: hidden;
    }
`;
export const AppreciationItem = styled.div`
    padding: 1.5rem 3rem;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 180px;
    background: #fafafa;
    border: 1px solid #ccc;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    position: relative;
    z-index: 1;
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const AppreciationItemsWrapper = styled(SwiperSlide)`
    display: flex;
    flex-direction: row;
    padding: 1rem 2rem;
    padding-bottom: 0;
    justify-content: space-between;
`;

export const DescriptionDiv = styled.div`
    overflow: hidden;
`;

export const SeparatorLine = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.grey[300]};
`;

export const StyledDate = styled(Text)`
    color: ${({ theme }) => theme.customColors.fullGrey};
    font-weight: 500;
    letter-spacing: normal;
    display: inline;
`;

export const FromAndDateDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    &.with-edit {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const IconAndNameDiv = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 0.8rem;
    align-items: center;

    ${Avatar.Style} {
        transform: scale(0.9);
    }

    ${Text.Style} {
        color: ${({ theme }) => theme.pageTitleColor};
        font-size: 1.4rem;
    }
`;
