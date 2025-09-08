import { Text } from '@medly-components/core';
import { ClearIcon } from '@medly-components/icons';
import { StyledToast, ToastContent } from './Header.styled';
import { NotificationData } from './types';

export const NotificationBar = ({ toastMessage, onClick }: NotificationData) => {
    return (
        <StyledToast
            id={1}
            variant="info"
            hideCloseIcon={true}
            onClick={onClick}
            message={
                <ToastContent>
                    <Text textVariant="body2" textWeight="Medium">
                        {toastMessage}
                    </Text>
                    <ClearIcon id="child-element" title="toast-close-icon" size="XS" variant="solid" />
                </ToastContent>
            }
        />
    );
};
