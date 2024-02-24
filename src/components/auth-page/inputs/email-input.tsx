import { Input, Form } from 'antd';
import { emailPattern } from './regex';
import { INPUT_NAMES } from '../auth-page.constants';

import styles from './inputs.module.css';

interface EmailInputProps {
    testId: string;
    required?: boolean
}

const EmailInput = ({ testId, required }: EmailInputProps) => (
    <Form.Item
        className={styles.email}
        name={INPUT_NAMES.EMAIL}
        rules={[
            {
                required: required,
                pattern: emailPattern,
                message: '',
            },
        ]}
    >
        <Input className={styles.input} type='email' addonBefore='e-mail:' data-test-id={testId} />
    </Form.Item>
);

export default EmailInput;
