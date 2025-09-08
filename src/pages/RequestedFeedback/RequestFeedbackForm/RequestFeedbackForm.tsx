import { ScreenWidthWrapper, StyledMultiSelect, StyledSingleSelect, StyledTextField, StyledTipsTitle, StyledToggle } from '@common';
import { PageContent, RichTextEditor } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import TextDescription from '@components/reusableComponents/TextDescription';
import { Button } from '@medly-components/core';
import * as Styled from './RequestFeedbackForm.styled';
import { FC } from 'react';
import { StyledButtonWrapper } from '../RequestedFeedbackForm/RequestedFeedbackForm.style';
import { useRequestFeedbackForm } from './useRequestFeedbackForm';
import GetDescription from './GetDescription';
import { ToggleWrapper, MultiSelectWrapper } from './RequestFeedbackForm.styled';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';
import { AccordionInputFields } from '../RequestedFeedbackForm/RequestedFeedbackForm';

export const RequestFeedbackForm: FC = () => {
    const {
        state,
        feedbackTo,
        requestFrom,
        isLoading,
        handleSend,
        employeeList,
        feedbackDescription,
        handleSelectRequestFrom,
        handleSelectFeedbackTo,
        sameUserError,
        actionItem,
        handleActionItems,
        actionItemsOptions,
        showActionItems,
        handleChange,
        isSendDisabled,
        handleCustomInputRequestFrom,
        handleEmailsRequestFrom,
        isExternal,
        handleToggleClick,
        externalEmails,
        isEmail,
        viewFeedbackDescription,
        SingleFeedbackData,
        feedbackTypeOptions,
        activeAccordion,
        handleAccordinToggle
    } = useRequestFeedbackForm();

    return (
        <PageContent>
            <ListHeader title={state && state.action == 'View' ? 'View Requested Feedback' : 'Request Feedback'} />
            {state.action !== 'View' && (
                <ToggleWrapper>
                    <StyledToggle
                        label="Request for feedback from a client/stakeholder ?"
                        fullWidth={true}
                        onClick={() => handleToggleClick()}
                        checked={isExternal}
                        data-testid="toggle"
                    />
                </ToggleWrapper>
            )}
            <Styled.StyledContainer>
                <ScreenWidthWrapper className="form-division" action={state?.action}>
                    {!isExternal && (
                        <>
                            <StyledMultiSelect
                                disabled={state && state.action === 'View'}
                                options={employeeList('From')}
                                variant="outlined"
                                placeholder="Select Employee Name"
                                label="Feedback From"
                                onChange={value => handleSelectRequestFrom(value)}
                                values={requestFrom}
                                size="M"
                                minWidth="100%"
                                data-testid="employeeOne"
                            />
                            <TooltipDropdown
                                dataIds={['feedback from-input', 'feedback from-count-chip']}
                                values={
                                    requestFrom?.length && employeeList('From').length
                                        ? employeeList('From').filter(
                                              (item: OptionsType) => item.value !== undefined && requestFrom.includes(item.value as string)
                                          )
                                        : []
                                }
                            />
                        </>
                    )}
                    {isExternal && (
                        <>
                            <MultiSelectWrapper
                                errorText={sameUserError}
                                disabled={state && state.action === 'View'}
                                isCreatable={isEmail}
                                variant="outlined"
                                label="Enter email"
                                onInputChange={value => handleCustomInputRequestFrom(value)}
                                onChange={value => handleEmailsRequestFrom(value)}
                                options={
                                    state && state.action === 'View'
                                        ? [{ label: state.externalFeedbackFromEmail, value: state.externalFeedbackFromEmail }]
                                        : []
                                }
                                placeholder="Enter email"
                                values={externalEmails}
                                size="M"
                                minWidth="100%"
                                data-testid="external"
                            />
                            <TooltipDropdown
                                dataIds={['enter email-input', 'enter email-count-chip']}
                                values={(() => {
                                    const list =
                                        state && state.action === 'View'
                                            ? [{ label: state.externalFeedbackFromEmail, value: state.externalFeedbackFromEmail }]
                                            : [];

                                    return externalEmails?.length && list.length
                                        ? list.filter(
                                              (item: OptionsType) =>
                                                  item.value !== undefined && externalEmails.includes(item.value as string)
                                          )
                                        : [];
                                })()}
                            />
                        </>
                    )}

                    <StyledMultiSelect
                        disabled={state && state.action === 'View'}
                        options={employeeList('To')}
                        variant="outlined"
                        placeholder="Select Employee Name"
                        label="Feedback About"
                        onChange={handleSelectFeedbackTo}
                        values={feedbackTo}
                        minWidth="100%"
                        data-testid="employeeTwo"
                    />
                    <TooltipDropdown
                        dataIds={['feedback to-input', 'feedback to-count-chip']}
                        values={
                            feedbackTo?.length && employeeList('To').length
                                ? employeeList('To').filter(
                                      (item: OptionsType) => item.value !== undefined && feedbackTo.includes(item.value as string)
                                  )
                                : []
                        }
                    />
                    {showActionItems &&
                        (state && state.action === 'View' && actionItem.length !== 0 ? (
                            <StyledTextField variant="outlined" minWidth="100%" label="Goal" disabled={true} value={actionItem} />
                        ) : (
                            state.action !== 'View' && (
                                <>
                                    <StyledSingleSelect
                                        options={actionItemsOptions}
                                        variant="outlined"
                                        placeholder="Select Goal (optional)"
                                        label="Goal (optional)"
                                        onChange={handleActionItems}
                                        value={actionItem}
                                        minWidth="100%"
                                        data-testid="actionItem"
                                    />
                                    <TooltipDropdown
                                        dataIds={['goal (optional)-status-input']}
                                        values={
                                            actionItem && actionItemsOptions.length
                                                ? actionItemsOptions.filter((item: OptionsType) => actionItem === item.value)
                                                : []
                                        }
                                    />
                                </>
                            )
                        ))}
                    {state && state.action === 'View' ? (
                        <TextDescription
                            disabled={false}
                            feedback={viewFeedbackDescription}
                            placeholder={
                                state && state.action == 'View'
                                    ? 'Context'
                                    : 'Set Context: Provide a reason or task or project name so the person knows why you’re requesting feedback'
                            }
                        />
                    ) : (
                        <RichTextEditor
                            editor={'feedback'}
                            input={feedbackDescription || ''}
                            setInput={handleChange}
                            placeholder="Set Context: Provide a reason or task or project name so the person knows why you’re requesting feedback"
                            label=""
                        />
                    )}

                    {state &&
                        state.action == 'View' &&
                        (!state.isSubmitted ? (
                            <TextDescription disabled={false} feedback={'Feedback Pending'} placeholder={'Feedback'} />
                        ) : (
                            <AccordionInputFields
                                action="View"
                                handleChange={() => null}
                                feedbackErrors={{ 1: '', 2: '', 3: '' }}
                                activeAccordion={activeAccordion}
                                getInputValue={feedbackTypeId =>
                                    SingleFeedbackData?.feedbackData?.find(feedbackItem => feedbackItem.feedbackTypeId === feedbackTypeId)
                                        ?.feedback || ''
                                }
                                handleAccordinToggle={handleAccordinToggle}
                                feedbackTypeOptions={feedbackTypeOptions}
                            />
                        ))}
                    {state && state.action !== 'View' && (
                        <StyledButtonWrapper>
                            <Button
                                data-testid="sendBtn"
                                disabled={isSendDisabled()}
                                onClick={handleSend}
                                isLoading={isLoading}
                                variant="solid"
                            >
                                Send
                            </Button>
                        </StyledButtonWrapper>
                    )}
                </ScreenWidthWrapper>
                {state && state.action !== 'View' && (
                    <ScreenWidthWrapper className="tips-division">
                        <Styled.TipContainer>
                            <Styled.TipHeaderText>
                                <StyledTipsTitle>Tips</StyledTipsTitle>
                                <Styled.BulbImg />
                            </Styled.TipHeaderText>
                            <GetDescription />
                        </Styled.TipContainer>
                    </ScreenWidthWrapper>
                )}
            </Styled.StyledContainer>
        </PageContent>
    );
};
