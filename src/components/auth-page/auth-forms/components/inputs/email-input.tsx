import { Input, Form } from 'antd';
import { emailPattern } from './regex';

import styles from './inputs.module.css';

const EmailInput = () => (
    <Form.Item
        className={styles.email}
        name='email'
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
