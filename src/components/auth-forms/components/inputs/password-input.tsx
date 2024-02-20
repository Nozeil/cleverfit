import { Form, Input } from 'antd';
import { passwordPattern } from './regex';
import { type Rule } from 'antd/lib/form';

import styles from './inputs.module.css';

interface PasswordInputProps {
    name?: string;
    message?: string;
    placeholder?: string;
    help?: string;
    rules?: Rule[];
}

const PasswordInput = ({
    name = 'password',
    message = '',
    placeholder = 'Пароль',
    help,
    rules: additionalRules,
}: PasswordInputProps) => {
    const rules: Rule[] = [
        {
            required: true,
            pattern: passwordPattern,
            message,
        },
    ];

    if (additionalRules) {
        rules.push(...additionalRules);
    }

    return (
        <Form.Item className={styles.password} name={name} help={help} rules={rules}>
            <Input.Password className={styles.input} placeholder={placeholder} />
        </Form.Item>
    );
};

export default PasswordInput;
