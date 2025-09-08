import { Logo } from '@common';
import { Button } from '@medly-components/core';
import { ReactComponent as SkillWatchLogo } from '../../constants/images/logos/Skillwatch.svg';
import { FlexBoxRow, FlexBoxCenterAligned, StyledWrapper, StyledLogo, StyledImage, StyledText } from './ErrorSomethingWentWrong.styled';
import ErrorImage from '../../constants/images/logos/something-went-wrong.png';
import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';

export const ErrorSomethingWentWrong = () => {
    const userDetails = useAppSelector(state => state.user);
    const onClick = () => {
        const superAdminPath = `/app${routeConstants.superAdminLogin}`;
        const userPath = `/app${routeConstants.root}`;
        const rootPath = userDetails.isSuperAdmin ? superAdminPath : userPath;
        // this error component does not have a route path and is not defined in Routes in Routes file,
        //  so it uses the window method instead of useNavigate to go to home page
        window.location.href = rootPath;
    };

    return (
        <StyledWrapper>
            <StyledLogo>
                <Logo>
                    <SkillWatchLogo />
                </Logo>
            </StyledLogo>
            <FlexBoxCenterAligned>
                <StyledImage src={ErrorImage} alt="" />
                <FlexBoxRow>
                    <StyledText textVariant="h2" textWeight="Light">
                        Oops... Something went wrong!
                    </StyledText>
                </FlexBoxRow>
                <Button size="S" onClick={onClick}>
                    Go To Home
                </Button>
            </FlexBoxCenterAligned>
        </StyledWrapper>
    );
};
