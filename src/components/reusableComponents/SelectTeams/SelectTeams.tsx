import { StyledMultiSelect } from '@common';
import { SelectTeamprops } from './types';
import { useSelectTeams } from './useSelectTeams';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

export const SelectTeams = ({ values, onChange, disabled = false }: SelectTeamprops) => {
    const { teamsList } = useSelectTeams();

    return (
        <>
            <StyledMultiSelect
                minWidth="100%"
                disabled={disabled}
                options={teamsList}
                variant="outlined"
                size="M"
                values={values}
                onChange={onChange}
                placeholder="Select Teams"
                isSearchable={true}
                label="Select Teams"
            />
            <TooltipDropdown
                dataIds={['select teams-input', 'select teams-count-chip']}
                values={
                    values?.length && teamsList.length
                        ? teamsList.filter(
                              (item: OptionsType) => typeof item.value === 'number' && (values as number[]).includes(item.value)
                          )
                        : []
                }
            />
        </>
    );
};
