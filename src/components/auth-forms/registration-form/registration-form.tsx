import AuthForm from '../components/auth-form/auth-form';
import EmailInput from '../components/inputs/email-input';
import PasswordInput from '../components/inputs/password-input';

import styles from './registration-form.module.css';

const helpMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

const RegistrationForm = () => (
    <AuthForm name='registration-form' googleButtonText='Регистрация через Google'>
        <div className={styles.registrationFormGroup}>
            <EmailInput />
            <PasswordInput
                help={helpMessage}
                message={helpMessage}
            />
            <PasswordInput name='password-repeat' placeholder='Повторите пароль' />
        </div>
    </AuthForm>
);

export default RegistrationForm;
