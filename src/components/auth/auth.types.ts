import { type ReactNode } from 'react';
import type { Nullable } from '@typings/utility';

export type Signin = (accessToken: string, callback: () => void, remember?: boolean) => void;

export type Signout = (callback?: () => void) => void;

export type ContextDefaultValue = {
    token: Nullable<string>;
    signin: Signin;
    signout: Signout;
};

export type AuthProviderProps = {
    children: ReactNode;
};
