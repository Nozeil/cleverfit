import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth-form/auth-form';
import EmailInput from '../components/inputs/email-input';
import PasswordInput from '../components/inputs/password-input';
import PasswordOptions from './password-options/password-options';
import { useLoginUserMutation } from '@services/api';
import { COMPOUND_ROUTES, ROUTES } from '@constants/routes';
import useAuth from '@hooks/useAuth';
import type { OnFinishLoginValues } from '../auth-forms.types';

import styles from './login-form.module.css';

const LoginForm = () => {
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const onFinish = async ({ email, password, remember }: OnFinishLoginValues) => {
        const options = { state: { from: location } };

        try {
            const { accessToken } = await loginUser({
                email,
                password,
            }).unwrap();

            auth.signin(accessToken, remember, () => navigate(ROUTES.MAIN, options));
        } catch (e) {
            navigate(COMPOUND_ROUTES.RESULT_ERROR_LOGIN, options);
        }
    };

    return (
        <AuthForm
            className={styles.loginForm}
            name='login-form'
            googleButtonText='Войти через Google'
            onFinish={onFinish}
        >
            <div className={styles.loginFormGroup}>
                <EmailInput />
                <PasswordInput />
            </div>

            <PasswordOptions />
        </AuthForm>
    );
};

export default LoginForm;
