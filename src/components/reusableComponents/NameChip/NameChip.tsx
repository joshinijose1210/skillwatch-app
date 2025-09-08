import { Chip } from '@medly-components/core';
import { ChipDiv } from './NameChip.styled';
import { NameChipProps } from './types';

export const NameChip: React.FC<NameChipProps> = ({ labels, handleRemove, chipColor }) => {
    return (
        <ChipDiv>
            {labels.map((label, index) => (
                <Chip variant="outlined" key={index} color={chipColor || ''} label={label} onDelete={() => handleRemove(label)} />
            ))}
        </ChipDiv>
    );
};
