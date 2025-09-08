import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useForgotPasswordApiMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useForgotPassword = () => {
    const navigateTo = useNavigate();
    const [addForgotPassword, { error, isSuccess, isLoading }] = useForgotPasswordApiMutation();
    const [data, setData] = useState({
        emailId: '',
        errors: {
            emailId: ''
        }
    });

    const handleTextField = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const { name, value } = e.target as HTMLInputElement;
            const err = data.errors;
            let val;

            switch (name) {
                case 'emailId':
                    err.emailId = performValidation('emailId', value);
                    val = value;
                    break;
            }
            setData({
                ...data,
                [name]: val,
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

    const ForgotPasswordHandler = () => {
        const err = data.errors;
        err.emailId = performValidation('emailId', data.emailId);

        setData({
            ...data,
            errors: err
        });
        if (validateData()) {
            addForgotPassword({
                emailId: data.emailId
            });
        }
    };

    useEffect(() => {
        if (error && typeof error === 'object') {
            const errorObj = error as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.errorMessage || 'something went wrong',
                timer: 3000
            });
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            addToast({
                variant: 'success',
                header: 'If the email address is registered, you will receive a password reset email.',
                timer: 3000
            });
            navigateTo(routeConstants.resetPasswordVerification, {
                state: { data, name: 'Forgot password' }
            });
        }
    }, [data, isSuccess, navigateTo]);

    return {
        ForgotPasswordHandler,
        isLoading,
        handleTextField,
        data
    };
};
