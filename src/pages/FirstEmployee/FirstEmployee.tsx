import { routeConstants } from '@constants';
import { Navigate } from 'react-router-dom';

export const FirstEmployee = () => {
    // "Temporarily commented out as per requirement, might be added back later"

    // const { user, View, handleAddEmployee, handleDone, handleGoBack, handleBulkImport } = useFirstEmployee();

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
    //                         <FromText data-testid="title" textVariant="h4">
    //                             Would you like to add an employee?
    //                         </FromText>
    //                         <StyledFlexDiv>
    //                             <StyledButton data-testid="addEmployeeBtn" variant="solid" onClick={handleAddEmployee}>
    //                                 Add Employee{' '}
    //                             </StyledButton>
    //                             <StyledButton data-testid="bulkImport" variant="outlined" onClick={handleBulkImport}>
    //                                 Bulk Import
    //                             </StyledButton>
    //                         </StyledFlexDiv>

    //                         <StyledSkipAndGoBackDiv>
    //                             <StyledGoBack data-testid="go-back" variant="flat" onClick={handleGoBack}>
    //                                 &lt; Go Back
    //                             </StyledGoBack>
    //                             <StyledSkip data-testid="doneBtn" variant="flat" onClick={handleDone}>
    //                                 Done
    //                             </StyledSkip>
    //                         </StyledSkipAndGoBackDiv>
    //                     </DivInsideDiv>
    //                 </BorderDiv>
    //             </StyledAddFirstTeamDiv>
    //             <StyledLottie paddingTop="0rem" marginBottom="7rem" width="50%" data-aos="fade-right">
    //                 {View}
    //             </StyledLottie>
    //         </LottieAndDivWrapper>
    //     </PageContent>
    // );
};
