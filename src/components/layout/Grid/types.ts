type GridItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

type GridJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

type Direction = 'column-direction';

type GridSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type MarginSizes = 1 | 2 | 3;

type columnGap = 1 | 2 | 3;

export interface GridProps {
    children?: React.ReactNode;
    alignItems?: GridItemsAlignment;
    column?: boolean;
    expanded?: boolean;
    justify?: GridJustify;
    lg?: GridSizes;
    md?: GridSizes;
    row?: boolean;
    sm?: GridSizes;
    direction?: Direction;
    margin?: MarginSizes;
    marginLeft?: MarginSizes;
    marginRight?: MarginSizes;
    marginTop?: MarginSizes;
    marginBottom?: MarginSizes;
    customClasses?: string;
    columnGap?: columnGap;
}
