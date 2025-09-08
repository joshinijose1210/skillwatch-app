import { Logo, LogoWrapper } from '@common';
import { Loader, PageContent, PasswordError } from '@components';
import { routeConstants } from '@constants';
import { Text, TextField } from '@medly-components/core';
import { RemoveRedEyeIcon } from '@medly-components/icons';
import { QuickLink, StyleButton } from '@pages/Login/Login.styled';
import NotFound404 from '@pages/NotFound404';
import Lottie from 'lottie-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import resetPasswordAnimation from '../../constants/images/animations/resetPassword.json';
import { ReactComponent as SkillWatchLogo } from '../../constants/images/logos/Skillwatch.svg';
import { LeftContainer, RightContainer, StyleContentWrapper, StyledBox } from './ResetPassword.styled';
import { useResetPassword } from './useResetPassword';

export const ResetPassword: FC = () => {
    const {
        data,
        handleSetPassword,
        isLoading,
        handleTextField,
        passwordVisible,
        passwordVisibleHandler,
        handleMouseEvent,
        confirmPasswordVisible,
        linkValid,
        id,
        linkInvalid,
        linkChecking,
        isDisabled
    } = useResetPassword();

    const navigate = useNavigate();

    if (linkChecking && (!linkValid || !linkInvalid)) {
        return <Loader />;
    } else if (id && linkValid) {
        return (
            <PageContent>
                <LogoWrapper>
                    <Logo href={process.env.LOGIN_URL}>
                        <SkillWatchLogo />
                    </Logo>
                </LogoWrapper>
                <StyledBox>
                    <LeftContainer>
                        <Lottie animationData={resetPasswordAnimation} loop />
                    </LeftContainer>
                    <RightContainer>
                        <StyleContentWrapper>
                            <Text textVariant="h2" textWeight="Medium">
                                Reset Password
                            </Text>
                        </StyleContentWrapper>
                        <StyleContentWrapper>
                            <TextField
                                size="M"
                                variant="outlined"
                                name="password"
                                id="password"
                                label="New Password"
                                fullWidth={true}
                                errorText={data.password.length === 0 ? data.errors.password : ''}
                                value={data.password}
                                onChange={e => handleTextField(e)}
                                suffix={() => (
                                    <RemoveRedEyeIcon
                                        id="btn"
                                        onMouseUp={handleMouseEvent}
                                        onMouseDown={handleMouseEvent}
                                        onClick={() => {
                                            passwordVisibleHandler('password');
                                        }}
                                        iconColor={passwordVisible ? 'blue' : 'grey'}
                                        data-testid="password-visibility"
                                    />
                                )}
                                type={passwordVisible ? 'text' : 'password'}
                                data-testid="password-input"
                            />
                            {data.password.length !== 0 && <PasswordError value={data.password} />}

                            <TextField
                                size="M"
                                variant="outlined"
                                name="confirmPassword"
                                label="Confirm New Password"
                                fullWidth={true}
                                disabled={data.password === '' || data.errors.password ? true : false}
                                value={data.confirmPassword}
                                onChange={e => handleTextField(e)}
                                errorText={
                                    data.confirmPassword.length === 0 || data.errors.confirmPassword ? data.errors.confirmPassword : ''
                                }
                                suffix={() => (
                                    <RemoveRedEyeIcon
                                        onMouseUp={handleMouseEvent}
                                        onMouseDown={handleMouseEvent}
                                        onClick={() => {
                                            passwordVisibleHandler('confirmPassword');
                                        }}
                                        iconColor={confirmPasswordVisible ? 'blue' : 'grey'}
                                        data-testid="confirm-password-visibility"
                                    />
                                )}
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                data-testid="confirm-password-input"
                            />
                        </StyleContentWrapper>

                        <StyleButton
                            type="submit"
                            size="M"
                            disabled={isDisabled}
                            onClick={handleSetPassword}
                            fullWidth={true}
                            isLoading={isLoading}
                            data-testid="reset-btn"
                        >
                            Reset Password
                        </StyleButton>
                        <QuickLink as="a" onClick={() => navigate(routeConstants.login)}>
                            Go to Login
                        </QuickLink>
                    </RightContainer>
                </StyledBox>
            </PageContent>
        );
    } else {
        return <NotFound404 />;
    }
};
