import { Logo } from '@common';
import { routeConstants } from '@constants';
import { Text, TextField } from '@medly-components/core';
import { RemoveRedEyeIcon } from '@medly-components/icons';
import { Navigate } from 'react-router-dom';
import { ReactComponent as SkillWatchLogo } from '../../constants/images/logos/Skillwatch.svg';
import Hand from '../../constants/images/logos/hand.png';
import * as Styled from './SuperAdminLogin.styled';
import { useSuperAdminLogin } from './useSuperAdminLogin';
import { useAutoLoginLogout } from '@common/hooks/useAutoLoginLogout';

export const SuperAdminLogin = () => {
    const {
        isFetchingToken,
        isDisabled,
        userDetails,
        logInHandle,
        userData,
        handleTextField,
        isUserDataLoading,
        passwordVisible,
        passwordVisibleHandler
    } = useSuperAdminLogin();
    useAutoLoginLogout();

    if (!userDetails.isLoggedIn) {
        return (
            <Styled.StylePageContent>
                <Styled.LogoWrapper>
                    <Logo href={process.env.LOGIN_URL}>
                        <SkillWatchLogo />
                    </Logo>
                </Styled.LogoWrapper>
                <Styled.RowWrapper>
                    <Styled.Login>
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
                                        data-testid="emailInput"
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
                                        label="Password"
                                        data-testid="passwordInput"
                                        fullWidth={true}
                                        value={userData.password}
                                        onChange={e => handleTextField(e)}
                                        errorText={userData.errors.password}
                                        suffix={() => (
                                            <RemoveRedEyeIcon
                                                data-testid="passwordVisibleHandler"
                                                onClick={passwordVisibleHandler}
                                                iconColor={passwordVisible ? 'blue' : 'grey'}
                                            />
                                        )}
                                    />
                                    <Styled.StyleButton
                                        type="submit"
                                        data-testid="submitButton"
                                        size="M"
                                        fullWidth={true}
                                        disabled={isDisabled}
                                        isLoading={isFetchingToken || isUserDataLoading}
                                    >
                                        Login
                                    </Styled.StyleButton>
                                </Styled.LoginForm>
                            </Styled.LoginRight>
                        </Styled.StyledDiv>
                    </Styled.Login>
                </Styled.RowWrapper>
            </Styled.StylePageContent>
        );
    } else {
        return <Navigate to={routeConstants.root} />;
    }
};
