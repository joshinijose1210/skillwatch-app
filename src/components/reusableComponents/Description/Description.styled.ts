import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const DescriptionDiv = styled.div`
    overflow: hidden;
    overflow-wrap: break-word;
    letter-spacing: 0;
    margin-top: 15px;
    /* stylelint-disable */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    /* stylelint-enable */
    width: 100%;
    display: inline;
    padding-bottom: 1px;

    & > * {
        color: #333 !important;
    }

    p,
    li,
    ol,
    ul,
    span {
        margin: 0;
        padding: 0;
        width: 100%;
        font-size: 14px !important;
    }
    ol,
    ul {
        padding-left: 2rem;
        width: unset;
    }

    h1,
    h2,
    h3 {
        background-color: inherit;
        span {
            background-color: inherit !important;
        }
    }
`;

export const ShowMoreLink = styled(Text)`
    color: #3872d2 !important;
    cursor: pointer;
    margin-left: 5px;
    font-size: 14px;
`;
