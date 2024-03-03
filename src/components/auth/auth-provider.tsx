import { STORAGE_TOKEN_KEY } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken, setToken } from '@redux/slices/auth-slice';

import type { AuthProviderProps, Signin, Signout } from './auth.types';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const token = useAppSelector(selectAuthToken);
    const dispatch = useAppDispatch();

    const signin: Signin = (accessToken, callback, remember) => {
        if (remember) {
            localStorage.setItem(STORAGE_TOKEN_KEY, accessToken);
        }

        dispatch(setToken(accessToken));
        callback();
    };

    const signout: Signout = (callback) => {
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        dispatch(setToken(null));

        if (callback) {
            callback();
        }
    };

    const value = { token, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
