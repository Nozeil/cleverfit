import AuthForm from '../components/auth-form/auth-form';
import EmailInput from '../components/inputs/email-input';
import PasswordInput from '../components/inputs/password-input';
import PasswordOptions from './password-options/password-options';

import styles from './login-form.module.css';

const LoginForm = () => (
    <AuthForm className={styles.loginForm} name='login-form' googleButtonText='Войти через Google'>
        <div className={styles.loginFormGroup}>
            <EmailInput />
            <PasswordInput />
        </div>

        <PasswordOptions />
    </AuthForm>
);

export default LoginForm;
