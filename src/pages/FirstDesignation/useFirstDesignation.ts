import { Department, ITeam } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { Option } from '@medly-components/core/dist/es/components/MultiSelect/types';
import { useAppSelector } from '@slice';
import { useGetDepartmentQuery, useGetTeamsDataMutation, usePostDesignationMutation } from '@slice/services';
import { performValidation } from '@utils/validations';
import { useLottie } from 'lottie-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addDesignationAnimation from '../../constants/images/animations/addDesignationAnimation.json';
import { InputField, InputFieldsState, TeamsLabelData } from './types';

export const useFirstDesignation = () => {
    const userDetails = useAppSelector(state => state.user);
    const [addDesignation, setAddDesignation] = useState(false);
    const [inputFields, setInputFields] = useState<InputFieldsState>([
        {
            teamsList: [],
            designationName: '',
            status: true,
            designationRefId: new Date().getTime(),
            error: '',
            teamError: '',
            teamRefId: new Date().getTime(),
            teamId: 0,
            departmentId: 0,
            organisationId: userDetails.organisationId
        }
    ]);

    const [modalState, setModalState] = useState(false);
    const [addFirstDesignation, { isSuccess: isAddSuccess, data: responseData, isLoading: isAddDesignationLoading }] =
        usePostDesignationMutation();

    const [getTeamsData] = useGetTeamsDataMutation();

    const navigate = useNavigate();
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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: addDesignationAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const { View } = useLottie(defaultOptions);
    const handleAddDesignation = () => {
        setAddDesignation(true);
    };
    const buttonDisabled = useMemo(() => {
        return inputFields.some(input => !(input.teamId && input.departmentId && input.designationName) || input.error || input.teamError);
    }, [inputFields]);

    const handleDesignationChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, teamId: number) => {
        e.preventDefault();
        const { name, value } = e.target;
        const newArray = inputFields.map((designation: InputField) => {
            if (designation.designationRefId === id) {
                const existingDesignationName = inputFields.find(
                    (field: InputField) => field.designationRefId !== id && field.designationName === value && field.teamId === teamId
                );
                const err = performValidation(name, value);

                return {
                    ...designation,
                    designationName: value,
                    error: existingDesignationName ? 'Designation name already entered for the team.' : err ? err : ''
                };
            } else return designation;
        });
        setInputFields(newArray);
    };
    const handleDropdownChange = (teamId: number, id: number, designation: string) => {
        const newArray = inputFields.map((team: InputField) => {
            if (team.teamRefId === id) {
                const existingDesignationName = inputFields.find(
                    (field: InputField) => field.designationRefId !== id && field.designationName === designation && field.teamId === teamId
                );
                return {
                    ...team,
                    teamId,
                    error: existingDesignationName ? 'Designation name already entered for the team.' : ''
                };
            } else return team;
        });
        setInputFields(newArray);
    };

    const handleDepartmentChange = (value: number, id: number) => {
        getTeamsData({
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'departmentId', value }
            ]
        })
            .then((teamsData: any) => {
                const newData = inputFields.map((team: InputField) => {
                    if (team.designationRefId === id) {
                        const teamsList =
                            teamsData.data.teams && teamsData.data.teams.length > 0
                                ? teamsData.data.teams
                                      .filter((team: ITeam) => team.teamStatus === true)
                                      .map((team: ITeam) => {
                                          return { value: team.id, label: team.teamName };
                                      })
                                      .sort((a: TeamsLabelData, b: TeamsLabelData) => a.label.localeCompare(b.label))
                                : [];
                        return {
                            ...team,
                            departmentId: value,
                            teamsList,
                            teamId: (teamsData.data && teamsData.data.totalTeams === 0) || teamsList.length ? 0 : team.teamId,
                            teamError:
                                teamsData.data && teamsData.data.totalTeams === 0
                                    ? 'Selected department has no active team.'
                                    : teamsList.length
                                    ? ''
                                    : 'This department team is not linked with any department.',
                            designationError: ''
                        };
                    } else return team;
                });
                setInputFields(newData);
                return newData;
            })
            .catch((err: any) => console.log(err));
    };
    const handleAddAnotherDesignation = () => {
        setInputFields([
            ...inputFields,
            {
                teamsList: [],
                designationName: '',
                status: true,
                designationRefId: new Date().getTime(),
                error: '',
                teamRefId: new Date().getTime(),
                teamId: 0,
                teamError: '',
                organisationId: userDetails.organisationId,
                departmentId: 0
            }
        ]);
    };

    const handleRemoveField = (removeId: number) => {
        const newInputFields = inputFields.filter((field: InputField) => {
            return field.designationRefId !== removeId;
        });
        setInputFields(newInputFields);
    };

    const handleToggleClick = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
        const newArray = inputFields.map((designation: InputField) => {
            if (designation.designationRefId === id) {
                return {
                    ...designation,
                    status: e.currentTarget.checked
                };
            } else return designation;
        });
        setInputFields(newArray);
    };

    const handleSkip = useCallback(() => {
        navigate(routeConstants.firstRole);
    }, [navigate]);

    const handleGoBack = () => {
        navigate(routeConstants.firstTeam);
    };

    const openCloseModal = () => {
        if (inputFields && inputFields[0] && inputFields[0].designationName.length > 0) {
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

    const handleSave = () => {
        const updateInputFields = inputFields.map(({ teamsList, ...rest }) => rest);
        addFirstDesignation({ actionBy: userDetails.id, ipAddress: '216.24.57.253:443', designations: updateInputFields });
    };

    useEffect(() => {
        if (responseData) {
            if (responseData.existingDesignation) {
                setInputFields((prevFields: InputFieldsState) =>
                    prevFields.map((field: InputField) => ({
                        ...field,
                        error: responseData.existingDesignation.includes(field.designationName)
                            ? `Designation ${field.designationName} already exists`
                            : field.error
                    }))
                );
            }
            if (responseData.addedDesignation) {
                addToast({
                    variant: 'success',
                    header: `Designation ${responseData.addedDesignation} added successfully` || 'Something went wrong.',
                    timer: 3000
                });
                setInputFields((prevFields: InputFieldsState) =>
                    prevFields.filter((field: InputField) => !responseData.addedDesignation.includes(field.designationName))
                );
                isAddSuccess && !responseData.existingDesignation && handleSkip();
            }
        }
    }, [handleSkip, isAddSuccess, responseData]);

    useEffect(() => {
        if (inputFields.length === 0) {
            setAddDesignation(false);
            setInputFields([
                {
                    teamsList: [],
                    designationName: '',
                    status: true,
                    designationRefId: new Date().getTime(),
                    error: '',
                    teamId: 0,
                    departmentId: 0,
                    teamError: '',
                    teamRefId: new Date().getTime(),
                    organisationId: userDetails.organisationId
                }
            ]);
        }
    }, [inputFields.length, userDetails.organisationId]);

    return {
        userDetails,
        View,
        inputFields,
        addDesignation,
        handleAddAnotherDesignation,
        handleAddDesignation,
        handleCancelNo,
        handleCancelYes,
        handleGoBack,
        handleDesignationChange,
        handleToggleClick,
        handleRemoveField,
        modalState,
        handleSkip,
        openCloseModal,
        isAddDesignationLoading,
        handleSave,
        buttonDisabled,
        handleDropdownChange,
        departmentList,
        handleDepartmentChange
    };
};
