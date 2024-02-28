import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface NonAuthRouteProps {
    children: ReactNode;
}

export const NonAuthRoute = ({ children }: NonAuthRouteProps) => {
    const auth = useAuth();

    if (auth.token) {
        return <Navigate to={ROUTES.MAIN} />;
    }

    return children;
};
