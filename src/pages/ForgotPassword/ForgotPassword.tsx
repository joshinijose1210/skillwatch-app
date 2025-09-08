import { Logo, LogoWrapper } from '@common';
import { PageContent } from '@components/layout/PageContent/PageContent.styled';
import { routeConstants } from '@constants';
import { TextField } from '@medly-components/core';
import { QuickLink, StyleButton } from '@pages/Login/Login.styled';
import { useLottie } from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import ForgetPasswordAnimation from '../../constants/images/animations/forgetPassword.json';
import { ReactComponent as SkillWatchLogo } from '../../constants/images/logos/Skillwatch.svg';
import {
    LeftContainer,
    RightContainer,
    StyleContentWrapper,
    StyleHeading,
    StyleSubHeading,
    StyledBox,
    StyledDiv
} from './ForgotPassword.Styled';
import { useForgotPassword } from './useForgotPassword';

export const ForgotPassword: React.FC = () => {
    const options = {
        animationData: ForgetPasswordAnimation,
        loop: true
    };
    const navigate = useNavigate();
    const { View } = useLottie(options);
    const { ForgotPasswordHandler, isLoading, data, handleTextField } = useForgotPassword();

    return (
        <PageContent>
            <LogoWrapper>
                <Logo href={process.env.LOGIN_URL}>
                    <SkillWatchLogo />
                </Logo>
            </LogoWrapper>
            <StyledBox>
                <LeftContainer>{View}</LeftContainer>
                <StyledDiv>
                    <RightContainer>
                        <StyleContentWrapper>
                            <StyleHeading textAlign="center" textVariant="h2" textWeight="Medium">
                                Forgot Password?
                            </StyleHeading>
                            <StyleSubHeading textVariant="body1">
                                Enter the registered email associated with your account and we&apos;ll send an email with instructions to
                                reset your password.
                            </StyleSubHeading>
                        </StyleContentWrapper>
                        <StyleContentWrapper>
                            <TextField
                                size="M"
                                variant="outlined"
                                name="emailId"
                                label="Enter email id"
                                fullWidth={true}
                                value={data.emailId}
                                onChange={e => handleTextField(e)}
                                errorText={data.errors.emailId}
                                data-testid="email-input"
                            />
                        </StyleContentWrapper>
                        <StyleButton
                            type="submit"
                            size="M"
                            onClick={ForgotPasswordHandler}
                            fullWidth={true}
                            isLoading={isLoading}
                            disabled={data.emailId === '' || data.errors.emailId !== ''}
                            data-testid="submit-btn"
                        >
                            Send Reset Password Email
                        </StyleButton>
                    </RightContainer>
                    <QuickLink onClick={() => navigate(routeConstants.login)}>Go to Login</QuickLink>
                </StyledDiv>
            </StyledBox>
        </PageContent>
    );
};
