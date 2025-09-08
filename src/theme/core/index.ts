import checkbox from './checkbox';
import customColors from './colors';
import font from './font';
import sideNav from './sideNav';
import toggle from './toggle';

export const coreDefaultTheme = {
    font,
    customColors,
    toggle,
    sideNav,
    checkbox
};

export type CoreDefaultTheme = typeof coreDefaultTheme;
