import { AuthContext } from '@components/auth/auth-context';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
