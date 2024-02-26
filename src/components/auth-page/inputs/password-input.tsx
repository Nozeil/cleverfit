import { Form, Input } from 'antd';
import { passwordPattern } from './regex';
import { INPUT_NAMES } from '../auth-page.constants';
import { type Rule } from 'antd/lib/form';

import styles from './inputs.module.css';

interface PasswordInputProps {
    testId: string;
    name?: string;
    message?: string;
    placeholder?: string;
    help?: string;
    rules?: Rule[];
}

export const PasswordInput = ({
    name = INPUT_NAMES.PASSWORD,
    message = '',
    placeholder = 'Пароль',
    help,
    rules: additionalRules,
    testId,
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
            <Input.Password
                className={styles.input}
                placeholder={placeholder}
                data-test-id={testId}
            />
        </Form.Item>
    );
};