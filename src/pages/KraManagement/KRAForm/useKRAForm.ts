import { useEffect, useState } from 'react';
import { useGetKrasQuery, usePostKraMutation } from '@slice/services';
import { KraType } from '../useKraManagement';
import { useAppSelector } from '@slice';
import { useNavigate } from 'react-router-dom';
import { routeConstants } from '@constants';
import { ErrorType } from '@common';
import { useErrorToast, useSuccessToast } from '@common/hooks/useToast';

export const useKRAForm = () => {
    const navigate = useNavigate();
    const userDetails = useAppSelector(state => state.user);
    const [weightages, setWeightages] = useState<{ [id: number]: number }>({});
    const [error, setError] = useState<string | null>(null);
    const {
        data: kras,
        isSuccess,
        isFetching: isLoading,
        error: kraGetError
    } = useGetKrasQuery(
        {
            path: '',
            params: [
                { name: 'page', value: 1 },
                { name: 'limit', value: 10 },
                { name: 'organisationId', value: userDetails.organisationId }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const [updateKra, { isSuccess: isUpdateSuccess, error: kraUpdateError }] = usePostKraMutation();

    useEffect(() => {
        if (kras) {
            const initialWeightages = Object.fromEntries(kras?.map((kra: KraType) => [kra.id, kra.weightage])) || Array(3).fill(0);

            setWeightages(initialWeightages);
        }
    }, [kras]);

    useErrorToast(kraGetError as ErrorType, 'Something went wrong!');
    useErrorToast(kraUpdateError as ErrorType, 'Could not update KRA weightages!');
    useSuccessToast(isUpdateSuccess, 'KRA weightages updated successfully!', () => {
        navigate(`${routeConstants.kraManagement}/1`);
    });

    const handleWeightageChange = (id: number, element: HTMLInputElement) => {
        const value = Number(element.value);
        setWeightages(prev => {
            const newWeightages = {
                ...prev,
                [id]: value
            };

            if (Object.values(newWeightages).some(weightage => weightage === 0)) {
                setError('Please make sure each KRA has atleast 1% weightage.');
            } else {
                const totalKraWeightage = Object.values(newWeightages).reduce((weightage, totalWeightage) => totalWeightage + weightage, 0);

                if (totalKraWeightage !== 100) {
                    setError('Please make sure the weightages add up to 100%.');
                } else {
                    setError(null);
                }
            }

            return newWeightages;
        });
    };

    const handleSave = () => {
        const updateKRAWeightageRequest = Object.keys(weightages).map((key: string | number) => ({
            id: Number(key),
            weightage: weightages[Number(key)]
        }));

        // The ipAddress field is included in POST/PUT payloads to log user activities in the user_activity
        // table for tracking purposes along with employee_id, module_id, activity.
        const payload = {
            organisationId: userDetails.organisationId,
            updateKRAWeightageRequest,
            actionBy: userDetails.id,
            ipAddress: '216.24.57.253:443'
        };

        updateKra(payload);
    };

    return {
        kras,
        error,
        isSuccess,
        handleSave,
        isLoading,
        handleWeightageChange,
        weightages
    };
};
