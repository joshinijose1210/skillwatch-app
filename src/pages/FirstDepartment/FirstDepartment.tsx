import { Navigate } from 'react-router-dom';
import { routeConstants } from '@constants';

export const FirstDepartment = () => {
    // "Temporarily commented out as per requirement, might be added back later"

    // const {
    //     userDetails,
    //     inputFields,
    //     addDepartment,
    //     View,
    //     handleAddAnotherDepartment,
    //     handleAddDepartment,
    //     handleCancelNo,
    //     handleCancelYes,
    //     handleInputChange,
    //     handleRemoveField,
    //     handleToggleClick,
    //     openCloseModal,
    //     handleSkip,
    //     modalState,
    //     handleSave,
    //     isAddDepartmentLoading,
    //     buttonDisabled
    // } = useFirstDepartment();

    // if (userDetails && userDetails.onboardingFlow) {
    //     addToast({
    //         variant: 'success',
    //         header: 'Onboarding flow is completed'
    //     });
    return <Navigate to={routeConstants.root} />;
    // }
    // return (
    //     <PageContent>
    //         <ListHeader title={`Welcome, ${userDetails.firstName}`} />
    //         <LottieAndDivWrapper>
    //             <StyledAddFirstTeamDiv data-aos="fade-left">
    //                 <BorderDiv>
    //                     <DivInsideDiv>
    //                         <StyledText data-testid="title" textVariant="h4">
    //                             Executive Leadership <FromText textVariant="h4">&</FromText> Human Resource{' '}
    //                             <FromText textVariant="h4">
    //                                 departments are created for you. <br /> Do you want to add more departments?
    //                             </FromText>
    //                         </StyledText>
    //                         {addDepartment ? (
    //                             <>
    //                                 {inputFields &&
    //                                     inputFields.length > 0 &&
    //                                     inputFields.map((input: Department, index: number) => {
    //                                         return (
    //                                             <TeamAndDeleteButtonDiv key={input.departmentRefId}>
    //                                                 <TextFieldDiv>
    //                                                     <StyledTextField
    //                                                         minWidth="95%"
    //                                                         data-testid={`departmentName-${index}`}
    //                                                         name="departmentName"
    //                                                         variant="outlined"
    //                                                         size="M"
    //                                                         label="Department Name"
    //                                                         placeholder="Enter Department Name"
    //                                                         type="text"
    //                                                         value={input.departmentName}
    //                                                         onChange={(e: React.MouseEvent<HTMLInputElement>) =>
    //                                                             handleInputChange(e, input.departmentRefId)
    //                                                         }
    //                                                         errorText={input.error}
    //                                                     />
    //                                                 </TextFieldDiv>
    //                                                 <StyledToggle
    //                                                     data-testid={`activeToggle-${index}`}
    //                                                     label="Active: "
    //                                                     labelVariant="h4"
    //                                                     labelWeight="Medium"
    //                                                     labelPosition="left"
    //                                                     onClick={(e: React.MouseEvent<HTMLInputElement>) =>
    //                                                         handleToggleClick(e, input.departmentRefId)
    //                                                     }
    //                                                     checked={input.departmentStatus}
    //                                                 />
    //                                                 <ClearButton
    //                                                     data-testid={`clearBtn-${index}`}
    //                                                     type="button"
    //                                                     onClick={() => handleRemoveField(input.departmentRefId)}
    //                                                 >
    //                                                     <DeleteForeverIcon iconColor="red" />
    //                                                 </ClearButton>
    //                                             </TeamAndDeleteButtonDiv>
    //                                         );
    //                                     })}

    //                                 <AddTeamButtonDiv>
    //                                     <StyledAddTeam
    //                                         data-testid="addBtn"
    //                                         textVariant="h4"
    //                                         onClick={handleAddAnotherDepartment}
    //                                         textAlign="center"
    //                                     >
    //                                         + Add Department
    //                                     </StyledAddTeam>
    //                                 </AddTeamButtonDiv>
    //                             </>
    //                         ) : (
    //                             <StyledButton data-testid="initAddBtn" variant="solid" onClick={handleAddDepartment}>
    //                                 Add Department
    //                             </StyledButton>
    //                         )}
    //                         {addDepartment ? (
    //                             <CancelAndSaveButtonDiv>
    //                                 <FlexDiv>
    //                                     <Button data-testid="cancelBtn" variant="outlined" onClick={openCloseModal}>
    //                                         Cancel
    //                                     </Button>
    //                                     <Button
    //                                         variant="solid"
    //                                         disabled={buttonDisabled}
    //                                         onClick={handleSave}
    //                                         isLoading={isAddDepartmentLoading}
    //                                         data-testid="saveBtn"
    //                                     >
    //                                         Save
    //                                     </Button>
    //                                 </FlexDiv>
    //                             </CancelAndSaveButtonDiv>
    //                         ) : (
    //                             <StyledSkipDiv>
    //                                 <StyledSkip data-testid="skiBtn" variant="flat" onClick={handleSkip}>
    //                                     Skip &gt;
    //                                 </StyledSkip>
    //                             </StyledSkipDiv>
    //                         )}
    //                     </DivInsideDiv>
    //                 </BorderDiv>
    //             </StyledAddFirstTeamDiv>
    //             <StyledLottie data-aos="fade-right">{View}</StyledLottie>
    //         </LottieAndDivWrapper>
    //         <Modal open={modalState} onCloseModal={openCloseModal}>
    //             <StyledModalHeader>
    //                 <Text textVariant="h2">Confirm</Text>
    //             </StyledModalHeader>
    //             <StyledModalContent>
    //                 <Text textVariant="body1" textWeight="Medium">
    //                     Are you sure you wish to cancel? Any unsaved changes will be lost.
    //                 </Text>
    //             </StyledModalContent>
    //             <StyledModalActions>
    //                 <CancelButton data-testid="modal-yes" variant="outlined" onClick={handleCancelYes}>
    //                     Yes
    //                 </CancelButton>
    //                 <Button data-testid="modal-no" onClick={handleCancelNo} variant="outlined">
    //                     No
    //                 </Button>
    //             </StyledModalActions>
    //         </Modal>
    //     </PageContent>
    // );
};
