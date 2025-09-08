import { PageContent } from '@components';
import { routeConstants } from '@constants';
import verificationMail2 from '@constants/images/animations/resetPasswordVerification.json';
import verificationMail1 from '@constants/images/animations/verification.json';
import { Button, Text } from '@medly-components/core';
import { QuickLink } from '@pages/Login/Login.styled';
import NotFound404 from '@pages/NotFound404';
import { useLottie } from 'lottie-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ReactComponent as SkillWatchLogo } from '../../constants/images/logos/Skillwatch.svg';
import { useVerificationMail } from './useVerificationMail';

import { Logo, LogoWrapper } from '@common';
import { ButtonWrapper, MailBoxAnimation, StyleText, StyledBox, TextWrapper } from './VerificationMail.styled';

export const VerificationMail = () => {
    const { reSendMailHandler, isLoading, name, resetLoading, email } = useVerificationMail();
    const options = {
        animationData: name === 'Forgot password' ? verificationMail2 : verificationMail1,
        loop: true
    };
    const { View } = useLottie(options);
    const navigate = useNavigate();

    if (email === null) {
        return <Navigate to={routeConstants.login} />;
    } else if (email)
        return (
            <PageContent>
                <LogoWrapper>
                    <Logo href={process.env.LOGIN_URL}>
                        <SkillWatchLogo />
                    </Logo>
                </LogoWrapper>
                <StyledBox>
                    <MailBoxAnimation>{View}</MailBoxAnimation>
                    <TextWrapper>
                        <Text textVariant="h2">
                            We have emailed a {name === 'Forgot password' ? 'reset password' : 'verification'} link to:
                        </Text>
                        <StyleText textVariant="h3" textWeight="Medium">
                            {email}
                        </StyleText>
                        <Text textVariant="h3" textWeight="Medium">
                            It will expire shortly, so verify soon
                        </Text>
                    </TextWrapper>
                    <ButtonWrapper>
                        <Text textVariant="h3">Remember to check your spam folder</Text>
                        <Button data-testid="resend-btn" onClick={reSendMailHandler} isLoading={isLoading || resetLoading}>
                            Resend Email
                        </Button>
                        <QuickLink data-testid="login-btn" as="a" onClick={() => navigate(routeConstants.login)}>
                            Go to Login
                        </QuickLink>
                    </ButtonWrapper>
                </StyledBox>
            </PageContent>
        );
    else return <NotFound404 />;
};
