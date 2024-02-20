import { useRegisterUserMutation } from '@services/api';
import AuthForm from '../components/auth-form/auth-form';
import EmailInput from '../components/inputs/email-input';
import PasswordInput from '../components/inputs/password-input';
import type { OnFinishRegistrationValues } from '../auth-forms.types';

import styles from './registration-form.module.css';

const helpMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

const RegistrationForm = () => {
    const [registerUser] = useRegisterUserMutation();

    const onFinish = async (values: OnFinishRegistrationValues) => {
        try {
            await registerUser({ email: values.email, password: values.password })
        } catch (e) {
            console.log(e);
        }
    };

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
