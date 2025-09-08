import { routeConstants } from '@constants';
import { debounce } from '@medly-components/utils';
import { useAppSelector } from '@slice';
import { updateSearch } from '@slice/search';
import { useGetRolesQuery } from '@slice/services';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RolesTypes } from './types';

export const useRolesAndPermissions = () => {
    const userDetails = useAppSelector(state => state.user),
        roleSearch = useAppSelector(state => state.search),
        path = useLocation().pathname,
        navigateTo = useNavigate(),
        { ActivePage } = useParams(),
        dispatch = useDispatch();

    const [searchText, setSearchText] = useState(''),
        [roles, setRoles] = useState<RolesTypes>([]);

    const {
        data,
        isSuccess,
        error,
        isFetching: isLoading
    } = useGetRolesQuery(
        {
            path: '',
            params: [
                { name: 'page', value: ActivePage ?? 1 },
                { name: 'organisationId', value: userDetails.organisationId },
                { name: 'limit', value: 10 },
                { name: 'searchText', value: roleSearch.searchText }
            ]
        },
        { refetchOnMountOrArgChange: true }
    );

    const openAddRole = () => {
        if (path.includes(routeConstants.firstRoleRedirect)) {
            navigateTo(`${routeConstants.firstRoleRedirect}/${1}/add-role-&-permissions`, {
                state: { action: 'add', from: 'onboardingFlow' }
            });
        } else {
            navigateTo(`${routeConstants.rolesAndPermissions}/${ActivePage}/add-role-&-permissions`, { state: { action: 'add' } });
        }
    };

    const handlePageChange = (page: number) => {
        if (path.includes(routeConstants.firstRoleRedirect)) {
            navigateTo(`${routeConstants.firstRoleRedirect}/${page}`);
        } else {
            navigateTo(`${routeConstants.rolesAndPermissions}/${page}`);
        }
    };

    const goBackHandle = () => {
        navigateTo(routeConstants.firstRole);
    };

    const onSearchClear = () => {
        setSearchText('');
        dispatch(
            updateSearch({
                ...roleSearch,
                searchText: ''
            })
        );
        navigateTo(`${routeConstants.rolesAndPermissions}/${1}`);
    };

    const onSearch = useCallback(
        (value: string) => {
            dispatch(
                updateSearch({
                    searchText: value,
                    modulePath: '/roles-&-permissions'
                })
            );
        },
        [dispatch]
    );
    const debouncedOnChange = useCallback(
        debounce(value => {
            onSearch(value);
        }, 500),
        []
    );

    const onSearchChange = useCallback(
        (val: string) => {
            setSearchText(val);
            debouncedOnChange(val);
        },
        [debouncedOnChange]
    );
    useEffect(() => {
        if (data && isSuccess) {
            setRoles(data.roles);
        }
        if (roleSearch) {
            setSearchText(roleSearch.searchText);
        }
    }, [data, isSuccess, roleSearch]);

    useEffect(() => {
        if (error) {
            setRoles([]);
        }
    }, [error]);

    return {
        openAddRole,
        roles,
        isLoading,
        ActivePage,
        handlePageChange,
        totalItems: roles?.length ? data?.totalRoles : 0,
        goBackHandle,
        path,
        onSearchClear,
        onSearch,
        searchText,
        debouncedOnChange,
        roleSearch,
        onSearchChange
    };
};
