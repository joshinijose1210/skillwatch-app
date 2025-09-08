import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useForgotPasswordApiMutation, useGetResendMailQuery } from '@slice/services';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useVerificationMail = () => {
    const NavigateTo = useNavigate();
    const { email, name } = (useLocation().state || {}) as any;
    const [skip, setSkip] = useState(true);
    const [addForgotPassword, { error: resetError, isSuccess: resetSuccess, isLoading: resetLoading }] = useForgotPasswordApiMutation();

    useEffect(() => {
        if (!email) {
            NavigateTo(routeConstants.login);
        }
    }, [NavigateTo, email]);

    const { error, isSuccess, isLoading } = useGetResendMailQuery(
        {
            path: '',
            params: [{ name: 'emailId', value: email }]
        },
        { skip }
    );

    const reSendMailHandler = () => {
        if (name === 'Forgot password') {
            addForgotPassword({
                emailId: email
            });
        } else {
            setSkip(false);
        }
    };

    useEffect(() => {
        if (isSuccess || resetSuccess) {
            addToast({
                variant: 'success',
                header: resetSuccess
                    ? 'Reset password link send successfully to your e-mail.'
                    : 'Set password link send successfully to your e-mail.',
                timer: 3000
            });
            {
                isSuccess && setSkip(true);
            }
        }
    }, [isSuccess, resetSuccess]);

    useEffect(() => {
        if (resetError || error || (error && (error as any)?.status === 404)) {
            const addError = error as ErrorType;
            addToast({
                variant: 'error',
                header: addError.data.errorMessage || 'Something went wrong.',
                timer: 3000
            });
        }
    }, [error, resetError]);
    return { reSendMailHandler, isLoading, name, resetLoading, email };
};
