import { Form, Checkbox } from 'antd';
import { ForgotPasswordBtn } from './forgot-password-btn';
import { INPUT_NAMES } from '@components/auth-page/auth-page.constants';

import styles from './password-options.module.css';

export const PasswordOptions = () => (
    <Form.Item className={styles.checkArea}>
        <Form.Item name={INPUT_NAMES.CHECKBOX_REMEMBER_ME} valuePropName='checked' noStyle>
            <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
        </Form.Item>

        <ForgotPasswordBtn />
    </Form.Item>
);
