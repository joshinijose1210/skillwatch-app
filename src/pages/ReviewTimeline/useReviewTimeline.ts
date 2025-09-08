import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { useGetReviewTimelineQuery } from '@slice/services';
import { sliceAndCapitalize } from '@utils/sliceAndCapitalize';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { To, useNavigate } from 'react-router-dom';
import { ItemStatus, ItemStatusType, ReviewBaseState } from './types';

export const useReviewTimeline = () => {
    const navigateTo = useNavigate();
    const userDetails = useAppSelector(state => state.user);
    const { modulePermission } = useAppSelector(state => state.user);
    const [isManagerReviewIncomplete, setIsManagerReviewIncomplete] = useState(false);
    const [isCheckInWithManagerIncomplete, setIsCheckInWithManagerIncomplete] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [itemStatus, setItemStatus] = useState<ItemStatusType>({
        startCycle: 'disabled',
        selfReview: 'disabled',
        managerReview: 'disabled',
        checkInWithManager: 'disabled',
        endCycle: 'disabled'
    });
    const { data, isLoading } = useGetReviewTimelineQuery(
        {
            path: '',
            params: [
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'reviewToId', value: userDetails.id }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    // const selfReviewModule = modulePermission?.find(module => module.moduleName === 'Self Review');
    const managerReviewModule = modulePermission?.find(module => module.moduleName === 'Reviews for Team Members');
    const checkInReviewModule = modulePermission?.find(module => module.moduleName === 'Check-in with Team Members');

    useEffect(() => {
        if (data && data[0] && Object.keys(data[0]).length > 0) {
            // set initial status values common for all type of users
            setItemStatus(prev => ({
                ...prev,
                startCycle: data[0].isReviewCycleActive ? 'ongoing' : data[0].publish ? 'scheduled' : 'complete',
                selfReview:
                    !data[0].isSelfReviewActive && !data[0].selfReviewPublish
                        ? 'disabled'
                        : data[0].isSelfReviewActive && !data[0].selfReviewDraft && !data[0].selfReviewPublish
                        ? 'active'
                        : data[0].isSelfReviewActive && data[0].selfReviewDraft && !data[0].selfReviewPublish
                        ? 'ongoing'
                        : 'complete',
                endCycle: new Date(data[0].endDate + 86400000) > new Date() ? 'disabled' : 'complete'
            }));
            // For managers
            if (data[0].empDetails && data[0].empDetails.length > 0) {
                const managerReviewEmp: { [k: string]: ItemStatus } = {};
                const checkInWithManagerEmp: { [k: string]: ItemStatus } = {};
                let managerReviewDraft = false,
                    managerReviewPublish = true,
                    checkInDraft = false,
                    checkInPublish = true;
                const updatedEmployees = data[0].empDetails.map((emp: any) => {
                    // first, identify whether user is employee's first manager or second,
                    // and then draft and publish values are to be used.
                    let empReviewDraft = false,
                        empReviewPublish = false,
                        isOptional = false;
                    if (userDetails.id === emp.firstManagerId) {
                        empReviewDraft = emp.firstManagerReviewDraft;
                        empReviewPublish = emp.firstManagerReviewPublish;
                    } else {
                        isOptional = true;
                        empReviewDraft = emp.secondManagerReviewDraft;
                        empReviewPublish = emp.secondManagerReviewPublish;
                    }
                    //this will check if at least one employee's review is in draft or publish
                    /**
                     * false false -
                     * false true
                     * true false -
                     * true true
                     */
                    if ((empReviewDraft && !empReviewPublish) || (!empReviewDraft && empReviewPublish)) {
                        managerReviewDraft = true;
                    }
                    // publish is initially set to true and will set to false if anyone's review is in pending
                    if (!empReviewPublish) {
                        managerReviewPublish = false;
                    }
                    if (
                        (emp.checkInWithManagerDraft && !emp.checkInWithManagerPublish) ||
                        (!emp.checkInWithManagerDraft && emp.checkInWithManagerPublish)
                    ) {
                        checkInDraft = true;
                    }
                    if (!emp.checkInWithManagerPublish) {
                        checkInPublish = false;
                    }
                    managerReviewEmp[emp.id] =
                        (data[0].isManagerReviewDatePassed && !managerReviewPublish) ||
                        (!data[0].isManagerReviewActive &&
                            ((!empReviewDraft && !empReviewPublish) || (empReviewDraft && !empReviewPublish))) ||
                        !managerReviewModule ||
                        (managerReviewModule && !managerReviewModule.edit && !managerReviewModule.view)
                            ? 'disabled'
                            : !empReviewDraft && !empReviewPublish
                            ? 'active'
                            : empReviewDraft && !empReviewPublish
                            ? 'ongoing'
                            : 'complete';
                    checkInWithManagerEmp[emp.id] =
                        !data[0].isCheckInWithManagerActive ||
                        (!data[0].isCheckInWithManagerActive &&
                            ((!emp.checkInWithManagerDraft && !emp.checkInWithManagerPublish) ||
                                (emp.checkInWithManagerDraft && !emp.checkInWithManagerPublish))) ||
                        !checkInReviewModule ||
                        (checkInReviewModule && !checkInReviewModule.edit && !checkInReviewModule.view)
                            ? 'disabled'
                            : !emp.checkInWithManagerDraft && !emp.checkInWithManagerPublish
                            ? 'active'
                            : emp.checkInWithManagerDraft && !emp.checkInWithManagerPublish
                            ? 'ongoing'
                            : 'complete';
                    const updatedEmp = {
                        ...emp,
                        managerState: managerReviewEmp[emp.id],
                        checkInState: checkInWithManagerEmp[emp.id],
                        managerLinkText: `${sliceAndCapitalize(emp.firstName)} ${sliceAndCapitalize(emp.lastName)} (${emp.employeeId}) ${
                            empReviewDraft ? '- In Draft' : empReviewPublish ? '- Completed' : '- Pending'
                        }${isOptional ? ' (Optional)' : ''}`,
                        checkInLinkText: `${sliceAndCapitalize(emp.firstName)} ${sliceAndCapitalize(emp.lastName)} (${emp.employeeId}) ${
                            emp.checkInWithManagerDraft ? '- In Draft' : emp.checkInWithManagerPublish ? '- Completed' : '- Pending'
                        }
                        `
                    };

                    return updatedEmp;
                });
                setEmployees(updatedEmployees.sort((a: any, b: any) => a.firstName.localeCompare(b.firstName)));
                setIsManagerReviewIncomplete(
                    !data[0].isManagerReviewActive &&
                        ((!managerReviewDraft && !managerReviewPublish) || (managerReviewDraft && !managerReviewPublish))
                );
                setIsCheckInWithManagerIncomplete(
                    !data[0].isCheckInWithManagerActive && ((!checkInDraft && !checkInPublish) || (checkInDraft && !checkInPublish))
                );

                setItemStatus(prev => ({
                    ...prev,
                    managerReview:
                        (data[0].isManagerReviewDatePassed && !managerReviewPublish) || // Using the new flag
                        (!data[0].isManagerReviewActive &&
                            ((!managerReviewDraft && !managerReviewPublish) || (managerReviewDraft && !managerReviewPublish))) ||
                        !managerReviewModule ||
                        (managerReviewModule && !managerReviewModule.edit && !managerReviewModule.view)
                            ? 'disabled'
                            : managerReviewPublish &&
                              (data[0].firstManagerId !== userDetails.id
                                  ? data[0].firstManagerReviewPublish || data[0].secondManagerReviewPublish
                                  : true)
                            ? 'complete'
                            : managerReviewDraft ||
                              (data[0].firstManagerId !== userDetails.id &&
                                  (data[0].firstManagerReviewDraft || data[0].secondManagerReviewDraft))
                            ? 'ongoing'
                            : 'active',
                    managerReviewEmp,
                    checkInWithManager:
                        !data[0].isCheckInWithManagerActive || // Using the new flag
                        (!data[0].isCheckInWithManagerActive &&
                            ((!checkInDraft && !checkInPublish) || (checkInDraft && !checkInPublish))) ||
                        !checkInReviewModule ||
                        (checkInReviewModule && !checkInReviewModule.edit && !checkInReviewModule.view)
                            ? 'disabled'
                            : checkInPublish && data[0].checkInWithManagerPublish
                            ? 'complete'
                            : checkInDraft || data[0].checkInWithManagerDraft
                            ? 'ongoing'
                            : 'active',
                    checkInWithManagerEmp
                }));
            } else {
                setItemStatus(prev => ({
                    ...prev,
                    managerReview: !data[0].isManagerReviewActive
                        ? 'disabled'
                        : data[0].firstManagerReviewPublish || data[0].firstManagerReviewPublish
                        ? 'complete'
                        : data[0].firstManagerReviewDraft || data[0].firstManagerReviewDraft
                        ? 'ongoing'
                        : 'active',
                    checkInWithManager: !data[0].isCheckInWithManagerActive
                        ? 'disabled'
                        : data[0].checkInWithManagerPublish
                        ? 'complete'
                        : data[0].checkInWithManagerDraft
                        ? 'ongoing'
                        : 'active'
                }));
            }
        } else if (data && data.length === 0) {
            setItemStatus({
                startCycle: 'active',
                selfReview: 'disabled',
                managerReview: 'disabled',
                checkInWithManager: 'disabled',
                endCycle: 'disabled'
            });
        }
    }, [checkInReviewModule, data, managerReviewModule, userDetails.id]);

    const handleStartReviewCycle = () => {
        itemStatus.startCycle === 'active' && navigateTo(routeConstants.addReviewCycle, { state: { action: 'Add' } });
    };

    const handleAddSelfReview = () => {
        itemStatus.selfReview !== 'disabled' &&
            navigateTo(
                data[0].selfReviewPublish
                    ? `${routeConstants.selfReview}/${format(new Date(data[0].startDate), 'do MMM yyyy')} - ${format(
                          new Date(data[0].endDate),
                          'do MMM yyyy'
                      )}/review-summary`
                    : `${routeConstants.selfReviewPerformanceGuidelines}`,

                {
                    state: {
                        ...data[0],
                        reviewFromId: userDetails.id,
                        reviewToId: userDetails.id,
                        action:
                            !data[0].selfReviewDraft && !data[0].selfReviewPublish
                                ? 'Add'
                                : data[0].selfReviewDraft && !data[0].selfReviewPublish
                                ? 'Edit'
                                : 'View',
                        reviewCycleId: data[0].reviewCycleId
                    }
                }
            );
    };

    const handleManagerReview = (
        firstName: string,
        lastName: string,
        id: string,
        employeeId: string,
        managerId: string,
        draft: boolean,
        publish: boolean
    ) => {
        navigateTo(
            publish && !draft
                ? `${routeConstants.managerReview}/${format(new Date(data[0].startDate), 'do MMM yyyy')} - ${format(
                      new Date(data[0].endDate),
                      'do MMM yyyy'
                  )}/review-summary`
                : `${routeConstants.managerReviewPerformanceGuidelines}`,
            {
                state: {
                    ...data[0],
                    firstName,
                    lastName,
                    firstManagerId: managerId, // TODO: change this to managerId here and also in reviewsummary screen
                    action:
                        managerReviewModule && managerReviewModule.edit
                            ? !draft && !publish
                                ? 'Add'
                                : draft && !publish
                                ? 'Edit'
                                : 'View'
                            : 'View',
                    reviewCycleId: data[0].reviewCycleId,
                    reviewCycle: `${format(new Date(data[0].startDate), 'do MMM yyyy')} - ${format(
                        new Date(data[0].endDate),
                        'do MMM yyyy'
                    )}`,
                    reviewToId: id,
                    reviewToEmployeeId: employeeId
                }
            }
        );
    };

    const handleCheckIn = (
        firstName: string,
        lastName: string,
        id: string,
        firstManagerId: string,
        secondManagerId: string,
        checkInFromId: string,
        draft: boolean,
        publish: boolean,
        employeeId: string
    ) => {
        navigateTo(
            id === userDetails.id
                ? `${routeConstants.myCheckInWithManager}/${1}/${format(new Date(data[0].startDate), 'do MMM yyyy')} - ${format(
                      new Date(data[0].endDate),
                      'do MMM yyyy'
                  )}/review-summary`
                : publish
                ? `${routeConstants.checkInWithTeamMember}/${format(new Date(data[0].startDate), 'do MMM yyyy')} - ${format(
                      new Date(data[0].endDate),
                      'do MMM yyyy'
                  )}/review-summary`
                : `${routeConstants.checkInWithTeamMemberPerformanceGuidelines}`,
            {
                state: {
                    ...data[0],
                    firstName,
                    lastName,
                    action:
                        checkInReviewModule && checkInReviewModule.edit
                            ? !draft && !publish
                                ? 'Add'
                                : draft && !publish
                                ? 'Edit'
                                : 'View'
                            : 'View',
                    reviewCycleId: data[0].reviewCycleId,
                    reviewToId: id,
                    reviewToEmployeeId: employeeId,
                    firstManagerId,
                    secondManagerId,
                    reviewCycle: `${format(new Date(data[0].startDate), 'do MMM yyyy')} - ${format(
                        new Date(data[0].endDate),
                        'do MMM yyyy'
                    )}`,
                    checkInFromId
                }
            }
        );
    };

    const onEmployeeReviewLinkClick = (emp: any) => {
        const {
            managerState,
            firstName,
            lastName,
            id,
            employeeId,
            firstManagerId,
            secondManagerId,
            firstManagerReviewDraft,
            firstManagerReviewPublish,
            secondManagerReviewDraft,
            secondManagerReviewPublish
        } = emp;
        managerState !== 'disabled' &&
            handleManagerReview(
                firstName,
                lastName,
                id,
                employeeId,
                firstManagerId === userDetails.id ? firstManagerId : secondManagerId,
                firstManagerId === userDetails.id ? firstManagerReviewDraft : secondManagerReviewDraft,
                firstManagerId === userDetails.id ? firstManagerReviewPublish : secondManagerReviewPublish
            );
    };

    const onEmployeeCheckInLinkClick = (emp: any) => {
        const {
            checkInState,
            firstName,
            lastName,
            id,
            employeeId,
            firstManagerId,
            secondManagerId,
            checkInWithManagerDraft,
            checkInWithManagerPublish,
            checkInFromId
        } = emp;
        checkInState !== 'disabled' &&
            handleCheckIn(
                firstName,
                lastName,
                id,
                firstManagerId,
                secondManagerId,
                checkInFromId && checkInWithManagerPublish,
                checkInWithManagerDraft,
                checkInWithManagerPublish,
                employeeId
            );
    };

    const goToTeamCheckIn = () => {
        if (data && data[0]) {
            navigateTo(routeConstants.checkInWithTeamMemberWithActivePage.replace(':ActivePage', '1'), {
                state: {
                    ...data[0],
                    action: 'View',
                    reviewCycleId: data[0].reviewCycleId
                }
            });
        }
    };

    const navigateAccordingToReviewCycleStatus = () => {
        if (!data || !data[0]) return;
        const selfReviewPublished = data[0].selfReviewPublish;

        const navigateToReviewSummary = () => {
            const {
                selfReviewPublish,
                firstManagerReviewPublish,
                secondManagerReviewPublish,
                startDate,
                endDate,
                reviewCycleId,
                checkInWithManagerPublish
            } = data[0];

            const reviewPeriod = `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`;

            const navigateWithState = (route: To, baseState: ReviewBaseState) => {
                navigateTo(route, {
                    state: baseState
                });
            };

            if (checkInWithManagerPublish) {
                const baseState = {
                    ...data[0],
                    reviewFromId: userDetails.id,
                    reviewToId: userDetails.id,
                    action:
                        !data[0].selfReviewDraft && !selfReviewPublish
                            ? 'Add'
                            : data[0].selfReviewDraft && !selfReviewPublish
                            ? 'Edit'
                            : 'View',
                    reviewCycleId
                };
                navigateWithState(
                    `${routeConstants.myCheckInReviewCycleReviewSummary}`.replace(':ActivePage', '1').replace(':reviewCycle', reviewPeriod),
                    baseState
                );
                return;
            }

            if (selfReviewPublish && !firstManagerReviewPublish && secondManagerReviewPublish) {
                navigateWithState(`${routeConstants.myManagerReviewCycleReviewSummary}`.replace(':reviewCycle', reviewPeriod), {
                    reviewToId: userDetails.id,
                    reviewCycleId: data[0].reviewCycleId,
                    reviewFromId: userDetails.secondManagerId,
                    startDate,
                    endDate,
                    managerReviewStartDate: data[0].managerReviewStartDate,
                    managerReviewEndDate: data[0].managerReviewEndDate,
                    team: data[0].team,
                    reviewToEmployeeId: userDetails.employeeId,
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                    reviewFromEmployeeId: data[0].secondManagerEmployeeId,
                    managerFirstName: data[0].secondManagerFirstName,
                    managerLastName: data[0].secondManagerLastName,
                    draft: false,
                    publish: secondManagerReviewPublish,
                    averageRating: data[0].secondManagerAverageRating,
                    submittedDate: data[0].secondManagerReviewDate,
                    reviewCycle: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`,
                    firstManagerId: data[0].secondManagerId,
                    action: 'View'
                });
                return;
            }

            if (selfReviewPublish && firstManagerReviewPublish && !secondManagerReviewPublish && !checkInWithManagerPublish) {
                navigateWithState(`${routeConstants.myManagerReviewCycleReviewSummary}`.replace(':reviewCycle', reviewPeriod), {
                    reviewToId: userDetails.id,
                    reviewCycleId: data[0].reviewCycleId,
                    reviewFromId: userDetails.firstManagerId,
                    startDate,
                    endDate,
                    managerReviewStartDate: data[0].managerReviewStartDate,
                    managerReviewEndDate: data[0].managerReviewEndDate,
                    team: data[0].team,
                    reviewToEmployeeId: userDetails.employeeId,
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                    reviewFromEmployeeId: data[0].firstManagerEmployeeId,
                    managerFirstName: data[0].firstManagerFirstName,
                    managerLastName: data[0].firstManagerLastName,
                    draft: false,
                    publish: firstManagerReviewPublish,
                    averageRating: data[0].firstManagerAverageRating,
                    submittedDate: data[0].firstManagerReviewDate,
                    reviewCycle: `${format(new Date(startDate), 'do MMM yyyy')} - ${format(new Date(endDate), 'do MMM yyyy')}`,
                    firstManagerId: data[0].firstManagerId,
                    action: 'View'
                });
                return;
            }
            if (selfReviewPublish && firstManagerReviewPublish && secondManagerReviewPublish && !checkInWithManagerPublish) {
                const baseState = {
                    ...data[0],
                    reviewFromId: userDetails.id,
                    reviewToId: userDetails.id,
                    action:
                        !data[0].selfReviewDraft && !selfReviewPublish
                            ? 'Add'
                            : data[0].selfReviewDraft && !selfReviewPublish
                            ? 'Edit'
                            : 'View',
                    reviewCycleId
                };
                navigateWithState(`${routeConstants.performanceReviewBothManagersOnly}`.replace(':reviewCycle', reviewPeriod), baseState);
                return;
            }

            if (selfReviewPublish && (!firstManagerReviewPublish || !secondManagerReviewPublish)) {
                const baseState = {
                    ...data[0],
                    reviewFromId: userDetails.id,
                    reviewToId: userDetails.id,
                    action:
                        !data[0].selfReviewDraft && !selfReviewPublish
                            ? 'Add'
                            : data[0].selfReviewDraft && !selfReviewPublish
                            ? 'Edit'
                            : 'View',
                    reviewCycleId
                };
                navigateWithState(`${routeConstants.selfReviewCycleReviewSummary}`.replace(':reviewCycle', reviewPeriod), baseState);
                return;
            }
            const baseState = {
                ...data[0],
                reviewFromId: userDetails.id,
                reviewToId: userDetails.id,
                action:
                    !data[0].selfReviewDraft && !selfReviewPublish
                        ? 'Add'
                        : data[0].selfReviewDraft && !selfReviewPublish
                        ? 'Edit'
                        : 'View',
                reviewCycleId
            };
            navigateWithState(`${routeConstants.selfReview}/${reviewPeriod}/review-summary`, baseState);
        };

        const navigateToPerformanceGuidelines = () => {
            const route = routeConstants.selfReviewPerformanceGuidelines;

            navigateTo(route, {
                state: {
                    ...data[0],
                    reviewFromId: userDetails.id,
                    reviewToId: userDetails.id,
                    action:
                        !data[0].selfReviewDraft && !data[0].selfReviewPublish
                            ? 'Add'
                            : data[0].selfReviewDraft && !data[0].selfReviewPublish
                            ? 'Edit'
                            : 'View',
                    reviewCycleId: data[0].reviewCycleId
                }
            });
        };

        if (selfReviewPublished) {
            navigateToReviewSummary();
            return;
        } else {
            navigateToPerformanceGuidelines();
        }
    };

    const setButtonLabel = () => {
        if (data[0]?.selfReviewPublish === false && data[0]?.isSelfReviewActive === true) {
            return 'View Performance Guideline';
        }

        if (
            data[0]?.selfReviewPublish ||
            data[0]?.firstManagerReviewPublish ||
            data[0]?.secondManagerReviewPublish ||
            data[0]?.checkInWithManagerPublish
        ) {
            return 'View Review Summary';
        }
        return '';
    };

    return {
        userDetails,
        isLoading,
        data,
        itemStatus,
        employees,
        navigateTo,
        handleStartReviewCycle,
        handleAddSelfReview,
        handleManagerReview,
        handleCheckIn,
        isManagerReviewIncomplete,
        isCheckInWithManagerIncomplete,
        modulePermission,
        onEmployeeReviewLinkClick,
        onEmployeeCheckInLinkClick,
        goToTeamCheckIn,
        navigateAccordingToReviewCycleStatus,
        setButtonLabel
    };
};
