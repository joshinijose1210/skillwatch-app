export type IGenderData = {
    gendersCount: {
        malesCount: number;
        femalesCount: number;
        othersCount: number;
    };
    gendersPercentage: {
        malesPercentage: number;
        femalesPercentage: number;
        othersPercentage: number;
    };
};

export interface IDemogrpahics {
    gendersData: IGenderData;
    averageTenure: {
        years: number;
        months: number;
    };
    averageAge: {
        years: number;
        months: number;
    };
}

export type Props = {
    demographics: IDemogrpahics;
    isLoading: boolean;
};
