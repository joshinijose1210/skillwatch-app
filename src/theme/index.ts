import { defaultTheme as medlyDefaultTheme, CoreTheme } from '@medly-components/theme';
import { CoreDefaultTheme, coreDefaultTheme } from './core';
import { NewStandardFonts, standardColor, standardFontSize } from './core/standardized-font-sizes';

export const defaultTheme: CoreDefaultTheme & CoreTheme & NewStandardFonts = {
    ...medlyDefaultTheme,
    ...coreDefaultTheme,
    ...standardFontSize,
    ...standardColor
};

export type Theme = typeof defaultTheme;
