import { defaultTheme, FontTheme } from '@medly-components/theme';
import { standardColor } from './standardized-font-sizes';

const font: FontTheme = {
    ...defaultTheme.font,
    variants: {
        h1: {
            fontSize: '4.4rem',
            fontWeight: 'Medium',
            lineHeight: '5rem',
            letterSpacing: '-0.04rem'
        },
        h2: {
            fontSize: '3rem',
            fontWeight: 'Medium',
            lineHeight: '3.4rem',
            letterSpacing: '-0.04rem'
        },
        h3: {
            fontSize: '2.2rem',
            fontWeight: 'Regular',
            lineHeight: '2.8rem',
            letterSpacing: '-0.04rem'
        },
        h4: {
            fontSize: '1.6rem',
            fontWeight: 'Strong',
            lineHeight: '2rem',
            letterSpacing: '-0.02rem'
        },
        h5: {
            fontSize: '1.2rem',
            fontWeight: 'Strong',
            lineHeight: '1.8rem',
            letterSpacing: '0.12rem'
        },
        h6: {
            fontSize: '1.2rem',
            fontWeight: 'Medium',
            lineHeight: '1.4rem',
            letterSpacing: '0rem'
        },
        body1: {
            fontSize: '1.5rem',
            fontWeight: 'Regular',
            lineHeight: '1.9rem',
            letterSpacing: '0rem'
        },
        body2: {
            fontSize: '1.3rem',
            fontWeight: 'Regular',
            lineHeight: '1.7rem',
            letterSpacing: '0rem'
        },
        body3: {
            fontSize: '1.1rem',
            fontWeight: 'Regular',
            lineHeight: '1.4rem',
            letterSpacing: '0rem'
        },
        button1: {
            fontSize: '1.4rem',
            fontWeight: 'Medium',
            lineHeight: '2rem',
            letterSpacing: '0rem'
        },
        button2: {
            fontSize: '1.2rem',
            fontWeight: 'Medium',
            lineHeight: '1.6rem',
            letterSpacing: '0rem'
        }
    },
    defaults: {
        ...defaultTheme.font.defaults,
        color: standardColor.contentColor
    }
};

export default font;
