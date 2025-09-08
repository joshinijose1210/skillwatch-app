import { StyledSingleSelect } from '@common';
import { SelectFeedbackTagWrapper } from './SelectFeedbackTag.styled';
import { SelectFeedbackProps } from './types';
import { useSelectFeedbacktag } from './useSelectFeedbackTag';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

export const SelectFeedbackTag = ({ feedbackTagValue, setFeedbackTagValue, disabled = false, dataTestId }: SelectFeedbackProps) => {
    const { tagsList } = useSelectFeedbacktag();

    return (
        <SelectFeedbackTagWrapper>
            <StyledSingleSelect
                disabled={disabled}
                options={tagsList}
                value={feedbackTagValue}
                onChange={val => val && setFeedbackTagValue(val)}
                label={'Feedback Type'}
                placeholder={'Select Feedback Type'}
                variant="outlined"
                size="M"
                minWidth="100%"
                data-testid={dataTestId}
            />
            <TooltipDropdown
                dataIds={[`feedback type-input`]}
                values={feedbackTagValue && tagsList.length ? tagsList.filter((item: OptionsType) => feedbackTagValue === item.value) : []}
            />
        </SelectFeedbackTagWrapper>
    );
};
