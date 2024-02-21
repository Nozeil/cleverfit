import { type ReactNode } from 'react';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Navigate, useLocation } from 'react-router-dom';

interface ForgotPasswordRouteProps {
    children: ReactNode;
    prevRoute: string;
}

const ForgotPasswordRoute = ({ children, prevRoute }: ForgotPasswordRouteProps) => {
    const router = useAppSelector((store) => store.router);
    const location = useLocation();

    if (
        router.previousLocations?.at(-1)?.location?.pathname !== prevRoute &&
        router.location?.pathname === location.pathname
    ) {
        return <Navigate to={ROUTES.AUTH} />;
    }

    return children;
};

export default ForgotPasswordRoute;
