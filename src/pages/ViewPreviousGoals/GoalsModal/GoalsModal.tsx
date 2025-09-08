import {
    StyledModalContentFlex,
    StyledPopup,
    SuggestionLayer,
    StyledHTMLText,
    StyledHeading,
    SuggestionDescriptionLayer
} from '../ViewPreviousGoals.styled';
import { StyledModalActions, StyledModalContent, StyledModalHeader, StyledModalTitle, StyledSingleSelect } from '@common';
import DOMPurify from 'dompurify';
import useGoalsModal from './useGoalsModal';
import { Button } from '@medly-components/core';
import format from 'date-fns/format';
import { GoalModalProps } from '../types';

// this GoalModal component is used in both previous goals page and dashboard pages
export const GoalModal = ({ refetchData }: GoalModalProps) => {
    const { progressOptions, progressLoading, handleProgressIdChange, progressId, goalModalData, submitUpdateGoal, modalOpen, closeModal } =
        useGoalsModal({ refetchData });

    return (
        <StyledPopup open={modalOpen} onCloseModal={closeModal}>
            <StyledModalHeader>
                <StyledModalTitle>{`Goal`}</StyledModalTitle>
            </StyledModalHeader>
            <StyledModalContent>
                <StyledModalContentFlex>
                    <SuggestionLayer>
                        <StyledHeading>
                            Deadline: <span>{format(new Date(goalModalData.targetDate), 'dd/MM/yy')}</span>
                        </StyledHeading>
                    </SuggestionLayer>
                    <SuggestionDescriptionLayer>
                        <StyledHeading>Goal:</StyledHeading>
                        <StyledHTMLText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(goalModalData.actionItem) }} />
                    </SuggestionDescriptionLayer>

                    <StyledSingleSelect
                        options={progressOptions}
                        variant="outlined"
                        placeholder="Select Progress"
                        size="M"
                        label="Progress"
                        isSearchable
                        minWidth="100%"
                        value={progressId}
                        onChange={handleProgressIdChange}
                        data-testid="progress"
                    />
                </StyledModalContentFlex>
            </StyledModalContent>
            <StyledModalActions>
                <Button isLoading={progressLoading} onClick={submitUpdateGoal}>
                    Save
                </Button>
            </StyledModalActions>
        </StyledPopup>
    );
};
