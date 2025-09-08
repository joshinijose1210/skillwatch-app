import { routeConstants } from '@constants';
import { Navigate, useLocation } from 'react-router-dom';

// page is merged into 360-degree-feedback (previously my-feedback)
const MyFeedbackRedirect = () => {
    const location = useLocation();
    const newPath = location.pathname.replace('/my-feedback', routeConstants.threeSixtyDegreeFeedback);
    const newUrl = `${newPath}${location.search}${location.hash}`;

    return <Navigate to={newUrl} replace />;
};
export default MyFeedbackRedirect;
