import { ErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import {
    useAddCompanyDataMutation,
    useGetDefaultDepartmentsQuery,
    useGetDefaultTeamsQuery,
    useGetDefaultDesignationsQuery
} from '@slice/services';
import { performValidation } from '@utils/validations';
import { Buffer } from 'buffer';
import { parsePhoneNumber } from 'libphonenumber-js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OptionType } from './types';

export const useCompanyInfo = () => {
    const path = useLocation().search;
    const userEmail = Buffer.from(path, 'base64').toString('ascii');
    const [addCompanyInfo, { error, isSuccess, isLoading }] = useAddCompanyDataMutation();
    const navigateTo = useNavigate();
    const { email } = (useLocation().state || {}) as any;

    const [data, setData] = useState({
        contactNumber: '',
        companyName: '',
        companySize: '',
        errors: {
            contactNumber: '',
            companyName: '',
            companySize: ''
        }
    });

    // Selected dropdown values
    const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
    const [selectedDesignation, setSelectedDesignation] = useState<number | null>(null);

    // Queries
    const { data: departmentData = [] } = useGetDefaultDepartmentsQuery();

    const { data: teamData = [], isFetching: isTeamLoading } = useGetDefaultTeamsQuery(selectedDepartment, {
        skip: !selectedDepartment
    });

    const { data: designationData = [], isFetching: isDesignationLoading } = useGetDefaultDesignationsQuery(selectedTeam, {
        skip: !selectedTeam
    });

    // Dropdown Options
    const departmentOptions = useMemo(() => {
        return departmentData.map((dept: { departmentId: number; departmentName: string }) => ({
            value: dept.departmentId,
            label: dept.departmentName
        }));
    }, [departmentData]);

    const teamOptions = useMemo(() => {
        return (
            teamData?.map((team: { teamId: number; teamName: string }) => ({
                value: team.teamId,
                label: team.teamName
            })) || []
        );
    }, [teamData]);

    const designationOptions = useMemo(() => {
        return (
            designationData?.map((des: { designationId: number; designationName: string }) => ({
                value: des.designationId,
                label: des.designationName
            })) || []
        );
    }, [designationData]);

    // Input Handlers
    const handleTextField = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const { name, value } = e.target as HTMLInputElement;
            const err = data.errors;

            switch (name) {
                case 'companySize':
                    err.companySize = performValidation('companySize', value);
                    break;
                case 'companyName':
                    err.companyName = performValidation('companyName', value);
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

    const handlePhoneNumber = (value: string) => {
        const err = data.errors;
        err.contactNumber = performValidation('contactNo', value);
        setData({ ...data, contactNumber: value });
    };

    const validateData = useCallback(() => {
        let valid = true;
        Object.values(data.errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    }, [data.errors]);

    // Dropdown Handlers
    const handleDepartmentChange = (option: number) => {
        setSelectedDepartment(option);
        setSelectedTeam(null);
        setSelectedDesignation(null);
    };

    const handleTeamChange = (option: number) => {
        setSelectedTeam(option);
        setSelectedDesignation(null);
    };

    const handleDesignationChange = (option: number) => {
        setSelectedDesignation(option);
    };

    const handelSubmit = () => {
        const err = data.errors;
        err.contactNumber = performValidation('contactNo', data.contactNumber);
        err.companySize = performValidation('companySize', data.companySize);
        err.companyName = performValidation('companyName', data.companyName);

        setData({
            ...data,
            errors: err
        });

        if (validateData()) {
            const contactNoWithCode = parsePhoneNumber(`+${Number(data.contactNumber)}`).format('E.164');

            const departmentName = departmentOptions.find((opt: OptionType) => opt.value === selectedDepartment)?.label || '';
            const teamName = teamOptions.find((opt: OptionType) => opt.value === selectedTeam)?.label || '';
            const designationName = designationOptions.find((opt: OptionType) => opt.value === selectedDesignation)?.label || '';

            addCompanyInfo({
                organisationSize: data.companySize,
                contactNo: contactNoWithCode,
                organisationName: data.companyName,
                userEmailId: email ?? userEmail,
                departmentName,
                teamName,
                designationName
            });
        }
    };

    const isDisabled = useMemo(() => {
        return !(
            data.contactNumber &&
            data.companySize &&
            data.companyName &&
            selectedDepartment &&
            selectedTeam &&
            selectedDesignation &&
            validateData()
        );
    }, [data, selectedDepartment, selectedTeam, selectedDesignation, validateData]);

    useEffect(() => {
        if (isSuccess) {
            addToast({
                variant: 'success',
                header: 'Organisation details submitted successfully',
                timer: 5000
            });
            navigateTo(routeConstants.orgAdminVerification, {
                state: { email: email ?? userEmail }
            });
        }
    }, [isSuccess, navigateTo, email, userEmail]);

    useEffect(() => {
        if (error || (error && (error as any)?.status === 404)) {
            const addError = error as ErrorType;
            addToast({
                variant: 'error',
                header: addError.data.errorMessage || 'Something went wrong.',
                timer: 3000
            });
        }
    }, [error]);

    return {
        handelSubmit,
        isLoading,
        handleTextField,
        data,
        handlePhoneNumber,
        isDisabled,
        departmentOptions,
        teamOptions,
        designationOptions,
        selectedDepartment,
        selectedTeam,
        selectedDesignation,
        handleDepartmentChange,
        handleTeamChange,
        handleDesignationChange,
        isTeamLoading,
        isDesignationLoading
    };
};
