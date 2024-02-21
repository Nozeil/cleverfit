import { Input, Form } from 'antd';
import { emailPattern } from './regex';
import { INPUT_NAMES } from '../auth-page.constants';

import styles from './inputs.module.css';

const EmailInput = () => (
    <Form.Item
        className={styles.email}
        name={INPUT_NAMES.EMAIL}
        rules={[
            {
                required: true,
                pattern: emailPattern,
                message: '',
            },
        ]}
    >
        <Input className={styles.input} type='email' addonBefore='e-mail:' />
    </Form.Item>
);

export default EmailInput;
