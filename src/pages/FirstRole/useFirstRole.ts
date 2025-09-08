import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { useLottie } from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import addRoleAnimation from '../../constants/images/animations/addRoleAnimation.json';

export const useFirstRole = () => {
    const user = useAppSelector(state => state.user);

    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: addRoleAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const { View } = useLottie(defaultOptions);

    const handleViewRolesAndPermissions = () => {
        navigate(`${routeConstants.firstRoleRedirect}/${1}`);
    };

    const handleSkip = () => {
        navigate(routeConstants.firstEmployee);
    };

    const handleGoBack = () => {
        navigate(routeConstants.firstDesignation);
    };
    return { user, View, handleGoBack, handleSkip, handleViewRolesAndPermissions };
};
