import { Text } from '@medly-components/core';
import { CheckMaterialIcon } from '@medly-components/icons';
import { FC } from 'react';
import { Icon, TimelineIconWrapper } from './TimelineIcon.styled';
import { TimelineIconProps } from './types';

export const TimelineIcon: FC<TimelineIconProps> = ({ state, isSubTask, number, isAccordionTask = false }) => {
    return (
        <TimelineIconWrapper state={state} isSubTask={isSubTask} isAccordionTask={isAccordionTask}>
            <Icon state={state}>
                {!isSubTask ? (
                    state === 'complete' ? (
                        <CheckMaterialIcon iconColor="#fff" />
                    ) : state === 'ongoing' ? (
                        <Text textVariant="h3" textColor="#fff">
                            ...
                        </Text>
                    ) : (
                        number
                    )
                ) : (
                    ''
                )}
            </Icon>
        </TimelineIconWrapper>
    );
};
