import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import apiUrls from '@constants/apiUrls';
import { addToast, removeAllToasts } from '@medly-components/core';
import { usePostOrgAdminSignUpDataMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import jwt_decode from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useOrgAminSignUp = () => {
    const [addOrgAdminSignUp, { error, isSuccess, isLoading }] = usePostOrgAdminSignUpDataMutation();
    const [email, setEmail] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const navigateTo = useNavigate();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        errors: {
            firstName: '',
            lastName: '',
            emailId: ''
        }
    });

    const handleTextField = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const { name, value } = e.target as HTMLInputElement;
            const err = data.errors;

            switch (name) {
                case 'firstName':
                    err.firstName = performValidation('firstName', value);
                    break;
                case 'lastName':
                    err.lastName = performValidation('lastName', value);
                    break;
                case 'emailId':
                    err.emailId = performValidation('emailId', value);
                    break;
            }
            setData({
                ...data,
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

    const handelSubmit = () => {
        const err = data.errors;
        err.firstName = performValidation('firstName', data.firstName);
        err.lastName = performValidation('lastName', data.lastName);
        err.emailId = performValidation('emailId', data.emailId);

        setData({
            ...data,
            errors: err
        });
        if (validateData()) {
            setEmail(data.emailId);
            addOrgAdminSignUp({
                firstName: data.firstName,
                lastName: data.lastName,
                emailId: data.emailId
            });
        }
    };

    const authHandler = async (err: any, data: any) => {
        if (err) {
            console.log(error);
        }
        const response: any = await fetch(apiUrls.microsoftAuth, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${data.accessToken}`
            }
        });

        const jsonData = await response.json();
        if (jsonData.userPrincipalName) {
            setEmail(jsonData.userPrincipalName);
            addOrgAdminSignUp({ emailId: jsonData.userPrincipalName, firstName: jsonData.givenName, lastName: jsonData.surname });
        }
    };

    const onSuccess = (res: any) => {
        const decoded = jwt_decode(res.credential);
        const adminDetail = decoded as any;
        setEmail(adminDetail.email);
        addOrgAdminSignUp({
            firstName: adminDetail.given_name,
            lastName: adminDetail.family_name,
            emailId: adminDetail.email
        });
    };
    const onError = () => {
        console.log('failed:');
    };

    useEffect(() => {
        setIsDisabled(!(data && data.firstName.length > 0 && data.lastName.length > 0 && data.emailId.length > 0 && validateData()));
    }, [data, validateData]);

    useEffect(() => {
        if (isSuccess) {
            navigateTo(routeConstants.companyInfoPage, {
                state: { email }
            });
        }
    }, [email, isSuccess, navigateTo]);
    useEffect(() => {
        if (error || (error && (error as any)?.status === 404)) {
            const addError = error as ErrorType;
            removeAllToasts();
            setIsDisabled(true);
            addToast({
                variant: 'error',
                header: addError?.data?.errorMessage || 'Something went wrong.',
                timer: 3000
            });
        }
    }, [error]);

    // commented this part because it only logs some url to console , might need in future
    // useEffect(() => {
    //     if (window.location.href.includes('code')) {
    //         const params = new URLSearchParams(window.location.search);
    //         const code = params.get('code');
    //         console.log(
    //             `https://accounts.zoho.in/oauth/v2/token?grant_type=authorization_code&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&redirect_uri=${window.location.origin}/sign-up/org-admin&scope=ZohoMail.accounts.READ&code=${code}`
    //         );

    //         // axios({
    //         //     url: `https://accounts.zoho.in/oauth/v2/token?grant_type=authorization_code&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&redirect_uri=${window.location.origin}/sign-up/org-admin&scope=ZohoMail.accounts.READ&code=${code}`,
    //         //     method: 'POST',
    //         //     headers: {
    //         //         'Content-Type': 'application/json'
    //         //     }
    //         // })
    //         //     .then(res => console.log(res.data))
    //         //     .catch(err => console.log(err));
    //     }
    // }, []);

    return {
        handelSubmit,
        isLoading,
        handleTextField,
        data,
        isDisabled,
        authHandler,
        onSuccess,
        onError
    };
};
