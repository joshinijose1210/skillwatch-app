import Grid from '@components/layout/Grid';
import ListHeader from '@components/reusableComponents/ListHeader';

import { CancelIcon } from '@medly-components/icons';
import { add, max } from 'date-fns';
import { FC } from 'react';
import { DatePickerDiv, StyledDateRangePicker, StyledPageContent, StyledConfirmButton, StyledText } from './ReviewCycleForm.styled';
import { useReviewCycleForm } from './useReviewCycleForm';
import { ReviewGuidelines } from '../ReviewGuidelines/ReviewGuidelines';
import { StyledToggle, StyledToggleWrapper } from '@common';

export const ReviewCycleForm: FC = () => {
    const {
        sendEmail,
        inputs,
        action,
        isLoading,
        isSubmitDisabled,
        handleDateChange,
        handleToggleChange,
        handleSubmit,
        handleDatePickerClear,
        handleEmailNotification
    } = useReviewCycleForm();

    return (
        <StyledPageContent>
            <div>
                <ListHeader data-testid="review-cycle-header" title={`${action} Review Cycle`} />
                <form onSubmit={handleSubmit}>
                    <Grid row={true} marginTop={2}>
                        <Grid column={true}>
                            <Grid row={true} md={5} alignItems={'center'}>
                                <StyledText>Review Cycle Timeline: </StyledText>
                            </Grid>
                        </Grid>

                        <Grid column={true} expanded>
                            <DatePickerDiv iconDisabled={action === 'View'}>
                                <StyledDateRangePicker
                                    displayFormat={'dd-MM-yyyy'}
                                    autoComplete="off"
                                    id="review-cycle"
                                    size="M"
                                    variant="outlined"
                                    value={inputs.reviewCycle}
                                    onChange={val => handleDateChange('reviewCycle', val)}
                                    disabled={action === 'View'}
                                    errorText={inputs.errors.reviewCycle}
                                    data-testid="review-cycle-datepicker"
                                />
                                {inputs && (inputs.reviewCycle.startDate || inputs.reviewCycle.endDate) && (
                                    <CancelIcon
                                        onClick={() => (action === 'View' ? {} : handleDatePickerClear('reviewCycle'))}
                                        disabled={action === 'View'}
                                        data-testid={'review-cycle-datepicker-cancel-icon'}
                                    />
                                )}
                            </DatePickerDiv>
                        </Grid>
                    </Grid>
                    <Grid row={true} marginTop={1}>
                        <Grid column={true}>
                            <Grid row={true} md={5} alignItems={'center'}>
                                <StyledText>Self Review Dates:</StyledText>
                            </Grid>
                        </Grid>

                        <Grid column={true} expanded>
                            <DatePickerDiv
                                iconDisabled={action === 'View' || inputs.reviewCycle.endDate === null || inputs.errors.reviewCycle !== ''}
                            >
                                <StyledDateRangePicker
                                    displayFormat={'dd-MM-yyyy'}
                                    autoComplete="off"
                                    id="self-review"
                                    value={inputs.selfReview}
                                    size="M"
                                    variant="outlined"
                                    onChange={val => handleDateChange('selfReview', val)}
                                    disabled={action === 'View' || inputs.reviewCycle.endDate === null || inputs.errors.reviewCycle !== ''}
                                    minSelectableDate={inputs.reviewCycle.startDate || new Date()}
                                    maxSelectableDate={inputs.reviewCycle.endDate || new Date()}
                                    errorText={inputs.errors.selfReview}
                                />
                                {inputs && (inputs.selfReview.startDate || inputs.selfReview.endDate) && (
                                    <CancelIcon
                                        onClick={() =>
                                            action === 'View' || inputs.reviewCycle.endDate === null || inputs.errors.reviewCycle !== ''
                                                ? {}
                                                : handleDatePickerClear('selfReview')
                                        }
                                        disabled={
                                            action === 'View' || inputs.reviewCycle.endDate === null || inputs.errors.reviewCycle !== ''
                                        }
                                        data-testid={'self-review-datepicker-cancel-icon'}
                                    />
                                )}
                            </DatePickerDiv>
                        </Grid>
                    </Grid>
                    <Grid row={true} marginTop={1}>
                        <Grid column={true}>
                            <Grid row={true} md={5} alignItems={'center'}>
                                <StyledText>Manager Review Dates:</StyledText>
                            </Grid>
                        </Grid>

                        <Grid column={true} expanded>
                            <DatePickerDiv
                                iconDisabled={action === 'View' || inputs.reviewCycle.endDate === null || inputs.errors.reviewCycle !== ''}
                            >
                                <StyledDateRangePicker
                                    displayFormat={'dd-MM-yyyy'}
                                    autoComplete="off"
                                    id="manager-review"
                                    size="M"
                                    variant="outlined"
                                    value={inputs.managerReview}
                                    onChange={val => handleDateChange('managerReview', val)}
                                    disabled={action === 'View' || inputs.reviewCycle.endDate === null || inputs.errors.reviewCycle !== ''}
                                    minSelectableDate={inputs.reviewCycle.startDate || new Date()}
                                    maxSelectableDate={inputs.reviewCycle.endDate || new Date()}
                                    errorText={inputs.errors.managerReview}
                                />
                                {inputs && (inputs.managerReview.startDate || inputs.managerReview.endDate) && (
                                    <CancelIcon
                                        onClick={() =>
                                            action === 'View' || inputs.selfReview.endDate === null || inputs.errors.selfReview !== ''
                                                ? {}
                                                : handleDatePickerClear('managerReview')
                                        }
                                        disabled={
                                            action === 'View' || inputs.reviewCycle.endDate === null || inputs.errors.reviewCycle !== ''
                                        }
                                        data-testid={'manager-review-datepicker-cancel-icon'}
                                    />
                                )}
                            </DatePickerDiv>
                        </Grid>
                    </Grid>

                    <Grid row={true} marginTop={1}>
                        <Grid column={true}>
                            <Grid row={true} md={5} alignItems={'center'}>
                                <StyledText>Check-in with Manager Dates:</StyledText>
                            </Grid>
                        </Grid>

                        <Grid column={true} expanded>
                            <DatePickerDiv
                                iconDisabled={
                                    action === 'View' ||
                                    inputs.managerReview.endDate === null ||
                                    inputs.selfReview.endDate === null ||
                                    inputs.errors.selfReview !== '' ||
                                    inputs.errors.managerReview !== ''
                                }
                            >
                                <StyledDateRangePicker
                                    displayFormat={'dd-MM-yyyy'}
                                    autoComplete="off"
                                    id="check-in-with-manager"
                                    size="M"
                                    variant="outlined"
                                    value={inputs.checkInWithManager}
                                    onChange={val => handleDateChange('checkInWithManager', val)}
                                    disabled={
                                        action === 'View' ||
                                        inputs.managerReview.endDate === null ||
                                        inputs.selfReview.endDate === null ||
                                        inputs.errors.selfReview !== '' ||
                                        inputs.errors.managerReview !== ''
                                    }
                                    minSelectableDate={
                                        inputs.selfReview.endDate && inputs.managerReview.endDate
                                            ? add(max([inputs.selfReview.endDate, inputs.managerReview.endDate]), { days: 1 })
                                            : new Date()
                                    }
                                    maxSelectableDate={inputs.reviewCycle.endDate || new Date()}
                                    errorText={inputs.errors.checkInWithManager}
                                />
                                {inputs && (inputs.checkInWithManager.startDate || inputs.checkInWithManager.endDate) && (
                                    <CancelIcon
                                        onClick={() =>
                                            action === 'View' || inputs.managerReview.endDate === null || inputs.errors.managerReview !== ''
                                                ? {}
                                                : handleDatePickerClear('checkInWithManager')
                                        }
                                        disabled={
                                            action === 'View' ||
                                            inputs.managerReview.endDate === null ||
                                            inputs.selfReview.endDate === null ||
                                            inputs.errors.selfReview !== '' ||
                                            inputs.errors.managerReview !== ''
                                        }
                                        data-testid={'check-in-with-manager-datepicker-cancel-icon'}
                                    />
                                )}
                            </DatePickerDiv>
                        </Grid>
                    </Grid>
                    {action === 'Edit' && (
                        <Grid row={true} marginTop={2}>
                            <StyledToggleWrapper>
                                <StyledToggle
                                    label="Notify users via email: "
                                    onChange={handleEmailNotification}
                                    checked={sendEmail}
                                    data-testid="notifybtn"
                                />
                            </StyledToggleWrapper>
                        </Grid>
                    )}
                    <Grid row={true} marginTop={2}>
                        <StyledToggleWrapper>
                            <StyledToggle
                                label="Publish: "
                                disabled={action === 'View'}
                                onChange={handleToggleChange}
                                checked={inputs.publish}
                                data-testid="publishbtn"
                            />
                        </StyledToggleWrapper>
                    </Grid>

                    {action !== 'View' && (
                        <Grid row={true} justify="flex-end">
                            <StyledConfirmButton type="submit" disabled={isSubmitDisabled} isLoading={isLoading} data-testid="actionbtn">
                                {action === 'Add' ? 'Save' : 'Update'}
                            </StyledConfirmButton>
                        </Grid>
                    )}
                </form>
            </div>
            <ReviewGuidelines />
        </StyledPageContent>
    );
};
