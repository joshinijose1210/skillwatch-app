import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '@slice';
import { useGetAccessTokenMutation, useGetEmployeeQuery } from '@slice/services';
import { addUser } from '@slice/user';
import { performValidation } from '@utils/validations';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [getAccessToken, { isLoading: isFetchingToken, data: tokenData, error: loginError }] = useGetAccessTokenMutation();

    const redirectUri = `${window.location.origin}/app`;

    const { state }: any = useLocation(),
        userDetails = useAppSelector(state => state.user),
        dispatch = useAppDispatch(),
        navigateTo = useNavigate();

    const [email, setEmail] = useState(''),
        [clicked, setClicked] = useState(false),
        [googleClicked, setGoogleClicked] = useState(false),
        [passwordVisible, setPasswordVisible] = useState(false);

    const [userData, setUserData] = useState({
        password: '',
        email: '',
        errors: {
            password: '',
            email: ''
        }
    });

    const {
        data,
        isLoading: isUserDataLoading,
        error
    } = useGetEmployeeQuery(
        {
            path: 'email',
            params: [{ name: 'emailId', value: email }]
        },
        {
            skip: email === '' || !clicked,
            refetchOnMountOrArgChange: true
        }
    );

    const handleTextField = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const { name, value } = e.target as HTMLInputElement;
            const err = userData.errors;
            switch (name) {
                case 'email':
                    err.email = performValidation('emailId', value);
                    break;
                case 'password':
                    err.password = performValidation('loginPassword', value);
            }
            setUserData({
                ...userData,
                [name]: value,
                errors: err
            });
        },
        [userData]
    );

    const validateData = useCallback(() => {
        let valid = true;
        Object.values(userData.errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    }, [userData.errors]);

    const logInHandle = (e: React.FormEvent) => {
        e.preventDefault();
        const err = userData.errors;
        err.email = performValidation('emailId', userData.email);
        err.password = performValidation('loginPassword', userData.password);

        setUserData({
            ...userData,
            errors: err
        });
        if (validateData()) {
            getAccessToken({
                path: '/username',
                data: {
                    username: userData.email,
                    password: userData.password
                }
            });
            setEmail(userData.email);
        }
    };

    const passwordVisibleHandler = () => {
        setPasswordVisible(!passwordVisible);
    };
    // commenting because function not used, maybe required in future
    // const handleRequest = () => {
    //     if (email !== '') {
    //         setEmail('');
    //     }
    // };

    const onSuccess = (codeResponse: any) => {
        setGoogleClicked(true);
        getAccessToken({
            path: '/google/callback',
            data: {
                code: codeResponse.code
            }
        });
    };

    const onError = () => {
        console.log('failed:');
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess,
        onError,
        redirect_uri: redirectUri,
        flow: 'auth-code',
        scope: 'email'
    });

    const handleMSLogin = () => {
        setGoogleClicked(true);
        const authorizationUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.MICROSOFT_ID}&response_type=code&redirect_uri=${redirectUri}/login&response_mode=query&scope=user.read+openid+email&code_challenge=Nj9Youq443xUOCe_HsmBXJy5dKC8YsqlUdn1sga3CR0&code_challenge_method=plain&prompt=select_account&state=5feff69c95ed70a9869d9f9af7d8400a6673bb9ce9`;
        window.location.href = authorizationUrl;
    };

    useEffect(() => {
        if (tokenData && Object.values(tokenData).length > 0) {
            setClicked(true);
            setGoogleClicked(true);
            setEmail(tokenData.authentication.name);
            const tokenInfo = {
                ...tokenData.authentication.attributes,
                email: tokenData.authentication.name,
                authenticated: tokenData.authenticated
            };
            localStorage.setItem('token', JSON.stringify(tokenInfo));
        } else if (loginError) {
            const errorObj = loginError as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data?.message || 'Something went wrong. Please try again later.',
                timer: 3000
            });
            if (errorObj.data.message === 'Please add organisation details!') {
                navigateTo(routeConstants.companyInfoPage, {
                    state: { email }
                });
            }
            setGoogleClicked(false);
        }
    }, [email, loginError, navigateTo, tokenData]);

    const isDisabled = useMemo(
        () => !(userData && userData.password.length > 0 && userData.email.length > 0 && validateData()),
        [userData, validateData]
    );

    useEffect(() => {
        if (state && state.error) {
            addToast({
                variant: 'error',
                header: state.header,
                message: state.message,
                timer: 3000
            });
            window.history.replaceState({}, document.title);
        }
    }, [state]);

    useEffect(() => {
        if (data) {
            dispatch(
                addUser({
                    id: data.id,
                    organisationId: data.organisationId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email,
                    phoneNumber: data.contactNo,
                    employeeId: data.employeeId,
                    roleName: data.roleName,
                    teamName: data.teamName,
                    modulePermission: data.modulePermission || [],
                    designationName: data.designationName,
                    departmentName: data.departmentName,
                    isLoggedIn: true,
                    onboardingFlow: data.onboardingFlow,
                    isOrWasManager: data.isOrWasManager,
                    firstManagerId: data.firstManagerId,
                    secondManagerId: data.secondManagerId
                })
            );
            navigateTo('/');
        }
    }, [data, dispatch, email, navigateTo]);

    useEffect(() => {
        if (window.location.href.includes('code') && window.location.href.includes('accounts.zoho.in')) {
            setGoogleClicked(true);
            const params = new URLSearchParams(window.location.href.split('login?')[1]);
            const code = params.get('code');
            getAccessToken({
                path: '/zoho/callback',
                data: {
                    code
                }
            });
        }
        if (window.location.href.includes('code') && window.location.href.includes('state=5feff69c95ed70a9869d9f9af7d8400a6673bb9ce9')) {
            setGoogleClicked(true);
            const params = new URLSearchParams(window.location.href.split('login?')[1]);
            const code = params.get('code');
            getAccessToken({
                path: '/microsoft/callback',
                data: {
                    code
                }
            });
        }
    }, [getAccessToken]);

    useEffect(() => {
        if ((error && (error as any)?.status === 401) || (error as any)?.status === 502) {
            const errorResponse = error as any;
            addToast({
                variant: 'error',
                header: errorResponse.message || 'Unauthorized access! Please contact system administrator/HR.',
                timer: 3000
            });
            setEmail('');
            setClicked(false);
        }
    }, [error]);

    return {
        isUserDataLoading,
        isFetchingToken,
        handleGoogleLogin,
        // handleRequest,
        userDetails,
        logInHandle,
        handleTextField,
        passwordVisibleHandler,
        passwordVisible,
        userData,
        googleClicked,
        isDisabled,
        handleMSLogin
    };
};
