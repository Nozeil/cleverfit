import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import useAuth from '@hooks/useAuth';

interface NonAuthRouteProps {
    children: ReactNode;
}

const NonAuthRoute = ({ children }: NonAuthRouteProps) => {
    const auth = useAuth();

    if (auth.token) {
        return <Navigate to={ROUTES.MAIN} />;
    }

    return children;
};

export default NonAuthRoute;
