import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import styles from './../forms.module.css';

const LoginForm = () => (
    <Form
        className={styles.form}
        name='sign-in-form'
        initialValues={{ remember: true }}
        autoComplete='off'
        size='large'
    >
        <Form.Item
            className={styles.email}
            name='email'
            rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
            ]}
        >
            <Input className={styles.input} type='email' addonBefore='e-mail:' />
        </Form.Item>

        <Form.Item
            className={styles.password}
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password className={styles.input} placeholder='Пароль' />
        </Form.Item>

        <Form.Item className={styles.checkArea}>
            <Form.Item name='remember' valuePropName='defaultChecked' noStyle>
                <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <Button className={styles.forgotPasswordBtn} type='link'>
                <Link to=''>Забыли пароль?</Link>
            </Button>
        </Form.Item>

        <Form.Item className={styles.loginBtnFormItem}>
            <Button className={styles.btn} block type='primary' htmlType='submit'>
                Войти
            </Button>
        </Form.Item>
        <Form.Item>
            <Button className={styles.btn} block htmlType='submit' icon={<GooglePlusOutlined />}>
                Войти через Google
            </Button>
        </Form.Item>
    </Form>
);

export default LoginForm;
