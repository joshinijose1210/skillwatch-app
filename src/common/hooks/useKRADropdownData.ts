import { KraType } from '@pages/KraManagement/useKraManagement';
import { useAppSelector } from '@slice';
import { useGetKrasQuery } from '@slice/services';
import { useMemo } from 'react';

export const useKRADropdownData = () => {
    const userDetails = useAppSelector(state => state.user);
    const {
        data: kras = [],
        isSuccess: isKrasFetched,
        isLoading: isKrasLoading
    } = useGetKrasQuery(
        {
            path: '',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        },
        { refetchOnMountOrArgChange: true }
    );

    const krasList = useMemo(
        () =>
            isKrasFetched
                ? kras.map((kra: KraType) => {
                      return { value: kra.id, label: kra.name };
                  })
                : [],
        [isKrasFetched, kras]
    );
    return { krasList, kras, isKrasFetched, isKrasLoading };
};
