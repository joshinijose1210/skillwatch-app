import { Loader } from '@components';
import { Logo, ScreenWidthWrapper } from '@common';
import { Box, Button, Text } from '@medly-components/core';
import { ReactComponent as SkillWatchLogo } from '@constants/images/logos/Skillwatch.svg';
import { useExternalFeedbackForm } from './useExternalFeedbackForm';
import NotFound404 from '@pages/NotFound404';
import { FC } from 'react';
import {
    FlexBoxRow,
    StyledButtonWrapper,
    FlexBoxCenterAligned,
    NavigationLink,
    StyledHeading,
    StyledWrapper,
    StyledLogo,
    StyledText,
    PageTitle,
    Row
} from './ExternalFeedbackForm.styled';
import { AccordionInputFields, FeedbackTipsSection } from '@pages/RequestedFeedback/RequestedFeedbackForm/RequestedFeedbackForm';
import { StyledFeedbackFormTextArea } from '@pages/RequestedFeedback/RequestedFeedbackForm/RequestedFeedbackForm.style';

export const ExternalFeedbackForm: FC = () => {
    const {
        handleChange,
        isLoading,
        buttonLoader,
        externalFeedbackData,
        linkValid,
        submittedText,
        isFetchError,
        isFetched,
        isSubmitDisabled,
        handleRedirect,
        handleSubmit,
        handleAccordionToggle,
        activeAccordion,
        feedbackTagText,
        feedbackTypeOptions,
        feedbackTagNumber,
        getInputValue,
        feedbackErrors,
        feedbackDescription
    } = useExternalFeedbackForm();

    const feedbackAbout =
        externalFeedbackData?.feedbackToId === externalFeedbackData?.requestedById
            ? `Self (${externalFeedbackData?.feedbackToTeam})`
            : `${externalFeedbackData?.feedbackToFirstName} ${externalFeedbackData?.feedbackToLastName} (${externalFeedbackData?.feedbackToTeam})`;

    if (submittedText || isFetchError) {
        return (
            <StyledWrapper>
                <StyledLogo>
                    <Logo href={process.env.LOGIN_URL}>
                        <SkillWatchLogo />
                    </Logo>
                </StyledLogo>
                <FlexBoxCenterAligned>
                    {submittedText ? (
                        <>
                            <FlexBoxRow>
                                <Text textVariant="h1" textWeight="Medium">
                                    {submittedText}
                                </Text>
                            </FlexBoxRow>
                            <NavigationLink textVariant="h4" textAlign="center" onClick={handleRedirect}>
                                Click here to redirect to site.
                            </NavigationLink>
                        </>
                    ) : (
                        <FlexBoxRow>
                            <Text textVariant="h2" textWeight="Medium">
                                Oops! Something went wrong :(
                            </Text>
                        </FlexBoxRow>
                    )}
                </FlexBoxCenterAligned>
            </StyledWrapper>
        );
    } else if (isLoading || isFetched) {
        return <Loader />;
    } else if (linkValid) {
        return (
            <StyledWrapper>
                <StyledLogo>
                    <Logo href={process.env.LOGIN_URL}>
                        <SkillWatchLogo />
                    </Logo>
                </StyledLogo>

                <Box style={{ flexDirection: 'column', padding: 0, marginTop: '2rem' }}>
                    <PageTitle>Feedback Form</PageTitle>
                    <FlexBoxRow>
                        <ScreenWidthWrapper style={{ width: '50%', display: 'flex' }} className="form-division">
                            <Box style={{ flexDirection: 'column', padding: 0 }}>
                                <Row hasMarginTop>
                                    <StyledHeading textVariant="h4" textWeight="Medium">
                                        Requested By:
                                    </StyledHeading>
                                    <StyledText>
                                        &nbsp;{externalFeedbackData?.requestedByFirstName} {externalFeedbackData?.requestedByLastName}
                                    </StyledText>
                                </Row>

                                <Row>
                                    <StyledHeading textVariant="h4" textWeight="Medium">
                                        Feedback About:
                                    </StyledHeading>
                                    <StyledText>
                                        &nbsp;
                                        {feedbackAbout}
                                    </StyledText>
                                </Row>

                                <Row hasMarginTop>
                                    <StyledHeading textVariant="h4" textWeight="Medium">
                                        Organisation:
                                    </StyledHeading>
                                    <StyledText>&nbsp;{externalFeedbackData?.organisationName}</StyledText>
                                </Row>

                                <Row hasMarginTop>
                                    <StyledHeading textVariant="h4" textWeight="Medium">
                                        Context:
                                    </StyledHeading>
                                </Row>
                                <StyledFeedbackFormTextArea
                                    feedbackData={feedbackDescription}
                                    dangerouslySetInnerHTML={{ __html: feedbackDescription }}
                                />
                            </Box>
                            <AccordionInputFields
                                action="Add"
                                feedbackErrors={feedbackErrors}
                                feedbackTypeOptions={feedbackTypeOptions}
                                getInputValue={getInputValue}
                                handleChange={handleChange}
                                activeAccordion={activeAccordion}
                                handleAccordinToggle={handleAccordionToggle}
                            />
                            <StyledButtonWrapper>
                                <Button
                                    data-testid="submit-button"
                                    isLoading={buttonLoader === 2 && isLoading}
                                    disabled={isSubmitDisabled}
                                    onClick={handleSubmit}
                                    variant="solid"
                                >
                                    Submit
                                </Button>
                            </StyledButtonWrapper>
                        </ScreenWidthWrapper>
                        <FeedbackTipsSection feedbackTagText={feedbackTagText} action={'Add'} feedbackTagNumber={feedbackTagNumber} />
                    </FlexBoxRow>
                </Box>
            </StyledWrapper>
        );
    } else {
        return <NotFound404 />;
    }
};
