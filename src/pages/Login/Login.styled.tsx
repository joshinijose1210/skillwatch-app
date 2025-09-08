import { PageContent } from '@components';
import { Button, Text } from '@medly-components/core';
import styled from 'styled-components';

export const StylePageContent = styled(PageContent)`
    overflow-x: visible;
`;

export const Login = styled.div`
    width: 100%;
    height: 80vh;
    column-gap: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const LoginLeft = styled.div`
    width: 30%;
    div > svg > g > g:nth-child(108) {
        opacity: 0;
    }
`;
export const StyledDiv = styled.div``;
export const LoginRight = styled.div`
    min-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem;
    background-color: ${({ theme }) => theme.colors.grey[200]};
    border-radius: 3rem;
    margin-bottom: 2rem;
`;

export const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
    #medly-textField-input {
        line-height: 1.5rem;
    }
`;

export const GoogleButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const ForgotPasswordButton = styled(Text)`
    margin: -1rem 0 0 auto;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.blue[500]};
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const StyleHandImage = styled('img')`
    height: 5rem;
    width: 5rem;
`;

export const StyleLine = styled.h2`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[400]};
    line-height: 0.1em;
    margin: 20px 0;
`;

export const StyleText = styled.span`
    font-size: 20px;
    font-weight: 400;
    background-color: ${({ theme }) => theme.colors.grey[200]};
    color: ${({ theme }) => theme.colors.grey[500]};
    padding: 2px 5px;
`;
export const QuickLinkWrapper = styled('div')`
    text-align: center;
`;
export const QuickLink = styled(Text)`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue[500]};
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const LoginBanner = styled.a`
    display: flex;
    gap: 1rem;
    padding: 10px;
    justify-content: center;
    border-radius: 5px;
    background-color: #fff;
    text-decoration: none;
    cursor: pointer;
    ${Text.Style} {
        font-weight: 600;
        color: #5e5e5e;
    }
`;

export const LoginIcon = styled.img``;

export const StyleButton = styled(Button)`
    span {
        font-size: 1.6rem;
    }
    &:disabled {
        background-color: ${({ theme }) => theme.colors.grey[400]};
        span {
            color: ${({ theme }) => theme.colors.grey[700]};
        }
    }
`;
