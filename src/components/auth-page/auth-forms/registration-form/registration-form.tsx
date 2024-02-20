import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '@services/api';
import { COMPOUND_ROUTES } from '@constants/routes';
import AuthForm from '../components/auth-form/auth-form';
import EmailInput from '../components/inputs/email-input';
import PasswordInput from '../components/inputs/password-input';
import { HTTP_STATUS_CODES } from '@constants/index';
import type { ErrorResponse } from '@models/models';
import type { OnFinishRegistrationValues } from '../auth-forms.types';

import styles from './registration-form.module.css';

const helpMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

const RegistrationForm = () => {
    const [registerUser] = useRegisterUserMutation();
    const location = useLocation();
    const navigate = useNavigate();

    const onFinish = async (values: OnFinishRegistrationValues) => {
        try {
            await registerUser({ email: values.email, password: values.password }).unwrap();

            navigate(COMPOUND_ROUTES.RESULT_SUCCESS_REGISTRATION);
        } catch (e) {
            const errorResponse = e as ErrorResponse;
            errorResponse.statusCode === HTTP_STATUS_CODES.CONFLICT
                ? navigate(COMPOUND_ROUTES.RESULT_ERROR_USER_EXIST)
                : navigate(COMPOUND_ROUTES.RESULT_ERROR_REGISTRATION, { state: values });
        }
    };

    useEffect(() => {
        if (location.state) {
            onFinish(location.state);
        }
    }, []);

    return (
        <AuthForm
            name='registration-form'
            googleButtonText='Регистрация через Google'
            onFinish={onFinish}
        >
            <div className={styles.registrationFormGroup}>
                <EmailInput />
                <PasswordInput help={helpMessage} message={helpMessage} />
                <PasswordInput
                    name='password-confirm'
                    placeholder='Повторите пароль'
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}
                />
            </div>
        </AuthForm>
    );
};

export default RegistrationForm;
