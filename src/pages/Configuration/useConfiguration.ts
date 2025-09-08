import { ImportErrorType } from '@common';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import {
    useGetCompanyInfoQuery,
    useGetCompanyLogoQuery,
    usePutCompanyInfoDataMutation,
    useRemoveCompanyLogoMutation
} from '@slice/services';
import { performValidation } from '@utils/validations';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import timeZones from 'timezones-list';

export const useConfiguration = () => {
    const { organisationId, modulePermission, roleName } = useAppSelector(({ user }) => user);
    const [companyName, setCompanyName] = useState(''),
        [contactNumber, setContactNumber] = useState(''),
        [companyLogo, setCompanyLogo] = useState<string | Blob | undefined>(''),
        [isLogoRemoved, setIsLogoRemoved] = useState(false),
        [isModalOpen, setModalOpen] = useState(false),
        [errors, setErrors] = useState({
            contactNumber: '',
            companyName: ''
        }),
        [timeZone, setTimeZone] = useState('');
    const { logoUploadError } = useAppSelector(({ logoError }) => logoError);
    const [addCompanyInfo, { error, isSuccess, isLoading: addCompanyInfoLoading }] = usePutCompanyInfoDataMutation();
    const [removeCompanyLogo, { error: removeLogoError, isSuccess: removeLogoSuccess, isLoading: removeLogoLoading }] =
        useRemoveCompanyLogoMutation();

    let dataChanged = false;

    const { data, isLoading } = useGetCompanyInfoQuery(
            {
                path: '',
                params: [{ name: 'id', value: organisationId }]
            },
            { refetchOnMountOrArgChange: true }
        ),
        { data: companyLogoImg, isFetching: logoStatus } = useGetCompanyLogoQuery(
            {
                path: 'logo/',
                params: [{ name: 'id', value: organisationId }]
            },
            { refetchOnMountOrArgChange: true }
        );

    if (!isLoading && data) {
        const { name: receivedCompanyName, contactNo, timeZone: fetchedTimeZone } = data;
        if (companyLogo || contactNo !== contactNumber || companyName !== receivedCompanyName || fetchedTimeZone !== timeZone)
            dataChanged = true;
        else dataChanged = false;
    }

    const sanitizeFile = (file: File) => {
        const svgPattern = /svg/i;
        if (file && svgPattern.test(file?.type)) {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = function (evt) {
                if (evt.target?.result) {
                    const purifiedSVG = DOMPurify.sanitize(evt.target?.result?.toString());
                    const blob = new Blob([purifiedSVG], { type: file.type });
                    const convertedfile = new File([blob], file?.name, { type: file.type });
                    setCompanyLogo(convertedfile);
                }
            };
        } else {
            setCompanyLogo(file);
        }
    };

    const handleFileChange = (files: File[]) => {
            sanitizeFile(files?.[0]);
        },
        onCloseModal = useCallback(() => setModalOpen(false), []),
        onOpenModal = useCallback(() => setModalOpen(true), []),
        handleSaveClick = () => {
            addCompanyInfo({
                id: organisationId,
                data: {
                    organisationLogo: companyLogo,
                    organisationName: companyName,
                    contactNo: contactNumber,
                    timeZone
                }
            });
        },
        handleCompanyNameChange = (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setErrors(prev => ({ ...prev, companyName: performValidation('companyName', value) }));
            setCompanyName(value);
        },
        handleCompanyNumberChange = (contact: string) => {
            setErrors(prev => ({ ...prev, contactNumber: performValidation('contactNo', contact) }));
            setContactNumber(`+${contact}`);
        },
        handleRemoveLogo = () => {
            removeCompanyLogo(organisationId);
        };

    const hasEditPermission = useMemo(
            () => modulePermission?.find(module => module.moduleName === 'Company Information')?.edit || false,
            [modulePermission]
        ),
        disableSaveButton = !dataChanged || errors.companyName !== '' || errors.contactNumber !== '';

    const allTimeZones = useMemo(() => timeZones.map(({ label, tzCode }) => ({ value: tzCode, label })), []);

    useEffect(() => {
        if (!isLoading && data) {
            const { name: receivedCompanyName, contactNo, timeZone } = data;
            setCompanyName(receivedCompanyName);
            setContactNumber(contactNo);
            setTimeZone(timeZone);
        }
    }, [isLoading, data]);

    useEffect(() => {
        const errorObj = removeLogoError as ImportErrorType;
        if (removeLogoSuccess) {
            setModalOpen(false);
            setIsLogoRemoved(true);
            addToast({
                variant: 'success',
                header: `Logo removed successfully.`,
                timer: 3000
            });
        } else if (errorObj && typeof errorObj === 'object' && errorObj.data) {
            setModalOpen(false);
            addToast({
                variant: 'error',
                header: (errorObj.data as any).errorMessage || 'Something went wrong.',
                timer: 3000
            });
        }
    }, [removeLogoError, removeLogoSuccess]);

    useEffect(() => {
        const errorObj = error as ImportErrorType;
        if (errorObj && typeof errorObj === 'object' && errorObj.data) {
            setCompanyLogo('');
            addToast({
                variant: 'error',
                header: (errorObj.data as any).errorMessage || 'Unable to upload file due to error.',
                timer: 7000
            });
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            setCompanyLogo('');
            addToast({
                variant: 'success',
                header: `Company information updated successfully`,
                timer: 3000
            });
        }
    }, [isSuccess]);

    return {
        isLogoRemoved,
        data,
        isLoading,
        companyName,
        contactNumber,
        handleFileChange,
        handleSaveClick,
        addCompanyInfoLoading,
        companyLogo,
        hasEditPermission,
        organisationId,
        handleCompanyNameChange,
        userRoleName: roleName,
        handleCompanyNumberChange,
        errors,
        disableSaveButton,
        logoUploadError,
        isModalOpen,
        setModalOpen,
        handleRemoveLogo,
        removeLogoLoading,
        companyLogoImg,
        logoStatus,
        onCloseModal,
        onOpenModal,
        timeZone,
        allTimeZones,
        setTimeZone
    };
};
