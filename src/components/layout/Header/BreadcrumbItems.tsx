import { routeConstants } from '@constants';
import { Breadcrumb as MedlyBreadcrumb, Text } from '@medly-components/core';
import { sliceAndCapitalize } from '@utils/sliceAndCapitalize';
import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbItem } from './Header.styled';

import { LocationData, MyComponentProps } from './types';
import { useHeader } from './useHeader';
import { FeedbackPageTabValues } from '@pages/MyFeedback/constants';

export const BreadcrumbItems: React.FC<MyComponentProps> = ({ route, employeeName, breadCrumbValue, breadcrumbLength }) => {
    const { path } = useHeader();
    const { ActivePage, id } = useParams();
    const state = useLocation().state as LocationData;
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        if ([`${routeConstants.checkInWithTeamMember}`].includes(route)) {
            navigate(`${routeConstants.checkInWithTeamMember}/${ActivePage || 1}`);
            return;
        }
        if (path.includes('/reports/analytics')) {
            navigate(routeConstants.analytics);
            return;
        }
        // request feedback page does not exist anymore, so re-routing back to 360 degree feedback page
        if (path.includes(`${routeConstants.requestFeedback}/1`)) {
            navigate(`${routeConstants.threeSixtyDegreeFeedback}/1`);
            return;
        }
        if (
            path.includes('add-goals') ||
            path.includes(routeConstants.selfReview) ||
            path.includes(routeConstants.myManagerReview) ||
            path.includes('/edit-review-cycle') ||
            path.includes('/view-review-cycle') ||
            path.includes('/add-review-cycle') ||
            path.includes('/review-summary')
        ) {
            navigate(-1);
            return;
        }
        if ([`${routeConstants.reviewTimeline}`].includes(route)) {
            navigate(routeConstants.reviewTimeline);
            return;
        }

        if (path.includes(routeConstants.managerReview) || path.includes('view-team-feedback')) {
            navigate(-1);
            return;
        }
        if (!['/reports', '/configuration', '/performance-review', routeConstants.helpAndTraining].includes(route)) {
            navigate(`${route}/${ActivePage}`);
        }
        if (path.includes('/roles-&-permissions') && state && state.from === 'onboardingFlow') {
            navigate(routeConstants.firstRoleRedirect);
        }
        if (path.includes('/dashboard')) {
            navigate(routeConstants.login);
        }
        if (route.includes('/edit-employee')) {
            navigate(`${routeConstants.employeeManagement}/${ActivePage}/edit-employee/${id}`);
        }
    }, [ActivePage, id, navigate, path, route, state]);

    // for handling when current page is /360-degree-feedback and myTab is not a valid /360-degree-feedback page tab id
    if (path.includes(routeConstants.threeSixtyDegreeFeedback)) {
        const myTab = sessionStorage.getItem('myTab');

        if (myTab && !FeedbackPageTabValues.includes(myTab)) {
            sessionStorage.setItem('myTab', 'submitted');
        }
    }

    if (!path.includes('/edit-role-&-permissions')) {
        sessionStorage.removeItem('modulePermissions');
        sessionStorage.removeItem('tempCheckboxState');
    }

    return (
        <MedlyBreadcrumb key={route}>
            <BreadcrumbItem
                key={route}
                onClick={handleClick}
                disabled={
                    breadcrumbLength
                        ? `/app${route}` == window.location.pathname ||
                          ['/employees/edit-employee'].includes(route) ||
                          window.location.pathname.includes(`/${ActivePage}`)
                        : `/app${route}` == window.location.pathname ||
                          ['/reports', '/configuration', '/performance-review', routeConstants.helpAndTraining].includes(route)
                }
            >
                {/* If the route string does not contain any forward slashes or contains more than one forward slash, the expression will return false */}
                {(breadcrumbLength ? route == '/' || route.match(/\//g)?.length === 1 : route == '/') ? (
                    <Text textVariant="h4">{''}</Text>
                ) : (
                    <Text textVariant="h4">{sliceAndCapitalize(employeeName) || sliceAndCapitalize(breadCrumbValue)}</Text>
                )}
            </BreadcrumbItem>
        </MedlyBreadcrumb>
    );
};
