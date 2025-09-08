import { Header } from '@components';
import { useAppSelector } from '@slice';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteWithoutLayout: FC = () => {
    const { isLoggedIn } = useAppSelector(state => state.user);
    return isLoggedIn ? (
        <>
            <Header />
            <Outlet />
        </>
    ) : (
        <Navigate to="/app/login" />
    );
};
export default PrivateRouteWithoutLayout;
