import { INPUT_GROUP_TYPE_KEYS } from '@components/auth-page/auth-page.constants';
import { InputGroup } from '@components/auth-page/input-group/input-group';
import { COMPOUND_ROUTES, ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import { useLoginUserMutation } from '@services/api';
import { useLocation, useNavigate } from 'react-router-dom';

import { EmailInput } from '../../inputs/email-input';
import { PasswordInput } from '../../inputs/password-input';
import { AuthForm } from '../auth-form/auth-form';
import type { OnFinishLoginValues } from '../auth-forms.types';
import styles from './login-form.module.css';
import { PasswordOptions } from './password-options/password-options';

export const LoginForm = () => {
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const { signin } = useAuth();

    const onFinish = async ({ email, password, remember }: OnFinishLoginValues) => {
        const options = { state: { from: location } };

        try {
            const { accessToken } = await loginUser({
                email,
                password,
            }).unwrap();

            signin(accessToken, remember, () => navigate(ROUTES.MAIN, options));
        } catch {
            navigate(COMPOUND_ROUTES.RESULT_ERROR_LOGIN, options);
        }
    };

    return (
        <AuthForm
            className={styles.loginForm}
            name='login-form'
            googleButton
            googleButtonText='Войти через Google'
            onFinish={onFinish}
            submitButtonTestId='login-submit-button'
        >
            <InputGroup type={INPUT_GROUP_TYPE_KEYS.LG}>
                <EmailInput required testId='login-email' />
                <PasswordInput testId='login-password' />
            </InputGroup>

            <PasswordOptions />
        </AuthForm>
    );
};
