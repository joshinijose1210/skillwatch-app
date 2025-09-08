import { ObjectType } from '@medly-components/core/dist/es/components/Table/types';

export type SortOrder = 'asc' | 'desc';

export type Data = ObjectType[];

const getNestedValue = (obj: Record<string, any>, dottedKey: string) =>
    // @ts-ignore
    dottedKey.split('.').reduce((acc, curr) => acc[curr], obj);

export const filterData = (dottedField: string, order: SortOrder, tableData: Data) => {
    const newArray = [...tableData];
    newArray.sort((first, second) => {
        const firstField = getNestedValue(first, dottedField);
        const secondField = getNestedValue(second, dottedField);
        const comparison = firstField > secondField ? 1 : firstField < secondField ? -1 : 0;
        return order === 'asc' ? comparison : comparison * -1;
    });
    return newArray;
};
