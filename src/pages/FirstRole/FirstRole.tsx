import { routeConstants } from '@constants';
import { Navigate } from 'react-router-dom';

export const FirstRole = () => {
    // "Temporarily commented out as per requirement, might be added back later"

    // const { user, View, handleGoBack, handleSkip, handleViewRolesAndPermissions } = useFirstRole();

    // if (user && user.onboardingFlow) {
    //     addToast({
    //         variant: 'success',
    //         header: 'Onboarding flow is completed'
    //     });
    return <Navigate to={routeConstants.root} />;
    // }
    // return (
    //     <PageContent>
    //         <ListHeader title={`Welcome, ${user.firstName}`} />
    //         <LottieAndDivWrapper>
    //             <StyledAddFirstTeamDiv data-aos="fade-left">
    //                 <BorderDiv>
    //                     <DivInsideDiv>
    //                         <StyledText data-testid="title" textVariant="h4">
    //                             Org Admin, Human Resource, Manager <FromText textVariant="h4">&</FromText> Employee{' '}
    //                             <FromText textVariant="h4">
    //                                 roles are created for you. You can view roles & permissions by clicking on the below mentioned button.
    //                             </FromText>
    //                         </StyledText>
    //                         <StyledButton data-testid="viewRoleBtn" variant="solid" onClick={handleViewRolesAndPermissions}>
    //                             View Roles & Permissions{' '}
    //                         </StyledButton>

    //                         <StyledSkipAndGoBackDiv>
    //                             <StyledGoBack data-testid="go-back" variant="flat" onClick={handleGoBack}>
    //                                 &lt; Go Back
    //                             </StyledGoBack>
    //                             <StyledSkip data-testid="skiBtn" variant="flat" onClick={handleSkip}>
    //                                 Skip &gt;
    //                             </StyledSkip>
    //                         </StyledSkipAndGoBackDiv>
    //                     </DivInsideDiv>
    //                 </BorderDiv>
    //             </StyledAddFirstTeamDiv>
    //             <StyledLottie data-aos="fade-right">{View}</StyledLottie>
    //         </LottieAndDivWrapper>
    //     </PageContent>
    // );
};
