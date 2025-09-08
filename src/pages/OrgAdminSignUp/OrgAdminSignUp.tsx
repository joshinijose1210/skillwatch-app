import { Logo, LogoWrapper } from '@common';
import Grid from '@components/layout/Grid';
import { routeConstants } from '@constants';
import msftLogo from '@constants/images/logos/microsoft.png';
import { Text, TextField } from '@medly-components/core';
import { LoginBanner, LoginIcon, QuickLink, StyleButton, StyleLine, StyleText } from '@pages/Login/Login.styled';
import { GoogleLogin } from '@react-oauth/google';
import Lottie from 'lottie-react';
import MicrosoftLogin from 'react-microsoft-login';
import { useNavigate } from 'react-router-dom';
import orgAdminAnimation from '../../constants/images/animations/orgAdmin.json';
import { ReactComponent as SkillWatchLogo } from '../../constants/images/logos/Skillwatch.svg';
import {
    ColumWrapper,
    FlexWrapper,
    Link,
    StyleContentWrapper,
    StylePageContent,
    StyleSignUpBox,
    StyledBox,
    StyledDiv,
    TitleWrapper
} from './OrgAdminSignUp.styled';
import { useOrgAminSignUp } from './useOrgAdminSignUp';
import MetaHead from '@components/reusableComponents/MetaHead';
export const OrgAdminSignUp: React.FC = () => {
    const { isLoading, handleTextField, data, handelSubmit, isDisabled, onError, onSuccess, authHandler } = useOrgAminSignUp();
    const navigate = useNavigate();

    return (
        <StylePageContent>
            <MetaHead
                data={{
                    title: 'SkillWatch | Sign Up',
                    description:
                        'Get started with your Free SkillWatch account — No complex tools, No spreadsheets. No chaos. Just smart and simple structure'
                }}
            />
            <LogoWrapper>
                <Logo href={process.env.LOGIN_URL}>
                    <SkillWatchLogo />
                </Logo>
            </LogoWrapper>
            <StyledBox>
                <Lottie id="signUp-animation" animationData={orgAdminAnimation} />
                <StyledDiv>
                    <StyleSignUpBox>
                        <TitleWrapper>
                            <Text textAlign="center" textVariant="h2" textWeight="Medium">
                                Org Admin Sign up
                            </Text>
                        </TitleWrapper>
                        <FlexWrapper>
                            <TextField
                                size="M"
                                variant="outlined"
                                name="firstName"
                                label="First Name"
                                fullWidth={true}
                                value={data.firstName}
                                onChange={e => handleTextField(e)}
                                errorText={data.errors.firstName}
                                data-testid="firstNameInput"
                            />
                            <TextField
                                size="M"
                                variant="outlined"
                                name="lastName"
                                label="Last Name"
                                fullWidth={true}
                                value={data.lastName}
                                onChange={e => handleTextField(e)}
                                errorText={data.errors.lastName}
                                data-testid="lastNameInput"
                            />
                        </FlexWrapper>

                        <ColumWrapper>
                            <TextField
                                size="M"
                                variant="outlined"
                                name="emailId"
                                label="Email"
                                fullWidth={true}
                                value={data.emailId}
                                onChange={e => handleTextField(e)}
                                errorText={data.errors.emailId}
                                data-testid="emailInput"
                            />
                        </ColumWrapper>
                        <StyleContentWrapper>
                            <StyleButton
                                type="submit"
                                size="M"
                                onClick={handelSubmit}
                                disabled={isDisabled}
                                fullWidth={true}
                                isLoading={isLoading}
                                data-testid="submitButton"
                            >
                                Create Account
                            </StyleButton>
                            <StyleLine>
                                <StyleText>or</StyleText>
                            </StyleLine>
                            <Text textVariant="body2">Create Account using</Text>
                            <Grid row={true} columnGap={1} justify="center" expanded>
                                <GoogleLogin data-testid="googleAuthButton" onSuccess={onSuccess} onError={onError} type="icon" />

                                {/* <LoginBanner
                                    href={`${apiUrls.zohoAuth}/auth?scope=ZohoMail.accounts.READ&client_id=${process.env.ZOHO_CLIENT_ID}&redirect_uri=${window.location.origin}/sign-up/org-admin&response_type=code&access_type=online`}
                                >
                                    <LoginIcon src={zohoLogo} alt="zoho logo" width="60px" />
                                </LoginBanner> */}
                                <MicrosoftLogin
                                    data-testid="msAuthButton"
                                    clientId={process.env.MICROSOFT_ID || ''}
                                    authCallback={authHandler}
                                    prompt="select_account"
                                >
                                    <LoginBanner>
                                        <LoginIcon src={msftLogo} alt="microsoft logo" width="20px" />
                                    </LoginBanner>
                                </MicrosoftLogin>
                            </Grid>
                            <Text textVariant="body2">
                                By creating account using Google/Microsoft/Email, you acknowledge that you have read and understood, and
                                agree to SkillWatch&apos;s{' '}
                                <Link href={`${process.env.LOGIN_URL}terms-and-conditions`} target="_blank">
                                    Terms & Conditions
                                </Link>{' '}
                                and{' '}
                                <Link href={`${process.env.LOGIN_URL}privacy-policy`} target="_blank">
                                    Privacy Policy
                                </Link>{' '}
                                .
                            </Text>
                        </StyleContentWrapper>
                    </StyleSignUpBox>
                    <QuickLink onClick={() => navigate(routeConstants.login)}>Go to login</QuickLink>
                </StyledDiv>
            </StyledBox>
        </StylePageContent>
    );
};
