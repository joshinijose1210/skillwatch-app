export const SortRecords = <T>(records: Record<string, T>, order: string[]) => {
    const sortedRecords = Object.entries(records)?.sort(([kra1], [kra2]) => {
        const kra1Index = order.indexOf(kra1);
        const kra2Index = order.indexOf(kra2);
        if (kra1Index === -1) return -1;
        if (kra2Index === -1) return -1;
        else {
            return kra1Index - kra2Index;
        }
    });
    return Object.fromEntries(sortedRecords);
};
