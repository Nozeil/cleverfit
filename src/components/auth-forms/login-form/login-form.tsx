import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth-form/auth-form';
import EmailInput from '../components/inputs/email-input';
import PasswordInput from '../components/inputs/password-input';
import PasswordOptions from './password-options/password-options';
import { useLoginUserMutation } from '@services/api';
import { ROUTES } from '@constants/routes';
import type { OnFinishLoginValues } from '../auth-forms.types';

import styles from './login-form.module.css';

const LoginForm = () => {
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();

    const onFinish = async (values: OnFinishLoginValues) => {
        try {
            await loginUser({
                email: values.email,
                password: values.password,
            })

            navigate(ROUTES.MAIN, { replace: true });
        } catch (e) {
            console.log(e);
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
