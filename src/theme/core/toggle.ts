import { defaultTheme, ToggleTheme } from '@medly-components/theme';

const toggle: ToggleTheme = {
    ...defaultTheme.toggle,
    checkedBgColor: defaultTheme.colors.green[300]
};

export default toggle;
