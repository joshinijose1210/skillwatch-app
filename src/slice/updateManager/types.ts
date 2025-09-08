export interface UpdateManagerState {
    managerUpdateDataList: UpdateManagerDetails[];
}

export type UpdateManagerDetails = {
    currentManagerId: string;
    employeeId: string;
    newManagerId: string;
};
