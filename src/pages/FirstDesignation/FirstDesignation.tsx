import { routeConstants } from '@constants';
import { Navigate } from 'react-router-dom';

export const FirstDesignation = () => {
    // "Temporarily commented out as per requirement, might be added back later"

    // const {
    //     userDetails,
    //     View,
    //     inputFields,
    //     addDesignation,
    //     handleAddAnotherDesignation,
    //     handleAddDesignation,
    //     handleCancelNo,
    //     handleCancelYes,
    //     handleGoBack,
    //     handleDesignationChange,
    //     handleToggleClick,
    //     handleRemoveField,
    //     modalState,
    //     handleSkip,
    //     openCloseModal,
    //     isAddDesignationLoading,
    //     handleSave,
    //     buttonDisabled,
    //     handleDropdownChange,
    //     departmentList,
    //     handleDepartmentChange
    // } = useFirstDesignation();

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
    //                             Org Admin, HR Manager <FromText textVariant="h4">&</FromText> Senior HR Executive{' '}
    //                             <FromText textVariant="h4">
    //                                 designations are created for you. Do you want to add more designations?
    //                             </FromText>
    //                         </StyledText>
    //                         {addDesignation ? (
    //                             <>
    //                                 {inputFields &&
    //                                     inputFields.length > 0 &&
    //                                     inputFields.map((input: any, index: number) => {
    //                                         return (
    //                                             <TeamAndDeleteButtonDiv key={input.designationRefId}>
    //                                                 <TextFieldDesignation>
    //                                                     <StyledSingleSelect
    //                                                         options={departmentList}
    //                                                         variant="outlined"
    //                                                         size="M"
    //                                                         placeholder="Select Department"
    //                                                         label="Department"
    //                                                         value={input.departmentId}
    //                                                         data-testid={`departmentName-${index}`}
    //                                                         isSearchable
    //                                                         onChange={val => val && handleDepartmentChange(val, input.designationRefId)}
    //                                                         errorText={input.teamError}
    //                                                         minWidth={width < 1450 ? '16%' : '20%'}
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
    //                                                     <StyledSingleSelect
    //                                                         disabled={input.teamsList.length === 0 || input.teamError}
    //                                                         options={input.teamsList}
    //                                                         variant="outlined"
    //                                                         size="M"
    //                                                         placeholder="Select Team"
    //                                                         data-testid={`teamName-${index}`}
    //                                                         label="Team"
    //                                                         value={input.teamId}
    //                                                         isSearchable
    //                                                         onChange={val =>
    //                                                             val && handleDropdownChange(val, input.teamRefId, input.designationName)
    //                                                         }
    //                                                         minWidth={width < 1450 ? '16%' : '20%'}
    //                                                     />
    //                                                     <TooltipDropdown
    //                                                         dataIds={[`team-input`]}
    //                                                         values={
    //                                                             input.teamId && input.teamsList.length
    //                                                                 ? input.teamsList.filter(
    //                                                                       (item: OptionsType) => input.teamId === item.value
    //                                                                   )
    //                                                                 : []
    //                                                         }
    //                                                     />
    //                                                     <DesignationName
    //                                                         disabled={!input.teamId || !input.departmentId}
    //                                                         name="designationName"
    //                                                         variant="outlined"
    //                                                         size="M"
    //                                                         label="Designation Name"
    //                                                         data-testid={`designationName-${index}`}
    //                                                         placeholder="Enter Designation Name"
    //                                                         type="text"
    //                                                         value={input.designationName}
    //                                                         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //                                                             handleDesignationChange(e, input.designationRefId, input.teamId)
    //                                                         }
    //                                                         errorText={input.error}
    //                                                         minWidth={width < 1450 ? '16%' : '20%'}
    //                                                     />
    //                                                     <ToggleWrapper>
    //                                                         <StyledToggle
    //                                                             label="Active: "
    //                                                             labelVariant="h4"
    //                                                             data-testid={`activeToggle-${index}`}
    //                                                             labelWeight="Medium"
    //                                                             labelPosition="left"
    //                                                             onClick={(e: React.MouseEvent<HTMLInputElement>) =>
    //                                                                 handleToggleClick(e, input.designationRefId)
    //                                                             }
    //                                                             checked={input.status}
    //                                                         />
    //                                                         <ClearButton
    //                                                             data-testid={`clearBtn-${index}`}
    //                                                             type="button"
    //                                                             onClick={() => handleRemoveField(input.designationRefId)}
    //                                                         >
    //                                                             <DeleteForeverIcon iconColor="red" />
    //                                                         </ClearButton>
    //                                                     </ToggleWrapper>
    //                                                 </TextFieldDesignation>
    //                                             </TeamAndDeleteButtonDiv>
    //                                         );
    //                                     })}

    //                                 <AddDesignationButtonDiv marginTop={width < 1500 ? '2rem' : '1rem'}>
    //                                     <StyledAddTeam
    //                                         data-testid="addBtn"
    //                                         textVariant="h4"
    //                                         onClick={handleAddAnotherDesignation}
    //                                         textAlign="center"
    //                                     >
    //                                         + Add Designation
    //                                     </StyledAddTeam>
    //                                 </AddDesignationButtonDiv>
    //                             </>
    //                         ) : (
    //                             <StyledButton data-testid="initAddBtn" variant="solid" onClick={handleAddDesignation}>
    //                                 Add Designation
    //                             </StyledButton>
    //                         )}
    //                         {addDesignation ? (
    //                             <CancelAndSaveButtonDiv>
    //                                 <FlexDiv>
    //                                     <Button data-testid="cancelBtn" variant="outlined" onClick={openCloseModal}>
    //                                         Cancel
    //                                     </Button>
    //                                     <Button
    //                                         variant="solid"
    //                                         data-testid="saveBtn"
    //                                         disabled={buttonDisabled}
    //                                         isLoading={isAddDesignationLoading}
    //                                         onClick={handleSave}
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
    //             <StyledLottie paddingTop="0rem" width="70%" data-aos="fade-right">
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
