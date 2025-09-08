import { FC, memo } from 'react';
import { BadgeWrapper } from './Badge.styled';
import { Props } from './types';

export const Badge: FC<Props> = memo(({ children, ...props }) => {
    return <BadgeWrapper {...props}>{children}</BadgeWrapper>;
});

Badge.displayName = 'Badge';
