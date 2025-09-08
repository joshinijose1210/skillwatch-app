import { Button, Link, Text } from '@medly-components/core';
import { SvgIcon } from '@medly-components/icons';
import styled from 'styled-components';
import { StyledTextField, StyledSingleSelect as ParentStyledSingleSelect } from '@common';
import { ScreenWidthWrapper } from '@pages/SelfReview/SelfReviewForm/SelfReviewForm.styled';

export const StyledButtonWrapper = styled('div')`
    display: flex;
    justify-content: flex-end;
    max-width: calc(40% - 5rem);
    gap: 1rem;
`;

export const StyledButton = styled(Button)`
    width: fit-content;
    margin: 2rem 0;
`;

export const StyledScreenWidthWrapper = styled(ScreenWidthWrapper)`
    width: 100%;
    row-gap: 2.5rem;
`;

export const LogoUploadWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20rem;
    position: relative;
    justify-content: space-between;
`;
export const StyledInput = styled(StyledTextField)`
    max-width: calc(40% - 5rem);
    padding: 0;
    margin: 0;
`;

export const LogoUpload = styled.div`
    width: calc(40% - 5rem);
`;

export const LogoUploadLabel = styled(Text)`
    margin-bottom: 10px;
    font-weight: 500;
`;

export const LogoNotes = styled.div`
    position: absolute;
    width: 50%;
    right: 0;
    top: 0;
    background-color: ${({ theme }) => theme.colors.grey[50]};
    border-radius: 1rem;
    padding: 2rem;
    color: ${({ theme }) => theme.colors.grey[600]};
    @media (min-width: 1440px) and (max-width: 1536px) {
        width: 47%;
    }
`;

export const LogoNoteHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    ${SvgIcon} {
        width: 2.8rem;
        height: 2.8rem;
    }
`;

export const Notes = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    ${Text.Style} {
        font-size: 14px;
    }

    ${Link.Style} {
        color: ${({ theme }) => theme.colors.blue[400]};
        text-decoration: underline;

        ${Text.Style} {
            font-size: 14px;
        }
    }
`;

export const StyleContactInput = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: calc(40% - 5rem);
    div.react-tel-input > input {
        max-height: 45px;
    }
    #medly-textField-input-wrapper {
        width: 100%;
    }
`;

export const StyledErrorText = styled.span`
    position: absolute;
    padding-left: 1.8rem;
    top: 31px;
    color: #d73a43;
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-top: 1.8rem;
`;

export const SlackContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SlackHeadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const SlackImage = styled.img`
    height: 20px;
    width: 20px;
    margin: 0 5px;
`;

export const InfoContainer = styled.div`
    display: flex;
    gap: 3rem;
    margin-bottom: 1rem;
`;

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export const StyledRemoveButton = styled(Button)`
    width: fit-content;
    margin: 2rem 0;
    &:not(:disabled):not(:hover),
    &:not(:disabled):not(:active):hover,
    &:not(:disabled):active:hover {
        color: red;
    }
    &:not(:disabled):not(:hover)::after,
    &:not(:disabled):not(:active):hover::after,
    &:not(:disabled):active:hover::after {
        border-color: red;
    }
`;

export const StyledLabel = styled(Text).attrs({
    textVariant: 'body1'
})`
    font-size: ${({ theme }) => theme.contentFontSize};
`;

export const StyledSingleSelect = styled(ParentStyledSingleSelect)`
    width: calc(40% - 5rem);
    max-width: unset;
`;

// commenting this as its not used, might need in future
// export const StyledToggle = styled(Toggle)<{ title: string }>`
//     ${props =>
//         props.title &&
//         `
//             span {
//                 font-size: 1.6rem;
//                 font-weight: 600;
//                 line-height: 1.6rem;
//                 border-bottom: 2px solid blue;
//             }

//             &::after {
//                 display: none;
//             }
//         `}
// `;
