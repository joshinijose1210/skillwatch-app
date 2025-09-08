import { ErrorType } from '@common';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import {
    useAddDomainRequestMutation,
    useGetDomainListQuery,
    useGetReviewTimelineQuery,
    useGetSettingListQuery,
    useUpdateSettingRequestMutation
} from '@slice/services';
import { performValidation } from '@utils/validations';
import { useEffect, useMemo, useState } from 'react';
import { DomainData, SettingStatus } from './types';

export const useSettings = () => {
    const userDetails = useAppSelector(({ user }) => user);

    const [isModalOpen, setModalOpen] = useState(false),
        [actionFrom, setActionFrom] = useState(''),
        [deleteId, setDeleteId] = useState(0),
        [isManagerReviewStart, setManagerReviewStart] = useState(false),
        [existDomain, setExistDomain] = useState<DomainData[]>(),
        [inputFields, setInputFields] = useState<DomainData[]>([]),
        [settingStatus, setSettingStatus] = useState<SettingStatus>({
            isManagerReviewMandatory: false,
            isAnonymousSuggestionAllowed: false,
            isBiWeeklyFeedbackReminderEnabled: true
        });

    const { modulePermission } = useAppSelector(({ user }) => user);
    const { data, isLoading } = useGetDomainListQuery(
            {
                path: '',
                params: [{ name: 'id', value: userDetails.organisationId }]
            },
            { refetchOnMountOrArgChange: true }
        ),
        { data: settingData, isLoading: settingLading } = useGetSettingListQuery(
            {
                path: '',
                params: [{ name: 'organisationId', value: userDetails.organisationId }]
            },
            { refetchOnMountOrArgChange: true }
        ),
        { data: timelineData } = useGetReviewTimelineQuery(
            {
                path: '',
                params: [
                    { name: 'organisationId', value: userDetails.organisationId },
                    { name: 'reviewToId', value: userDetails.id }
                ]
            },
            { refetchOnMountOrArgChange: true }
        ),
        [addDomainRequest, { isLoading: addNewDomainLoading, error: addNewDomainError, isSuccess: addNewDomainSuccess }] =
            useAddDomainRequestMutation(),
        [updateSettingRequest, { isLoading: updateSettingLoading, error: updateSettingError, isSuccess: updateSettingSuccess }] =
            useUpdateSettingRequestMutation();

    const handleAddAnotherDomain = () => {
            setInputFields([...inputFields, { name: '@', id: new Date().getTime(), organisationId: userDetails.organisationId }]);
        },
        handleRemoveField = (removeId: number, domainType?: string) => {
            const newInputFields = inputFields.filter(({ id }: DomainData) => {
                return id !== removeId;
            });
            const newExistDomain = existDomain?.filter(({ id }: DomainData) => {
                return id !== removeId;
            });

            setInputFields(newInputFields);
            setActionFrom('delete');
            if (domainType === 'existDomain') {
                addDomainRequest({
                    organisationId: userDetails.organisationId,
                    domains: newExistDomain
                });
            }
        };

    const compareObjects = (dataToSend: any, settingData: any) => JSON.stringify(dataToSend) === JSON.stringify(settingData);

    const handleSubmit = () => {
        const updatedData = inputFields.concat(existDomain || []);
        const dataToSend = {
            organisationId: userDetails.organisationId,
            ...settingStatus
        };
        if (!compareObjects(dataToSend, settingData)) {
            updateSettingRequest(dataToSend);
        }
        if (!compareObjects(data, updatedData)) {
            setActionFrom('add');
            addDomainRequest({
                organisationId: userDetails.organisationId,
                domains: updatedData
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
            e.preventDefault();
            const inputValue = e.target.value.startsWith('@') ? e.target.value : `@${e.target.value}`;
            const updateData = inputFields.concat(existDomain || []);
            const newArray = inputFields.map((domain: DomainData) => {
                if (domain.id === id) {
                    const existingName = inputFields.find(
                        (field: DomainData) => field.id !== id && String(field.name).toLowerCase() === String(inputValue).toLowerCase()
                    );
                    const existingDomainName = updateData.find(
                        (field: DomainData) => field.id !== id && String(field.name).toLowerCase() === String(inputValue).toLowerCase()
                    );
                    const err = inputValue === '@' ? '' : performValidation('domainName', inputValue);
                    return {
                        ...domain,
                        name: inputValue,
                        error: existingName || existingDomainName ? 'Domain name already exist' : err ? err : ''
                    };
                } else return domain;
            });
            setInputFields(newArray);
        },
        handleDisableDomain = (id: number) => {
            setModalOpen(true), setDeleteId(id);
        },
        handleToggleClick = (settingType: keyof SettingStatus) => {
            setSettingStatus(prevState => ({
                ...prevState,
                [settingType]: !prevState[settingType]
            }));
        };

    const buttonDisabled = useMemo(() => {
        let disabled = false;
        {
            inputFields.length > 0 &&
                inputFields.forEach((element: DomainData) => {
                    if ((element.error && element.error.length > 0) || element.name.length < 1 || element.name === '@') {
                        disabled = true;
                    }
                });
        }
        const dataToSend = {
            organisationId: userDetails.organisationId,
            ...settingStatus
        };

        if (inputFields.length === 0 && compareObjects(dataToSend, settingData)) {
            disabled = true;
        }
        return disabled;
    }, [inputFields, settingData, settingStatus, userDetails.organisationId]);

    const hasEditPermission = useMemo(
        () => modulePermission?.find(module => module.moduleName === 'Settings')?.edit || false,
        [modulePermission]
    );

    useEffect(() => {
        if (data) {
            setExistDomain(data);
        }
    }, [data]);

    useEffect(() => {
        if (settingData) {
            setSettingStatus(settingData);
        }
    }, [settingData]);

    useEffect(() => {
        if (timelineData?.[0] && Object.keys(timelineData[0]).length) {
            if (
                new Date(timelineData[0].managerReviewStartDate) < new Date() &&
                new Date(timelineData[0].managerReviewEndDate + 86400000) > new Date()
            ) {
                setManagerReviewStart(true);
            }
        } else {
            setManagerReviewStart(false);
        }
    }, [data, timelineData]);

    useEffect(() => {
        if (addNewDomainSuccess) {
            addToast({
                variant: 'success',
                header: `Allowed Domain list updated successfully`,
                timer: 3000
            });
            setModalOpen(false);
            setInputFields([]);
        }
        if (addNewDomainError && typeof addNewDomainError === 'object') {
            const errorObj = addNewDomainError as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.errorMessage || 'Unable to update allowed domains list.',
                timer: 3000
            });
            setModalOpen(false);
        }
    }, [addNewDomainSuccess, addNewDomainError]);

    useEffect(() => {
        if (updateSettingSuccess) {
            addToast({
                variant: 'success',
                header: `Settings updated successfully`,
                timer: 3000
            });
            setModalOpen(false);
            setInputFields([]);
        }
        if (updateSettingError && typeof updateSettingError === 'object') {
            const errorObj = updateSettingError as ErrorType;
            addToast({
                variant: 'error',
                header: errorObj.data.errorMessage || 'Unable to update settings.',
                timer: 3000
            });
            setModalOpen(false);
        }
    }, [updateSettingSuccess, updateSettingError]);

    return {
        inputFields,
        setDeleteId,
        deleteId,
        isModalOpen,
        setModalOpen,
        isLoading,
        actionFrom,
        addNewDomainLoading,
        existDomain,
        handleInputChange,
        handleAddAnotherDomain,
        handleRemoveField,
        buttonDisabled,
        hasEditPermission,
        handleDisableDomain,
        handleToggleClick,
        settingStatus,
        handleSubmit,
        settingLading,
        updateSettingLoading,
        isManagerReviewStart
    };
};
