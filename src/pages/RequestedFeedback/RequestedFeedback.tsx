import { routeConstants } from '@constants';
import { Navigate, useLocation } from 'react-router-dom';

// page is merged into 360-degree-feedback (previously request-Feedback)
export const RequestedFeedback = () => {
    const location = useLocation();
    const newPath = location.pathname.replace(routeConstants.requestFeedback, routeConstants.threeSixtyDegreeFeedback);
    const newUrl = `${newPath}${location.search}${location.hash}`;

    return <Navigate to={newUrl} replace />;
};
