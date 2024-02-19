import { Form, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

import styles from './password-options.module.css';

const PasswordOptions = () => {
    return (
        <Form.Item className={styles.checkArea}>
            <Form.Item name='remember' valuePropName='defaultChecked' noStyle>
                <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <Button className={styles.forgotPasswordBtn} type='link'>
                <Link to=''>Забыли пароль?</Link>
            </Button>
        </Form.Item>
    );
};

export default PasswordOptions;
