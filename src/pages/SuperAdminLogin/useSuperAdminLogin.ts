import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppDispatch, useAppSelector } from '@slice';
import { useGetAccessTokenMutation, useGetEmployeeQuery } from '@slice/services';
import { addUser } from '@slice/user';
import { performValidation } from '@utils/validations';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSuperAdminLogin = () => {
    const [getAccessToken, { isLoading: isFetchingToken, data: tokenData, error: loginError }] = useGetAccessTokenMutation();

    const { state }: any = useLocation(),
        userDetails = useAppSelector(state => state.user),
        dispatch = useAppDispatch(),
        navigateTo = useNavigate();

    const [email, setEmail] = useState(''),
        [clicked, setClicked] = useState(false),
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
                path: '/super-admin',
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

    useEffect(() => {
        if (tokenData && Object.values(tokenData).length > 0) {
            setClicked(true);
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
                    organisationId: 0,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email,
                    phoneNumber: data.contactNo,
                    employeeId: '',
                    roleName: '',
                    teamName: '',
                    modulePermission: data.modulePermission || [],
                    designationName: '',
                    departmentName: '',
                    isLoggedIn: true,
                    onboardingFlow: false,
                    isSuperAdmin: true
                })
            );
            navigateTo('/admin');
        }
    }, [data, dispatch, email, navigateTo]);

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
    }, [error, navigateTo]);

    return {
        isUserDataLoading,
        isFetchingToken,
        userDetails,
        logInHandle,
        handleTextField,
        passwordVisibleHandler,
        passwordVisible,
        userData,
        isDisabled
    };
};
