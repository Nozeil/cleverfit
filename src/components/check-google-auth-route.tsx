import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { STORAGE_TOKEN_KEY } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/use-auth';
import type { Nullable } from '@typings/utility';

export const CheckGoogleAuthRoute = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signin } = useAuth();
    const { search, pathname } = location;

    let token: Nullable<string> = null;

    if (search && pathname === '/') {
        token = new URLSearchParams(search).get(STORAGE_TOKEN_KEY);
    }

    useEffect(() => {
        if (token) {
            signin(token, () => navigate(ROUTES.MAIN), true);
        }
    }, [navigate, signin, token]);

    const content = token ? null : <Navigate to={ROUTES.AUTH} />;

    return content;
};
