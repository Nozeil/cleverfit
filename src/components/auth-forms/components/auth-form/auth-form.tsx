import { ReactNode, useState } from 'react';
import { Button, Form } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import type { OnFinishAuth } from '@components/auth-forms/auth-forms.types';

import styles from './auth-form.module.css';

interface AuthFormProps {
    name: string;
    googleButtonText: string;
    children: ReactNode;
    onFinish: OnFinishAuth;
    className?: string;
}

const cx = classNames.bind(styles);

const AuthForm = ({ className, name, googleButtonText, children, onFinish }: AuthFormProps) => {
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(false);
    const formClassName = cx(className, styles.form);

    const onFieldsChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setIsDisabled(hasErrors);
    };

    return (
        <Form
            className={formClassName}
            form={form}
            name={name}
            initialValues={{ remember: true }}
            autoComplete='off'
            size='large'
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
        >
            {children}

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
                    {googleButtonText}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthForm;
