import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ForgotPasswordRouteProps {
    children: ReactNode;
    prevRoute: string;
}

export const ForgotPasswordRoute = ({ children, prevRoute }: ForgotPasswordRouteProps) => {
    const router = useAppSelector((store) => store.router);
    const location = useLocation();
    const hasAccess = useRef(false);

    useLayoutEffect(() => {
        if (
            router.previousLocations?.at(-1)?.location?.pathname !== prevRoute &&
            router.location?.pathname === location.pathname
        ) {
            hasAccess.current = true;
        }
    }, []);

    const content = hasAccess ? children : <Navigate to={ROUTES.AUTH} state={location.state} />;

    return content;
};
