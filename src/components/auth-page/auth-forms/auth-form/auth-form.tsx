import { type ReactNode, useState } from 'react';
import { Button, Form } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { OnFinishAuth } from '../auth-forms.types';

import styles from './auth-form.module.css';

interface AuthFormProps {
    name: string;
    children: ReactNode;
    onFinish: OnFinishAuth;
    submitButtonTestId: string;
    className?: string;
    submitButtonClassName?: string;
    submitButtonText?: string;
    googleButton?: boolean;
    googleButtonText?: string;
    shouldValidate?: boolean;
}

const cx = classNames.bind(styles);

const AuthForm = ({
    className,
    name,
    children,
    onFinish,
    submitButtonClassName,
    submitButtonText = 'Войти',
    submitButtonTestId,
    googleButtonText,
    googleButton,
    shouldValidate,
}: AuthFormProps) => {
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(false);
    const formClassName = cx(className, styles.form);

    const onFieldsChange = () => {
        if (shouldValidate) {
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
            setIsDisabled(hasErrors);
        }
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
                    className={cx(styles.btn, submitButtonClassName)}
                    block
                    type='primary'
                    htmlType='submit'
                    disabled={isDisabled}
                    data-test-id={submitButtonTestId}
                >
                    {submitButtonText}
                </Button>
            </Form.Item>
            {googleButton && (
                <Form.Item>
                    <Button className={styles.btn} block icon={<GooglePlusOutlined />}>
                        {googleButtonText}
                    </Button>
                </Form.Item>
            )}
        </Form>
    );
};

export default AuthForm;
