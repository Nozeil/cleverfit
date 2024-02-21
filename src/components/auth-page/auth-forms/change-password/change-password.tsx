import { useEffect } from 'react';
import { Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentLayout from '../../content-layout/content-layout';
import PasswordsGroup from '../../passwords-group/passwords-group';
import AuthForm from '../auth-form/auth-form';
import InputGroup from '../../input-group/input-group';
import { INPUT_GROUP_TYPE_KEYS } from '../../auth-page.constants';
import { useChangePasswordMutation } from '@services/api';
import { COMPOUND_ROUTES } from '@constants/routes';
import type { OnFinishChangePasswordValues } from '../auth-forms.types';

import styles from './change-password.module.css';

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const onFinish = async (values: OnFinishChangePasswordValues) => {
        const options = {
            state: { from: location, values },
        };
        try {
            await changePassword({
                password: values.password,
                confirmPassword: values['password-confirm'],
            }).unwrap();
            navigate(COMPOUND_ROUTES.RESULT_SUCCESS_CHANGE_PASSWORD, options);
        } catch {
            navigate(COMPOUND_ROUTES.RESULT_ERROR_CHANGE_PASSWORD, options);
        }
    };

    useEffect(() => {
        if (location?.state?.values) {
            onFinish(location.state.values);
        }
    }, []);

    return (
        <ContentLayout>
            <AuthForm
                name='change-password-form'
                onFinish={onFinish}
                submitButtonClassName={styles.btn}
                submitButtonText='Сохранить'
            >
                <Typography.Title level={3} className={styles.title}>
                    Восстановление аккауанта
                </Typography.Title>
                <InputGroup type={INPUT_GROUP_TYPE_KEYS.XL}>
                    <PasswordsGroup placeholder_1='Новый пароль' />
                </InputGroup>
            </AuthForm>
        </ContentLayout>
    );
};

export default ChangePassword;
