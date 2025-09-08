import { routeConstants } from '@constants';
import { useAppSelector } from '@slice';
import { useGetKrasQuery, useGetReviewCycleDataMutation } from '@slice/services';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export interface KraType {
    id: number;
    kraId: string;
    name: string;
    weightage: number;
    organisationId: number;
}

export const useKraManagement = () => {
    const navigate = useNavigate();
    const userDetails = useAppSelector(state => state.user);
    const { ActivePage } = useParams();
    const { modulePermission } = useAppSelector(state => state.user);
    const module = modulePermission?.find(module => module.moduleName === 'KRAs');
    const [page, setPage] = useState<number>();
    const [kras, setKras] = useState<KraType[] | null>(null);
    const [enableEditKra, setEnableEditKra] = useState(false);

    const {
        data,
        isSuccess,
        isFetching: isLoading,
        error
    } = useGetKrasQuery(
        {
            path: '',
            params: [
                { name: 'page', value: ActivePage ?? page },
                { name: 'limit', value: 10 },
                { name: 'organisationId', value: userDetails.organisationId }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );
    const [getActiveReviewCycle, { data: activeReviewCycleData, isSuccess: hasFetchedActiveCycle }] = useGetReviewCycleDataMutation();

    useEffect(() => {
        if (data && isSuccess) {
            setKras(data);
        }
    }, [data, isSuccess]);

    const openAddNewKRA = () => {
        navigate(`${routeConstants.kraManagement}/1/edit-KRA`);
    };

    useEffect(() => {
        getActiveReviewCycle({
            path: 'active',
            params: [{ name: 'organisationId', value: userDetails.organisationId }]
        });
    }, [getActiveReviewCycle, userDetails.organisationId]);

    // not using useMemo here because we button is disabled by default until after API call completes and conditions are evaluated.
    useEffect(() => {
        if (
            activeReviewCycleData &&
            new Date(activeReviewCycleData?.selfReviewStartDate) > new Date() &&
            new Date(activeReviewCycleData?.checkInWithManagerEndDate) > new Date()
        ) {
            setEnableEditKra(true);
        }
        if (!activeReviewCycleData?.selfReviewStartDate && hasFetchedActiveCycle) {
            setEnableEditKra(true);
        }
    }, [activeReviewCycleData, hasFetchedActiveCycle]);

    return { openAddNewKRA, kras, error, isLoading, page, module, enableEditKra };
};
