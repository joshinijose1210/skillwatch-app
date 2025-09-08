import { Department } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { Option } from '@medly-components/core/dist/es/components/MultiSelect/types';
import { useAppSelector } from '@slice';
import { useGetDepartmentQuery, usePostTeamMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import { useLottie } from 'lottie-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addTeamAnimation from '../../constants/images/animations/addTeamAnimation.json';
import { InputField } from './types';

export const useFirstTeam = () => {
    const userDetails = useAppSelector(state => state.user);
    const [addTeam, setAddTeam] = useState(false);
    const [inputFields, setInputFields] = useState<InputField[]>([
        {
            teamName: '',
            teamStatus: true,
            departmentRefId: new Date().getTime(),
            teamRefId: new Date().getTime(),
            error: '',
            organisationId: userDetails.organisationId,
            departmentId: -1
        }
    ]);
    const [modalState, setModalState] = useState(false);
    const [addFirstTeam, { isSuccess: isAddSuccess, data: responseData, isLoading: isAddTeamLoading }] = usePostTeamMutation();

    const { data: department, isSuccess: isDepartmentReceived } = useGetDepartmentQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'limit', value: 10 }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const departmentList = useMemo(
        () =>
            isDepartmentReceived
                ? department?.departments
                      .filter((department: Department) => department.departmentStatus === true)
                      .map((department: Department) => {
                          return { value: department.id, label: department.departmentName };
                      })
                      .sort((a: Option, b: Option) => a.label.localeCompare(b.label))
                : [],
        [isDepartmentReceived, department?.departments]
    );

    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: addTeamAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const { View } = useLottie(defaultOptions);

    const handleAddTeam = () => {
        setAddTeam(true);
    };

    const buttonDisabled = useMemo(() => {
        let disabled = false;
        inputFields.forEach((element: InputField) => {
            if ((element.error && element.error.length > 0) || element.teamName.length < 1) {
                disabled = true;
            }
        });
        return disabled;
    }, [inputFields]);

    const handleInputChange = (e: React.MouseEvent<HTMLInputElement>, id: number, departmentId: number) => {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        const newArray = inputFields.map((team: InputField) => {
            if (team.teamRefId === id) {
                const existingTeamName = inputFields.find(
                    (field: InputField) => field.teamRefId !== id && field.teamName === value && field.departmentId === departmentId
                );
                const err = performValidation(name, value);

                return {
                    ...team,
                    teamName: value,
                    error: existingTeamName ? 'Team name already entered for the department' : err ? err : ''
                };
            } else return team;
        });
        setInputFields(newArray);
    };

    const handleDropdownChange = (departmentId: number, id: number, team: string) => {
        const newArray = inputFields.map((department: InputField) => {
            if (department.departmentRefId === id) {
                const existingDepartmentName = inputFields.find(
                    (field: InputField) => field.teamRefId !== id && field.teamName === team && field.departmentId === departmentId
                );

                return {
                    ...department,
                    departmentId,
                    error: existingDepartmentName ? 'Team name already entered for the Department.' : ''
                };
            } else return department;
        });
        setInputFields(newArray);
    };

    const handleAddAnotherTeam = () => {
        setInputFields([
            ...inputFields,
            {
                teamName: '',
                teamStatus: true,
                teamRefId: new Date().getTime(),
                departmentRefId: new Date().getTime(),
                error: '',
                organisationId: userDetails.organisationId,
                departmentId: -1
            }
        ]);
    };

    const handleRemoveField = (removeId: number) => {
        const newInputFields = inputFields.filter(({ teamRefId }: InputField) => {
            return teamRefId !== removeId;
        });
        setInputFields(newInputFields);
    };

    useEffect(() => {
        if (inputFields.length === 0) {
            setAddTeam(false);
            setInputFields([
                {
                    teamName: '',
                    teamStatus: true,
                    departmentRefId: new Date().getTime(),
                    teamRefId: new Date().getTime(),
                    error: '',
                    organisationId: userDetails.organisationId,
                    departmentId: -1
                }
            ]);
        }
    }, [inputFields.length, userDetails.organisationId]);

    const handleSave = () => {
        addFirstTeam({ actionBy: userDetails.id, ipAddress: '216.24.57.253:443', teams: inputFields });
    };

    const handleToggleClick = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
        const newArray = inputFields.map((team: InputField) => {
            if (team.teamRefId === id) {
                return {
                    ...team,
                    teamStatus: e.currentTarget.checked
                };
            } else return team;
        });
        setInputFields(newArray);
    };

    const handleSkip = useCallback(() => {
        navigate(routeConstants.firstDesignation);
    }, [navigate]);

    const handleGoBack = () => {
        navigate(routeConstants.firstDepartment);
    };

    const openCloseModal = () => {
        if (inputFields && inputFields[0] && inputFields[0].teamName.length > 0) {
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
            if (responseData.existingTeam) {
                setInputFields((prevFields: any) =>
                    prevFields.map((field: any) => ({
                        ...field,
                        error: responseData.existingTeam.includes(field.teamName) ? `Team ${field.teamName} already exists` : field.error
                    }))
                );
            }
            if (responseData.addedTeam) {
                addToast({
                    variant: 'success',
                    header: `Team ${responseData.addedTeam} added successfully`,
                    timer: 3000
                });
                setInputFields((prevFields: any) => prevFields.filter((field: any) => !responseData.addedTeam.includes(field.teamName)));
                isAddSuccess && !responseData.existingTeam && handleSkip();
            }
        }
    }, [handleSkip, isAddSuccess, responseData]);

    return {
        userDetails,
        inputFields,
        addTeam,
        View,
        handleAddAnotherTeam,
        handleAddTeam,
        handleCancelNo,
        handleCancelYes,
        handleInputChange,
        handleRemoveField,
        handleToggleClick,
        openCloseModal,
        handleSkip,
        modalState,
        handleSave,
        isAddTeamLoading,
        buttonDisabled,
        departmentList,
        handleDropdownChange,
        handleGoBack
    };
};
