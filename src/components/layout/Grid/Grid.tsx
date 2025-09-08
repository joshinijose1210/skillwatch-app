import * as React from 'react';
import { GridContainer } from './Grid.styled';
import { GridProps } from './types';

export const Grid: React.FC<GridProps> = props => {
    const {
        alignItems,
        children,
        column,
        expanded,
        justify,
        direction,
        lg,
        md,
        row,
        sm,
        margin,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        customClasses,
        columnGap
    } = props;
    const isRow: boolean = row || !column;

    const classes = `${
        (!isRow ? 'column' : 'row') +
        ((isRow || !isRow) && expanded ? ` expanded` : '') +
        ((isRow || !isRow) && justify ? ` ${justify}` : '') +
        ((isRow || !isRow) && alignItems ? ` ${`align-${alignItems}`}` : '') +
        (!isRow && direction ? ` ${direction}` : '') +
        (!isRow && sm ? ` ${`sm-${sm}`}` : '') +
        (!isRow && md ? ` ${`md-${md}`}` : '') +
        (!isRow && lg ? ` ${`lg-${lg}`}` : '') +
        (isRow && columnGap ? ` column-gap-${columnGap}` : '') +
        (margin ? ` margin-${margin}` : '') +
        (marginLeft ? ` marginLeft-${marginLeft}` : '') +
        (marginRight ? ` marginRight-${marginRight}` : '') +
        (marginTop ? ` marginTop-${marginTop}` : '') +
        (marginBottom ? ` marginBottom-${marginBottom}` : '') +
        (customClasses ? ` ${customClasses}` : '')
    }`;

    return <GridContainer className={classes}>{children}</GridContainer>;
};
