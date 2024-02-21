import { createContext } from 'react';
import { type ContextDefaultValue } from './auth.types';

export const AuthContext = createContext<ContextDefaultValue>({
    token: null,
    signin: () => ({}),
    signout: () => ({}),
});
