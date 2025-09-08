import { useEffect } from 'react';
import { addToast } from '@medly-components/core';
import { ErrorType } from '@common/types';

export const useErrorToast = (error: ErrorType, defaultMessage: string) => {
    useEffect(() => {
        if (error) {
            addToast({
                variant: 'error',
                header: error?.data?.errorMessage || defaultMessage,
                timer: 3000
            });
        }
    }, [error, defaultMessage]);
};

export const useSuccessToast = (isSuccess: boolean, message: string, onSuccessCallback: () => void) => {
    useEffect(() => {
        if (isSuccess) {
            addToast({
                variant: 'success',
                header: message,
                timer: 3000
            });
            onSuccessCallback?.();
        }
    }, [isSuccess, message, onSuccessCallback]);
};
