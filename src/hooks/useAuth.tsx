import { useContext } from 'react';
import { AuthContext } from '@components/auth/auth-context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
