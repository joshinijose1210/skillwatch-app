import { PageContent } from '@components';
import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const StylePageContent = styled(PageContent)`
    overflow-x: visible;
`;

export const StyledMainHeading = styled(Text)`
    display: flex;
    align-items: center;
    gap: 2rem;
    h2 {
        margin-top: revert;
    }
`;

export const StyledBox = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    #signUp-animation {
        max-width: 40vw;
        scale: 0.7;
    }
`;
export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`;
export const StyleSignUpBox = styled.div`
    min-width: 410px;
    max-width: 35rem;
    border-radius: 3rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 3rem 4rem;
    background-color: ${({ theme }) => theme.colors.grey[200]};
`;

export const StyledImage = styled.img`
    width: 38%;
`;
export const TitleWrapper = styled.div`
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.pageTitleColor};
`;

export const StyleContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 0.9rem;
`;

export const FlexWrapper = styled.div`
    display: flex;
    gap: 1rem;
    #medly-textField-input {
        line-height: 1.5rem;
    }
`;
export const ColumWrapper = styled.div`
    display: flex;
    flex-direction: column;
    #medly-textField-input {
        line-height: 1.5rem;
    }
    span {
        padding: 0 5px;
    }
    div.react-tel-input {
        margin: 0.8rem 0;
    }

    #contact-input {
        width: 100%;
        height: 5.6rem;
        border-radius: 0.4rem;
        line-height: 1.9rem;
        font-size: 1.5rem;
        font-weight: 400;
        font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
        color: #607890;
        border: 0.1rem solid #98a7b7;
    }
    .flag-dropdown {
        border: 0.1rem solid #98a7b7;
    }

    div.react-tel-input ::after {
        position: absolute;
        margin: 0;
    }
`;
export const StyledSpan = styled.span`
    color: #d73a43;
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin: 0 1.6rem 0;
`;
export const Link = styled.a``;
