import { type ReactNode } from 'react';

export interface Signin {
    (accessToken: string, remember: boolean, callback: () => void): void;
}

export interface Signout {
    (callback?: () => void): void;
}

export interface ContextDefaultValue {
    token: string | null;
    signin: Signin;
    signout: Signout;
}

export interface AuthProviderProps {
    children: ReactNode;
}
