import { ReactNode } from 'react';

export interface Props {
    icon: ReactNode;
    title?: string;
    description?: string;
    isComingSoon?: boolean;
    footerText?: string;
    content?: ReactNode;
    footer?: ReactNode;
}
