import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useCheckLinkValidityQuery, useSetPasswordMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import { Buffer } from 'buffer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useResetPassword = () => {
    const [resetPassword, { isSuccess, isLoading, error }] = useSetPasswordMutation();
    const navigateTo = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'),
        encryptedEmail = searchParams.get('emailId');

    const emailId = encryptedEmail && Buffer.from(encryptedEmail, 'base64').toString('ascii');
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {
        isSuccess: linkValid,
        isLoading: linkChecking,
        isError: linkInvalid
    } = useCheckLinkValidityQuery(
        {
            id
        },
        {
            skip: !id
        }
    );
    const [data, setData] = useState({
        password: '',
        confirmPassword: '',
        errors: {
            password: '',
            confirmPassword: ''
        }
    });

    const handleTextField = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const { name, value } = e.target as HTMLInputElement;
            const err = data.errors;
            let updatedData = { ...data };
            switch (name) {
                case 'password':
                    err.password = performValidation('password', value);
                    if (value === '') {
                        updatedData = {
                            ...data,
                            confirmPassword: ''
                        };
                    }
                    break;
                case 'confirmPassword':
                    if (value === '') {
                        err.confirmPassword = performValidation('confirmPassword', value);
                    } else if (value !== data.password) {
                        err.confirmPassword = 'New password and confirm new password should be same.';
                    } else {
                        err.confirmPassword = '';
                    }
                    break;
            }
            setData({
                ...updatedData,
                [name]: value,
                errors: err
            });
        },
        [data]
    );

    const validateData = useCallback(() => {
        let valid = true;
        Object.values(data.errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    }, [data.errors]);

    const handleSetPassword = () => {
        const err = data.errors;
        err.password = performValidation('password', data.password);
        err.confirmPassword = performValidation('confirmPassword', data.confirmPassword);

        setData({
            ...data,
            errors: err
        });
        if (validateData() && linkValid) {
            resetPassword({
                password: data.password,
                linkId: id,
                emailId
            });
        }
    };
    const handleMouseEvent = (e: any) => {
        e.preventDefault();
    };
    const passwordVisibleHandler = (name: any) => {
        if (name === 'password') {
            setPasswordVisible(!passwordVisible);
        } else if (name === 'confirmPassword') {
            setConfirmPasswordVisible(!confirmPasswordVisible);
        }
    };
    const isDisabled = useMemo(
        () => !(data && data.password.length > 0 && data.confirmPassword.length > 0 && validateData()),
        [data, validateData]
    );

    useEffect(() => {
        if (isSuccess) {
            addToast({
                variant: 'success',
                header: 'Password reset successfully',
                timer: 3000
            });
            navigateTo(routeConstants.login);
        }
    }, [isSuccess, navigateTo]);

    useEffect(() => {
        if (error || (error && (error as any)?.status === 401)) {
            const errorResponse = error as any;
            addToast({
                variant: 'error',
                header: errorResponse?.data?.errorMessage || 'Something went wrong.',
                timer: 3000
            });
        }
    }, [error]);

    useEffect(() => {
        if (linkInvalid) {
            navigateTo(routeConstants.login, {
                state: {
                    error: true,
                    header: 'Error!',
                    message: 'Invalid/expired link.'
                }
            });
        }
    }, [linkInvalid, navigateTo]);

    return {
        id,
        data,
        isDisabled,
        handleMouseEvent,
        handleSetPassword,
        isLoading,
        handleTextField,
        linkValid,
        linkChecking,
        linkInvalid,
        passwordVisible,
        passwordVisibleHandler,
        confirmPasswordVisible
    };
};
