import { useEffect } from 'react';
import { useAppSelector } from '@slice';
import { routeConstants } from '@constants';

export const useAutoLoginLogout = () => {
    const userDetails = useAppSelector(state => state.user);

    useEffect(() => {
        const superAdminPath = `/app${routeConstants.superAdminLogin}`;
        const userPath = `/app${routeConstants.root}`;
        const rootPath = userDetails.isSuperAdmin ? superAdminPath : userPath;
        const user = localStorage.getItem('user');
        const handleLocalStorageChange = () => {
            if (user === null) {
                window.location.assign(rootPath);
            }
            if (user !== null) {
                setTimeout(() => window.location.assign(rootPath), 1000);
            }
        };
        window.addEventListener('storage', handleLocalStorageChange);
    });
};
