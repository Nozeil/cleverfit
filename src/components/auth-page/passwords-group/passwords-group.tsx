import { INPUT_NAMES } from '../auth-page.constants';
import PasswordInput from '../inputs/password-input';

const helpMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

interface PasswordGroupProps {
    placeholder_1?: string;
    testId_1: string;
    testId_2: string;
}

const PasswordsGroup = ({ placeholder_1, testId_1, testId_2 }: PasswordGroupProps) => (
    <>
        <PasswordInput
            help={helpMessage}
            message={helpMessage}
            placeholder={placeholder_1}
            testId={testId_1}
        />
        <PasswordInput
            name={INPUT_NAMES.PASSWORD_CONFIRM}
            placeholder='Повторите пароль'
            rules={[
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue(INPUT_NAMES.PASSWORD) === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                    },
                }),
            ]}
            testId={testId_2}
        />
    </>
);

export default PasswordsGroup;
