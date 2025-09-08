import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { usePostDepartmentMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import { useLottie } from 'lottie-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addDepartmentAnimation from '../../constants/images/animations/addDepartmentAnimation.json';
import { Department } from './types';

export const useFirstDepartment = () => {
    const userDetails = useAppSelector(state => state.user);
    const [addDepartment, setAddDepartment] = useState(false);
    const [inputFields, setInputFields] = useState<Department[]>([
        {
            departmentName: '',
            departmentStatus: true,
            departmentRefId: new Date().getTime(),
            error: '',
            organisationId: userDetails.organisationId
        }
    ]);
    const [modalState, setModalState] = useState(false);

    const [addFirstDepartment, { isSuccess: isAddSuccess, data: responseData, isLoading: isAddDepartmentLoading }] =
        usePostDepartmentMutation();

    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: addDepartmentAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const { View } = useLottie(defaultOptions);

    const handleAddDepartment = () => {
        setAddDepartment(true);
    };

    const buttonDisabled = useMemo(() => {
        let disabled = false;
        inputFields.forEach((element: Department) => {
            if ((element.error && element.error.length > 0) || element.departmentName.length < 1) {
                disabled = true;
            }
        });
        return disabled;
    }, [inputFields]);

    const handleInputChange = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
        e.preventDefault();
        const { name, value } = e.currentTarget;

        const newArray = inputFields.map((department: Department) => {
            if (department.departmentRefId === id) {
                const existingDepartmentName = inputFields.find(
                    (field: Department) => field.departmentRefId !== id && field.departmentName === value
                );
                const err = performValidation(name, value);
                return {
                    ...department,
                    departmentName: value,
                    error: existingDepartmentName ? 'Department name already entered' : err ? err : ''
                };
            } else return department;
        });
        setInputFields(newArray);
    };

    const handleAddAnotherDepartment = () => {
        setInputFields([
            ...inputFields,
            {
                departmentName: '',
                departmentStatus: true,
                departmentRefId: new Date().getTime(),
                error: '',
                organisationId: userDetails.organisationId
            }
        ]);
    };

    const handleRemoveField = (removeId: number) => {
        const newInputFields = inputFields.filter(({ departmentRefId }: Department) => {
            return departmentRefId !== removeId;
        });
        setInputFields(newInputFields);
    };

    useEffect(() => {
        if (inputFields.length === 0) {
            setAddDepartment(false);
            setInputFields([
                {
                    departmentName: '',
                    departmentStatus: true,
                    departmentRefId: new Date().getTime(),
                    error: '',
                    organisationId: userDetails.organisationId
                }
            ]);
        }
    }, [inputFields.length, userDetails.organisationId]);

    const handleSave = () => {
        addFirstDepartment({ actionBy: userDetails.id, ipAddress: '216.24.57.253:443', departments: inputFields });
    };

    const handleToggleClick = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
        const newArray = inputFields.map((department: Department) => {
            if (department.departmentRefId === id) {
                return {
                    ...department,
                    departmentStatus: e.currentTarget.checked
                };
            } else return department;
        });
        setInputFields(newArray);
    };

    const handleSkip = useCallback(() => {
        navigate(routeConstants.firstTeam);
    }, [navigate]);

    const openCloseModal = () => {
        if (inputFields && inputFields[0] && inputFields[0].departmentName.length > 0) {
            setModalState(!modalState);
        } else setInputFields([]);
    };

    const handleCancelYes = () => {
        setInputFields([]);
        openCloseModal();
    };

    const handleCancelNo = () => {
        openCloseModal();
    };

    useEffect(() => {
        if (responseData) {
            if (responseData.existingDepartment) {
                setInputFields((prevFields: Department[]) =>
                    prevFields.map((field: Department) => ({
                        ...field,
                        error: responseData.existingDepartment.includes(field.departmentName)
                            ? `Department ${field.departmentName} already exists`
                            : field.error
                    }))
                );
            }
            if (responseData.addedDepartment) {
                addToast({
                    variant: 'success',
                    header: `Department ${responseData.addedDepartment} added successfully`,
                    timer: 3000
                });
                setInputFields((prevFields: Department[]) =>
                    prevFields.filter((field: Department) => !responseData.addedDepartment.includes(field.departmentName))
                );
                isAddSuccess && !responseData.existingDepartment && handleSkip();
            }
        }
    }, [handleSkip, isAddSuccess, responseData]);

    return {
        userDetails,
        inputFields,
        addDepartment,
        View,
        handleAddAnotherDepartment,
        handleAddDepartment,
        handleCancelNo,
        handleCancelYes,
        handleInputChange,
        handleRemoveField,
        handleToggleClick,
        openCloseModal,
        handleSkip,
        modalState,
        handleSave,
        isAddDepartmentLoading,
        buttonDisabled
    };
};
