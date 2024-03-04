import { INPUT_NAMES } from '@components/auth-page/auth-page.constants';
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '@constants/index';
import { COMPOUND_ROUTES } from '@constants/routes';
import { ErrorResponse } from '@models/models';
import { useCheckEmailMutation } from '@services/api';
import { Button, Form } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './password-options.module.css';

export const ForgotPasswordBtn = () => {
    const [checkEmail] = useCheckEmailMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const onClick = async (email: string) => {
        if (email) {
            const optionsWithEmail = { state: { from: location, email } };

            try {
                await checkEmail({ email }).unwrap();
                navigate(COMPOUND_ROUTES.AUTH_CONFIRM_EMAIL, optionsWithEmail);
            } catch (e) {
                const { status, data } = e as ErrorResponse;

                if (
                    status === HTTP_STATUS_CODES.NOT_FOUND &&
                    data.message === ERROR_MESSAGES.EMAIL_NOT_FOUND
                ) {
                    navigate(COMPOUND_ROUTES.RESULT_ERROR_CHECK_EMAIL_NO_EXIST, {
                        state: { from: location },
                    });
                } else {
                    navigate(COMPOUND_ROUTES.RESULT_ERROR_CHECK_EMAIL, optionsWithEmail);
                }
            }
        }
    };

    useEffect(() => {
        if (location.state?.email) {
            onClick(location.state.email);
        }
    }, []);

    return (
        <Form.Item shouldUpdate noStyle>
            {({ getFieldError, getFieldValue }) => {
                const email = getFieldValue(INPUT_NAMES.EMAIL);
                const disabled = !!getFieldError(INPUT_NAMES.EMAIL).length && email;

                return (
                    <Button
                        className={styles.forgotPasswordBtn}
                        type='link'
                        disabled={disabled}
                        onClick={() => onClick(email)}
                        data-test-id='login-forgot-button'
                    >
                        Забыли пароль?
                    </Button>
                );
            }}
        </Form.Item>
    );
};
