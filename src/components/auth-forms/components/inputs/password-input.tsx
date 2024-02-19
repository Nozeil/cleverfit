import { Form, Input } from 'antd';
import { passwordPattern } from './regex';

import styles from './inputs.module.css';

interface PasswordInputProps {
    name?: string;
    message?: string;
    placeholder?: string;
    help?: string;
}

const PasswordInput = ({
    name = 'password',
    message = '',
    placeholder = 'Пароль',
    help,
}: PasswordInputProps) => (
    <Form.Item
        className={styles.password}
        name={name}
        help={help}
        rules={[
            {
                required: true,
                pattern: passwordPattern,
                message,
            },
        ]}
    >
        <Input.Password className={styles.input} placeholder={placeholder} />
    </Form.Item>
);

export default PasswordInput;
