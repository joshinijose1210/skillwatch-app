import { useAppSelector } from '@slice';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute: FC = () => {
    const { isLoggedIn } = useAppSelector(state => state.user);

    return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
export default PublicRoute;
