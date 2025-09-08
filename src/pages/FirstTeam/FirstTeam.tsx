import { routeConstants } from '@constants';
import { Navigate } from 'react-router-dom';

export const FirstTeam = () => {
    // "Temporarily commented out as per requirement, might be added back later"

    // const {
    //     userDetails,
    //     inputFields,
    //     addTeam,
    //     View,
    //     handleAddAnotherTeam,
    //     handleAddTeam,
    //     handleCancelNo,
    //     handleCancelYes,
    //     handleInputChange,
    //     handleRemoveField,
    //     handleToggleClick,
    //     openCloseModal,
    //     handleSkip,
    //     modalState,
    //     handleSave,
    //     isAddTeamLoading,
    //     buttonDisabled,
    //     departmentList,
    //     handleDropdownChange,
    //     handleGoBack
    // } = useFirstTeam();
    // const { width } = useWindowSize();

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
    //                             Org Admin <FromText textVariant="h4">&</FromText> Human Resources{' '}
    //                             <FromText textVariant="h4">
    //                                 teams are created for you. <br />
    //                                 Do you want to add more teams?
    //                             </FromText>
    //                         </StyledText>
    //                         {addTeam ? (
    //                             <>
    //                                 {inputFields &&
    //                                     inputFields.length > 0 &&
    //                                     inputFields.map((input: any, index: number) => {
    //                                         return (
    //                                             <TeamAndDeleteButtonDiv key={input.teamRefId}>
    //                                                 <TextFieldDesignation>
    //                                                     <StyledSingleSelect
    //                                                         options={departmentList}
    //                                                         variant="outlined"
    //                                                         size="M"
    //                                                         data-testid={`departmentName-${index}`}
    //                                                         placeholder="Select Department"
    //                                                         label="Department"
    //                                                         value={input.departmentId}
    //                                                         isSearchable
    //                                                         minWidth={width < 1450 ? '36%' : width < 1600 ? '40%' : '50%'}
    //                                                         onChange={val =>
    //                                                             val && handleDropdownChange(val, input.departmentRefId, input.teamName)
    //                                                         }
    //                                                     />
    //                                                     <TooltipDropdown
    //                                                         dataIds={[`department-input`]}
    //                                                         values={
    //                                                             input.departmentId && departmentList.length
    //                                                                 ? departmentList.filter(
    //                                                                       (item: OptionsType) => input.departmentId === item.value
    //                                                                   )
    //                                                                 : []
    //                                                         }
    //                                                     />
    //                                                     <StyledTextField
    //                                                         minWidth={width < 1450 ? '36%' : width < 1600 ? '40%' : '50%'}
    //                                                         name="teamName"
    //                                                         data-testid={`teamName-${index}`}
    //                                                         variant="outlined"
    //                                                         size="M"
    //                                                         label="Team Name"
    //                                                         placeholder="Enter Team Name"
    //                                                         type="text"
    //                                                         value={input.teamName}
    //                                                         onChange={(e: React.MouseEvent<HTMLInputElement>) =>
    //                                                             handleInputChange(e, input.teamRefId, input.departmentId)
    //                                                         }
    //                                                         errorText={input.error}
    //                                                     />

    //                                                     <StyledToggle
    //                                                         label="Active: "
    //                                                         labelVariant="h4"
    //                                                         data-testid={`activeToggle-${index}`}
    //                                                         labelWeight="Medium"
    //                                                         labelPosition="left"
    //                                                         onClick={(e: React.MouseEvent<HTMLInputElement>) =>
    //                                                             handleToggleClick(e, input.teamRefId)
    //                                                         }
    //                                                         checked={input.teamStatus}
    //                                                     />
    //                                                     <ClearButton
    //                                                         data-testid={`clearBtn-${index}`}
    //                                                         type="button"
    //                                                         onClick={() => handleRemoveField(input.teamRefId)}
    //                                                     >
    //                                                         <DeleteForeverIcon iconColor="red" />
    //                                                     </ClearButton>
    //                                                 </TextFieldDesignation>
    //                                             </TeamAndDeleteButtonDiv>
    //                                         );
    //                                     })}

    //                                 <AddTeamButtonDiv>
    //                                     <StyledAddTeam
    //                                         data-testid="addBtn"
    //                                         textVariant="h4"
    //                                         onClick={handleAddAnotherTeam}
    //                                         textAlign="center"
    //                                     >
    //                                         + Add Team
    //                                     </StyledAddTeam>
    //                                 </AddTeamButtonDiv>
    //                             </>
    //                         ) : (
    //                             <StyledButton data-testid="initAddBtn" variant="solid" onClick={handleAddTeam}>
    //                                 Add Team
    //                             </StyledButton>
    //                         )}
    //                         {addTeam ? (
    //                             <CancelAndSaveButtonDiv>
    //                                 <FlexDiv>
    //                                     <Button data-testid="cancelBtn" variant="outlined" onClick={openCloseModal}>
    //                                         Cancel
    //                                     </Button>
    //                                     <Button
    //                                         data-testid="saveBtn"
    //                                         variant="solid"
    //                                         disabled={buttonDisabled}
    //                                         onClick={handleSave}
    //                                         isLoading={isAddTeamLoading}
    //                                     >
    //                                         Save
    //                                     </Button>
    //                                 </FlexDiv>
    //                             </CancelAndSaveButtonDiv>
    //                         ) : (
    //                             <StyledSkipAndGoBackDiv>
    //                                 <StyledGoBack data-testid="go-back" variant="flat" onClick={handleGoBack}>
    //                                     &lt; Go Back
    //                                 </StyledGoBack>
    //                                 <StyledSkip data-testid="skiBtn" variant="flat" onClick={handleSkip}>
    //                                     Skip &gt;
    //                                 </StyledSkip>
    //                             </StyledSkipAndGoBackDiv>
    //                         )}
    //                     </DivInsideDiv>
    //                 </BorderDiv>
    //             </StyledAddFirstTeamDiv>
    //             <StyledLottie paddingTop="1rem" width="65%" marginBottom="8rem" data-aos="fade-right">
    //                 {View}
    //             </StyledLottie>
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
