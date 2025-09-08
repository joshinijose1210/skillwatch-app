export type stepSectionType = {
    employees: JSX.Element;
    kpis: JSX.Element;
};

export type bulkImportTypes = 'employees' | 'kpis';

export interface LocationState {
    bulkImportType: bulkImportTypes;
}
