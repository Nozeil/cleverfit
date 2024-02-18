import { useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { emailPattern, passwordPattern } from '../regex';

import styles from './../forms.module.css';

const LoginForm = () => {
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(false);

    const onFieldsChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setIsDisabled(hasErrors);
    };

    return (
        <Form
            className={styles.form}
            form={form}
            name='sign-in-form'
            initialValues={{ remember: true }}
            autoComplete='off'
            size='large'
            onFieldsChange={onFieldsChange}
        >
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

            <Form.Item
                className={styles.password}
                name='password'
                rules={[
                    {
                        required: true,
                        pattern: passwordPattern,
                        message: '',
                    },
                ]}
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
                <Button
                    className={styles.btn}
                    block
                    type='primary'
                    htmlType='submit'
                    disabled={isDisabled}
                >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Button className={styles.btn} block icon={<GooglePlusOutlined />}>
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
