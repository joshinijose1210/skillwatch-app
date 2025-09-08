import { Text } from '@medly-components/core';
import {
    BusinessIcon,
    DashboardIcon,
    DescriptionIcon,
    GroupIcon,
    HourglassFullIcon,
    HttpsIcon,
    KeyboardIcon,
    LanguageIcon,
    PersonIcon,
    RecordVoiceOverIcon,
    SchoolIcon,
    SettingsIcon,
    StorageIcon,
    CategoryIcon,
    ForumIcon,
    HistoryIcon,
    VideoLibraryIcon
} from '@medly-components/icons';
import { SideNav as MedlySideNav, SideNavContext } from '@medly-components/layout';
import { ConcentricCircleLoader } from '@medly-components/loaders';
import { WithStyle } from '@medly-components/utils';
import { useAppSelector } from '@slice';
import { useGetCompanyInfoQuery, useGetCompanyLogoQuery } from '@slice/services';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeConstants } from '@constants';

// these are not using an alias import for now as a temporary fix for running test cases
import { ReactComponent as DepartmentLogo } from '../../../constants/images/icons/department1.svg';
import { ReactComponent as SkillWatchLogo } from '../../../constants/images/logos/Skillwatch.svg';
import { ReactComponent as SuggestionBoxLogo } from '../../../constants/images/icons/suggestion_box.svg';
import NavAccordion from './NavAccordion';
import {
    CompanyName,
    Logo,
    LogoWrapper,
    PoweredText,
    PoweredWrapper,
    StyledNavEl,
    StyledSideNav,
    VersionText,
    SuperAdminLogoWrapper
} from './Sidenav.styled';

const Component: React.FC = React.memo(() => {
    const { organisationId, isSuperAdmin } = useAppSelector(({ user }) => user),
        { pathname } = useLocation(),
        { modulePermission } = useAppSelector(state => state.user),
        navigate = useNavigate();

    const userDetails = useAppSelector(state => state.user);
    const [activeAccordion, setActiveAccordion] = useState(''),
        [hasLogoFetched, setHasLogoFetched] = useState(true);

    const {
        data: companyLogoImg,
        isError,
        isFetching
    } = useGetCompanyLogoQuery(
        {
            path: 'logo/',
            params: [{ name: 'id', value: organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const { data } = useGetCompanyInfoQuery(
        {
            path: '',
            params: [{ name: 'id', value: organisationId }]
        },
        {
            skip: hasLogoFetched
        }
    );

    const handleAccordionClick = (name: string) => setActiveAccordion(prev => (prev === name ? '' : name));
    const handlePathChange = useCallback((page: string) => navigate(page), [navigate]);

    const handleLogoClick = () => {
        navigate('/');
    };
    const handleNavElementClick = (e: any, isSubItem = false) => {
        !isSubItem && setActiveAccordion('');
    };
    const checkPermission = (name: string) => {
        let isPermitted = false;
        const module = modulePermission?.find(module => module.moduleName === name);

        if (module) {
            isPermitted = module.edit || module.view || false;
        }
        return isPermitted;
    };

    useEffect(() => {
        setHasLogoFetched(!isError);
    }, [isError]);

    useEffect(() => {
        const accordianTitles = ['Reports', 'Configuration', 'Performance Review', 'Help and Training'];
        accordianTitles.forEach(title => {
            if (title.toLowerCase().split(' ').join('-') === pathname.split('/')[1]) {
                setActiveAccordion(title);
                return;
            }
        });
    }, [pathname]);

    return (
        <SideNavContext.Provider
            value={{
                activeItem: 'dummy',
                isHovered: true,
                isExpanded: true,
                activeItemChangeHandler: () => null
            }}
        >
            <StyledSideNav id="ul" onChange={handlePathChange} active={pathname} defaultActive="/" defaultOpen={true}>
                {isSuperAdmin ? (
                    <SuperAdminLogoWrapper onClick={handleLogoClick}>
                        <SkillWatchLogo />
                    </SuperAdminLogoWrapper>
                ) : isFetching ? (
                    <LogoWrapper>
                        <ConcentricCircleLoader size="XXS" />
                    </LogoWrapper>
                ) : (
                    <LogoWrapper onClick={handleLogoClick}>
                        {companyLogoImg && companyLogoImg.logoUrl && hasLogoFetched ? (
                            <Logo
                                src={`${companyLogoImg.logoUrl}?${new Date().toTimeString()}`}
                                alt="company logo"
                                onError={() => setHasLogoFetched(false)}
                            />
                        ) : (
                            <CompanyName textVariant="body1" textWeight="Medium" textAlign="center">
                                {data ? data.name : ' '}
                            </CompanyName>
                        )}
                    </LogoWrapper>
                )}
                <MedlySideNav.List>
                    {isSuperAdmin ? (
                        <StyledNavEl path={routeConstants.superAdminRoot} isActive={pathname === '/admin'} onClick={handleNavElementClick}>
                            <BusinessIcon />
                            <Text>Organisations</Text>
                        </StyledNavEl>
                    ) : (
                        <>
                            <StyledNavEl path={routeConstants.root} isActive={pathname === '/'} onClick={handleNavElementClick}>
                                <DashboardIcon />
                                <Text>Dashboard</Text>
                            </StyledNavEl>

                            <StyledNavEl
                                isActive={pathname.includes(routeConstants.myFeedback)}
                                path={`${routeConstants.myFeedback}/${1}`}
                                onClick={handleNavElementClick}
                            >
                                <ForumIcon />
                                <Text>360-Degree Feedback</Text>
                            </StyledNavEl>
                            <StyledNavEl
                                isActive={pathname.includes(routeConstants.suggestionBox)}
                                path={`${routeConstants.suggestionBox}/${1}`}
                                onClick={handleNavElementClick}
                            >
                                <SuggestionBoxLogo />
                                <Text>Suggestion Box</Text>
                            </StyledNavEl>

                            {(checkPermission('Feedback') || checkPermission('Employee Reviews')) && (
                                <NavAccordion
                                    title="Reports"
                                    handleAccordionClick={handleAccordionClick}
                                    activeAccordion={activeAccordion}
                                    icon={<DescriptionIcon />}
                                    content={
                                        <>
                                            {checkPermission('Feedback') && (
                                                <StyledNavEl
                                                    isActive={pathname.includes(routeConstants.employeeFeedback)}
                                                    path={`${routeConstants.employeeFeedback}/${1}`}
                                                    isSubItem
                                                >
                                                    <KeyboardIcon />
                                                    <Text>Feedback</Text>
                                                </StyledNavEl>
                                            )}

                                            {checkPermission('Performance Review') && (
                                                <StyledNavEl
                                                    isActive={pathname.includes(routeConstants.performanceReview)}
                                                    path={`${routeConstants.performanceReview}/${1}`}
                                                    isSubItem
                                                >
                                                    <RecordVoiceOverIcon />
                                                    <Text>Performance Review</Text>
                                                </StyledNavEl>
                                            )}
                                            {checkPermission('Analytics') && (
                                                <StyledNavEl
                                                    isActive={pathname.includes(routeConstants.analytics)}
                                                    path={routeConstants.analytics}
                                                    isSubItem
                                                >
                                                    <RecordVoiceOverIcon />
                                                    <Text>Analytics</Text>
                                                </StyledNavEl>
                                            )}
                                        </>
                                    }
                                />
                            )}

                            {checkPermission('Departments') && (
                                <StyledNavEl
                                    isActive={pathname.includes(routeConstants.departmentManagement)}
                                    path={`${routeConstants.departmentManagement}/${1}`}
                                    onClick={handleNavElementClick}
                                >
                                    <DepartmentLogo />
                                    <Text>Departments</Text>
                                </StyledNavEl>
                            )}
                            {checkPermission('Teams') && (
                                <StyledNavEl
                                    isActive={pathname.includes(routeConstants.teamManagement)}
                                    path={`${routeConstants.teamManagement}/${1}`}
                                    onClick={handleNavElementClick}
                                >
                                    <GroupIcon />
                                    <Text>Teams</Text>
                                </StyledNavEl>
                            )}

                            {checkPermission('Designations') && (
                                <StyledNavEl
                                    isActive={pathname.includes(routeConstants.designationManagement)}
                                    path={`${routeConstants.designationManagement}/${1}`}
                                    onClick={handleNavElementClick}
                                >
                                    <SchoolIcon />
                                    <Text>Designations</Text>
                                </StyledNavEl>
                            )}
                            {checkPermission('Roles & Permissions') && (
                                <StyledNavEl
                                    isActive={pathname.includes(routeConstants.rolesAndPermissions)}
                                    path={`${routeConstants.rolesAndPermissions}/${1}`}
                                    onClick={handleNavElementClick}
                                >
                                    <HttpsIcon />
                                    <Text>Roles & Permissions</Text>
                                </StyledNavEl>
                            )}

                            {checkPermission('Employees') && (
                                <StyledNavEl
                                    isActive={pathname.includes(routeConstants.employeeManagement)}
                                    path={`${routeConstants.employeeManagement}/${1}`}
                                    onClick={handleNavElementClick}
                                >
                                    <PersonIcon />
                                    <Text>Employees</Text>
                                </StyledNavEl>
                            )}

                            {checkPermission('KRAs') && (
                                <StyledNavEl
                                    isActive={pathname.includes(routeConstants.kraManagement)}
                                    path={`${routeConstants.kraManagement}/${1}`}
                                    onClick={handleNavElementClick}
                                >
                                    <CategoryIcon />
                                    <Text>KRAs</Text>
                                </StyledNavEl>
                            )}

                            {checkPermission('KPIs') && (
                                <StyledNavEl
                                    isActive={pathname.includes(routeConstants.kpiManagement)}
                                    path={`${routeConstants.kpiManagement}/${1}`}
                                    onClick={handleNavElementClick}
                                >
                                    <StorageIcon />
                                    <Text>KPIs</Text>
                                </StyledNavEl>
                            )}

                            <NavAccordion
                                title="Performance Review"
                                handleAccordionClick={handleAccordionClick}
                                activeAccordion={activeAccordion}
                                icon={<HourglassFullIcon />}
                                content={
                                    <>
                                        {checkPermission('Review Cycles') && (
                                            <StyledNavEl
                                                isActive={pathname.includes(routeConstants.reviewCycleConfiguration)}
                                                path={routeConstants.reviewCycleConfiguration}
                                                isSubItem
                                            >
                                                <HourglassFullIcon />
                                                <Text>Setup Review Cycle</Text>
                                            </StyledNavEl>
                                        )}
                                        <StyledNavEl
                                            isActive={pathname.includes(routeConstants.reviewTimeline)}
                                            path={routeConstants.reviewTimeline}
                                            isSubItem
                                        >
                                            <HourglassFullIcon />
                                            <Text>Review Timeline</Text>
                                        </StyledNavEl>
                                        <StyledNavEl
                                            isActive={pathname.includes(routeConstants.selfReview)}
                                            path={routeConstants.selfReview}
                                            isSubItem
                                        >
                                            <HourglassFullIcon />
                                            <Text>Self Review</Text>
                                        </StyledNavEl>
                                        {userDetails.id !== userDetails?.firstManagerId &&
                                            userDetails.id !== userDetails?.secondManagerId && (
                                                <StyledNavEl
                                                    isActive={pathname.includes(routeConstants.myManagerReview)}
                                                    path={routeConstants.myManagerReview}
                                                    isSubItem
                                                >
                                                    <HourglassFullIcon />
                                                    <Text>Manager Review</Text>
                                                </StyledNavEl>
                                            )}
                                        {userDetails.id !== userDetails?.firstManagerId &&
                                            userDetails.id !== userDetails?.secondManagerId && (
                                                <StyledNavEl
                                                    isActive={pathname.includes(routeConstants.myCheckInWithManager)}
                                                    path={`${routeConstants.myCheckInWithManager}/${1}`}
                                                    isSubItem
                                                >
                                                    <HourglassFullIcon />
                                                    <Text>Manager Check-in</Text>
                                                </StyledNavEl>
                                            )}
                                        {checkPermission('Reviews for Team Members') && userDetails.isOrWasManager && (
                                            <StyledNavEl
                                                isActive={pathname.includes(routeConstants.managerReview)}
                                                path={routeConstants.managerReview}
                                                isSubItem
                                            >
                                                <HourglassFullIcon />
                                                <Text>Team&apos;s Review</Text>
                                            </StyledNavEl>
                                        )}
                                        {checkPermission('Check-in with Team Members') && userDetails.isOrWasManager && (
                                            <StyledNavEl
                                                isActive={pathname.includes(routeConstants.checkInWithTeamMember)}
                                                path={`${routeConstants.checkInWithTeamMember}/${1}`}
                                                isSubItem
                                            >
                                                <HourglassFullIcon />
                                                <Text>Team&apos;s Check-in</Text>
                                            </StyledNavEl>
                                        )}
                                    </>
                                }
                            />

                            {(checkPermission('Company Information') || checkPermission('Settings')) && (
                                <NavAccordion
                                    title="Configuration"
                                    icon={<SettingsIcon />}
                                    activeAccordion={activeAccordion}
                                    handleAccordionClick={handleAccordionClick}
                                    content={
                                        <>
                                            {checkPermission('Company Information') && (
                                                <StyledNavEl
                                                    isActive={pathname.includes(routeConstants.companyInformation)}
                                                    path={routeConstants.companyInformation}
                                                    isSubItem
                                                >
                                                    <BusinessIcon />
                                                    <Text>Company</Text>
                                                </StyledNavEl>
                                            )}
                                            {checkPermission('Settings') && (
                                                <StyledNavEl
                                                    isActive={pathname.includes(routeConstants.settings)}
                                                    path={routeConstants.settings}
                                                    isSubItem
                                                >
                                                    <LanguageIcon />
                                                    <Text>Settings</Text>
                                                </StyledNavEl>
                                            )}
                                            {/* Note: change domain name */}
                                            {checkPermission('Integrations') && (
                                                <StyledNavEl
                                                    isActive={pathname.includes(routeConstants.integrations)}
                                                    path={routeConstants.integrations}
                                                    isSubItem
                                                >
                                                    <LanguageIcon />
                                                    <Text>Integrations</Text>
                                                </StyledNavEl>
                                            )}
                                        </>
                                    }
                                />
                            )}

                            {checkPermission('User Activity Log') && (
                                <StyledNavEl
                                    isActive={pathname.includes(routeConstants.userActivityLog)}
                                    path={routeConstants.userActivityLog}
                                    onClick={handleNavElementClick}
                                >
                                    <HistoryIcon />
                                    <Text>User Activity Log</Text>
                                </StyledNavEl>
                            )}
                            {checkPermission('Tutorial Videos') && (
                                <NavAccordion
                                    title="Help and Training"
                                    handleAccordionClick={handleAccordionClick}
                                    activeAccordion={activeAccordion}
                                    icon={<VideoLibraryIcon />}
                                    content={
                                        <>
                                            <StyledNavEl
                                                isActive={pathname.includes(routeConstants.tutorial)}
                                                path={routeConstants.tutorial}
                                                onClick={handleNavElementClick}
                                                isSubItem
                                            >
                                                <VideoLibraryIcon />
                                                <Text>Tutorial Videos</Text>
                                            </StyledNavEl>
                                        </>
                                    }
                                />
                            )}
                        </>
                    )}
                </MedlySideNav.List>
                <VersionText textVariant="body3">v5.2.0</VersionText>
                <PoweredWrapper>
                    <PoweredText textVariant="body3" textAlign="center" textWeight="Light">
                        Powered by <SkillWatchLogo />
                    </PoweredText>
                </PoweredWrapper>
            </StyledSideNav>
        </SideNavContext.Provider>
    );
});

Component.displayName = 'AppSideNav';

export const SideNav: React.FC & WithStyle = Object.assign(Component, { Style: MedlySideNav.Style });
