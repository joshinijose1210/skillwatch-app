import { FontVariants, FontWeights } from '@medly-components/theme';
import React from 'react';

export interface ListHeaderProps {
    title: string | React.ReactNode;
    checkPermission?: boolean;
    subTitle?: string;
    titleVariant?: FontVariants;
    titleWeight?: FontWeights;
    actionButtonLabel?: string;
    actionButtonVariant?: 'solid' | 'flat' | 'outlined' | undefined;
    actionButtonClick?: () => void;
    actionButtonDisabled?: boolean;
    secondButtonLabel?: string;
    secondButtonVariant?: 'solid' | 'flat' | 'outlined' | undefined;
    secondButtonClick?: () => void;
    secondButtonDisabled?: boolean;
    secondButtonTitle?: string;
    moduleTitle?: string;
    titleColor?: string;
    rightSection?: JSX.Element;
}
