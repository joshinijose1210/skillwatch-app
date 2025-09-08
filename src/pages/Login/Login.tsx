import { Logo, LogoWrapper } from '@common';
import { Loader } from '@components';
import Grid from '@components/layout/Grid';
import { routeConstants } from '@constants';
import apiUrls from '@constants/apiUrls';
import msftLogo from '@constants/images/logos/microsoft.png';
import zohoLogo from '@constants/images/logos/zoho.png';
import google from '@constants/images/logos/google.png';
import { Text, TextField } from '@medly-components/core';
import { RemoveRedEyeIcon } from '@medly-components/icons';
import Lottie from 'lottie-react';
import { Navigate, useNavigate } from 'react-router-dom';
import loginAnimation from '../../constants/images/animations/login.json';
import { ReactComponent as SkillWatchLogo } from '../../constants/images/logos/Skillwatch.svg';
import Hand from '../../constants/images/logos/hand.png';
import * as Styled from './Login.styled';
import { useLogin } from './useLogin';
import { useAutoLoginLogout } from '@common/hooks/useAutoLoginLogout';
import MetaHead from '@components/reusableComponents/MetaHead';

export const Login = () => {
    const {
        isFetchingToken,
        isDisabled,
        userDetails,
        logInHandle,
        userData,
        handleTextField,
        isUserDataLoading,
        passwordVisible,
        googleClicked,
        passwordVisibleHandler,
        handleGoogleLogin,
        handleMSLogin
    } = useLogin();
    useAutoLoginLogout();

    const navigate = useNavigate();

    const redirectUri = `${window.location.origin}/app`;

    if (googleClicked) {
        return <Loader />;
    } else if (!userDetails.isLoggedIn) {
        return (
            <Styled.StylePageContent>
                <MetaHead
                    data={{
                        title: 'SkillWatch | Login',
                        description:
                            "Welcome back! Login to your SkillWatch account to track goals, share feedback, and manage your team's performance with ease."
                    }}
                />
                <LogoWrapper>
                    <Logo href={process.env.LOGIN_URL}>
                        <SkillWatchLogo />
                    </Logo>
                </LogoWrapper>
                <Styled.RowWrapper>
                    <Styled.Login>
                        <Styled.LoginLeft>
                            <Lottie animationData={loginAnimation} loop />
                        </Styled.LoginLeft>
                        <Styled.StyledDiv>
                            <Styled.LoginRight>
                                <Styled.RowWrapper>
                                    <Text textVariant="h2" textWeight="Medium">
                                        Hello there
                                    </Text>
                                    <Styled.StyleHandImage src={Hand} alt="hand" />
                                </Styled.RowWrapper>
                                <Styled.LoginForm onSubmit={logInHandle} autoComplete="off">
                                    <TextField
                                        size="M"
                                        type="name"
                                        variant="outlined"
                                        name="email"
                                        label="Email"
                                        data-testid="email"
                                        fullWidth={true}
                                        value={userData.email}
                                        onChange={e => handleTextField(e)}
                                        errorText={userData.errors.email}
                                    />
                                    <TextField
                                        size="M"
                                        type={passwordVisible ? 'text' : 'password'}
                                        variant="outlined"
                                        name="password"
                                        data-testid="password"
                                        label="Password"
                                        fullWidth={true}
                                        value={userData.password}
                                        onChange={e => handleTextField(e)}
                                        errorText={userData.errors.password}
                                        suffix={() => (
                                            <RemoveRedEyeIcon
                                                data-testid="view-pass"
                                                onClick={passwordVisibleHandler}
                                                iconColor={passwordVisible ? 'blue' : 'grey'}
                                            />
                                        )}
                                    />

                                    <Styled.ForgotPasswordButton
                                        data-testid="forgot-password"
                                        onClick={() => navigate(routeConstants.forgotPassword)}
                                    >
                                        Forgot password?
                                    </Styled.ForgotPasswordButton>
                                    <Styled.StyleButton
                                        type="submit"
                                        size="M"
                                        data-testid="submitBtn"
                                        fullWidth={true}
                                        disabled={isDisabled}
                                        isLoading={!googleClicked && (isFetchingToken || isUserDataLoading)}
                                    >
                                        Login
                                    </Styled.StyleButton>
                                </Styled.LoginForm>

                                <Styled.StyleLine>
                                    <Styled.StyleText>or</Styled.StyleText>
                                </Styled.StyleLine>
                                <Text textVariant="body2">Login using</Text>
                                <Grid row={true} columnGap={1} justify="center" expanded>
                                    <Styled.LoginBanner data-testid="googleAuthBtn" onClick={() => handleGoogleLogin()}>
                                        <Styled.LoginIcon src={google} alt="google logo" width="20px" />
                                    </Styled.LoginBanner>
                                    <Styled.LoginBanner
                                        href={`${apiUrls.zohoAuth}/auth?response_type=code&client_id=${process.env.ZOHO_CLIENT_ID}&scope=email&redirect_uri=${redirectUri}/login`}
                                    >
                                        <Styled.LoginIcon src={zohoLogo} alt="zoho logo" width="60px" />
                                    </Styled.LoginBanner>
                                    <Styled.LoginBanner data-testid="msAuthBtn" onClick={() => handleMSLogin()}>
                                        <Styled.LoginIcon src={msftLogo} alt="microsoft logo" width="20px" />
                                    </Styled.LoginBanner>
                                </Grid>
                            </Styled.LoginRight>
                            <Styled.QuickLinkWrapper>
                                <Styled.QuickLink data-testid="sign-up" onClick={() => navigate(routeConstants.orgAdminSignUp)}>
                                    Org admin? Sign up here
                                </Styled.QuickLink>
                            </Styled.QuickLinkWrapper>
                        </Styled.StyledDiv>
                    </Styled.Login>
                </Styled.RowWrapper>
            </Styled.StylePageContent>
        );
    } else {
        return <Navigate to={routeConstants.root} />;
    }
};
