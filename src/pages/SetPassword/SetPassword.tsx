import { Logo, LogoWrapper } from '@common';
import { Loader, PageContent, PasswordError } from '@components';
import { Text, TextField } from '@medly-components/core';
import { RemoveRedEyeIcon } from '@medly-components/icons';
import { StyleButton } from '@pages/Login/Login.styled';
import NotFound404 from '@pages/NotFound404';
import Lottie from 'lottie-react';
import { FC } from 'react';
import setPasswordAnimation from '../../constants/images/animations/forgetPassword.json';
import { ReactComponent as SkillWatchLogo } from '../../constants/images/logos/Skillwatch.svg';
import { LeftContainer, RightContainer, StyleContentWrapper, StyledBox } from './SetPassword.styled';
import { useSetPassword } from './useSetPassword';
export const SetPassword: FC = () => {
    const {
        data,
        handleTextField,
        handleSetPassword,
        handleMouseEvent,
        isLoading,
        id,
        linkChecking,
        linkValid,
        linkInvalid,
        isDisabled,
        passwordVisible,
        passwordVisibleHandler,
        confirmPasswordVisible
    } = useSetPassword();

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
                        <Lottie animationData={setPasswordAnimation} />
                    </LeftContainer>
                    <RightContainer>
                        <StyleContentWrapper>
                            <Text textAlign="center" textVariant="h2" textWeight="Medium">
                                Set Password
                            </Text>
                        </StyleContentWrapper>
                        <StyleContentWrapper>
                            <TextField
                                size="M"
                                type={passwordVisible ? 'text' : 'password'}
                                variant="outlined"
                                name="password"
                                label="Password"
                                fullWidth={true}
                                errorText={data.password.length === 0 ? data.errors.password : ''}
                                value={data.password}
                                onChange={e => handleTextField(e)}
                                suffix={() => (
                                    <RemoveRedEyeIcon
                                        onMouseUp={handleMouseEvent}
                                        onMouseDown={handleMouseEvent}
                                        onClick={() => {
                                            passwordVisibleHandler('password');
                                        }}
                                        iconColor={passwordVisible ? 'blue' : 'grey'}
                                        data-testid="password-visibility"
                                    />
                                )}
                                data-testid="password-input"
                            />
                            {data.password.length !== 0 && <PasswordError value={data.password} />}
                            <TextField
                                size="M"
                                variant="outlined"
                                name="confirmPassword"
                                label="Confirm Password"
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
                            onClick={handleSetPassword}
                            disabled={isDisabled}
                            fullWidth={true}
                            isLoading={isLoading}
                            data-testid="set-btn"
                        >
                            Set Password
                        </StyleButton>
                    </RightContainer>
                </StyledBox>
            </PageContent>
        );
    } else return <NotFound404 />;
};
