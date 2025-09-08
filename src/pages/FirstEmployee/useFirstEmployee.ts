import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { usePostOnboardingFlowMutation } from '@slice/services';
import { addUser } from '@slice/user';
import { useLottie } from 'lottie-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import addEmployeeAnimation from '../../constants/images/animations/addEmployeeAnimation.json';

export const useFirstEmployee = () => {
    const user = useAppSelector(state => state.user);
    const [changeOnboardingFlow, { isLoading, error, isSuccess }] = usePostOnboardingFlowMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: addEmployeeAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const { View } = useLottie(defaultOptions);

    const handleAddEmployee = () => {
        changeOnboardingFlow({
            path: user.id,
            data: { id: user.id, organisationId: user.organisationId, onboardingFlow: true }
        });
        navigate(routeConstants.firstEmployeeRedirect, { state: { action: 'add' } });
    };

    const handleBulkImport = () => {
        navigate(routeConstants.firstEmployeeBulkImportRedirect, { state: { action: 'add', bulkImportType: 'employees' } });
    };

    const handleDone = () => {
        changeOnboardingFlow({
            path: user.id,
            data: { id: user.id, organisationId: user.organisationId, onboardingFlow: true }
        });
    };

    const handleGoBack = () => {
        navigate(routeConstants.firstRole);
    };

    useEffect(() => {
        if (error) {
            addToast({
                variant: 'error',
                header: 'Something went wrong',
                timer: 3000
            });
        } else if (!isLoading && isSuccess) {
            dispatch(
                addUser({
                    ...user,
                    onboardingFlow: true
                })
            );
            navigate(routeConstants.root);
        }
    });

    return { user, View, handleAddEmployee, handleDone, handleGoBack, handleBulkImport };
};
