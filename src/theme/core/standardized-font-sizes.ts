// this should be refactored later and standardized across the app
export const standardFontSize = {
    tipsFontSize: {
        title: '18px',
        heading1: '16px', // bold
        accordionTitle: '16px', // bold
        heading2: '14px', // bold
        content: '14px'
    },
    tabTitleFontSize: '16px',
    analyticsFontSize: {
        heading1: '16px',
        content: '14px',
        placeholder: '13px',
        lengends: '12px'
    },
    contentFontSize: '14px', // nonbold
    toggleLabelFontSize: '14px', // nonbold
    modalFontSize: {
        title: '20px',
        chip: '12px',
        example: '13px'
    }
};

export const standardColor = {
    pageTitleColor: '#444',
    contentColor: '#555',
    tipsColor: {
        title: '#607890', //bold
        heading1: '#607890', //bold
        heading2: '#607890', //bold
        content: '#607890'
    }
};

export type StandardFontSize = typeof standardFontSize;
export type StandardColor = typeof standardColor;

export type NewStandardFonts = StandardFontSize & StandardColor;
