import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';

interface AuthRouteProps {
    children: ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
    const auth = useAuth();

    if (!auth.token) {
        return <Navigate to={ROUTES.AUTH} />;
    }

    return children;
};
