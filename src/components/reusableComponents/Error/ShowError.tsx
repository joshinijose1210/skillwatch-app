import MaintenanceLogo from '@constants/images/animations/maintenance.json';
import { Button, Text } from '@medly-components/core';
import { Logo } from '@common';
import Lottie from 'lottie-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorFor404 from '../../../constants/images/logos/error-logo.png';
import { ReactComponent as InternalServerError } from '../../../constants/images/logos/internal-server-error.svg';
import { ReactComponent as SkillwatchLogo } from '../../../constants/images/logos/Skillwatch.svg';
import {
    MaintenanceAnimation,
    MaintenanceContainer,
    MaintenanceContent,
    StyledImage,
    StyledLogo,
    StyledSvg,
    StyledWrapper
} from './ShowError.styled';
const ShowError = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const { prevUrl = '' } = (location.state as any) || {};

    const tryAgain = () => {
        return (window.location.pathname = prevUrl);
    };

    const goBack = () => navigate(-1);

    const onClick = path === '/500' ? tryAgain : goBack;

    return (
        <StyledWrapper>
            <StyledLogo>
                <Logo>
                    <SkillwatchLogo />
                </Logo>
            </StyledLogo>
            {path === '/500' ? (
                <StyledSvg preserveAspectRatio="none" viewBox="0 0 300 100">
                    <InternalServerError />
                </StyledSvg>
            ) : path === '/502' ? (
                <MaintenanceContainer>
                    <MaintenanceAnimation>
                        <Lottie animationData={MaintenanceLogo} loop />
                    </MaintenanceAnimation>
                    <MaintenanceContent>
                        <Text textVariant="h3" textWeight="Medium" textAlign="center">
                            Website under maintenance…
                        </Text>
                        <Text textVariant="body1" textWeight="Regular" textAlign="center" textColor="#98A7B7">
                            Our website is currently undergoing scheduled maintenance. We should be back shortly. Thank you for your
                            patience.
                        </Text>
                    </MaintenanceContent>
                </MaintenanceContainer>
            ) : (
                <StyledImage src={ErrorFor404} alt="" />
            )}
            {path !== '/502' && (
                <Button size="S" onClick={onClick}>
                    {path === '/500' ? 'Try Again' : 'Go Back'}
                </Button>
            )}
        </StyledWrapper>
    );
};

export default ShowError;
