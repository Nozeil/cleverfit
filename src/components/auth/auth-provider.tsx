import { STORAGE_TOKEN_KEY } from '@constants/index';
import { checkAccessToken } from '@utils/utils';
import { useState } from 'react';

import type { AuthProviderProps, Signin, Signout } from './auth.types';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState(checkAccessToken());

    const signin: Signin = (accessToken, callback, remember) => {
        remember
            ? localStorage.setItem(STORAGE_TOKEN_KEY, accessToken)
            : sessionStorage.setItem(STORAGE_TOKEN_KEY, accessToken);
        setToken(accessToken);
        callback();
    };

    const signout: Signout = (callback) => {
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        sessionStorage.removeItem(STORAGE_TOKEN_KEY);
        setToken(null);

        if (callback) {
            callback();
        }
    };

    const value = { token, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
