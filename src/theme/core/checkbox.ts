import { CheckboxTheme, defaultTheme } from '@medly-components/theme';

const checkbox: CheckboxTheme = {
    ...defaultTheme.checkbox,
    bgColor: {
        ...defaultTheme.checkbox.bgColor,
        disabled: '#9BB8E8'
    },
    iconColor: {
        ...defaultTheme.checkbox.iconColor,
        disabled: '#ffffff'
    }
};

export default checkbox;
