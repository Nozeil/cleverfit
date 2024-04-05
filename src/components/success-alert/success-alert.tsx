import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { closeSuccessAlert, isSuccessAlertOpenSelector } from '@redux/slices/success-alert';
import { type AlertProps, Alert } from 'antd';

import styles from './success-alert.module.css';

export const SuccessAlert = (props: AlertProps) => {
    const isOpen = useAppSelector(isSuccessAlertOpenSelector);
    const dispatch = useAppDispatch();

    const onClose = useCallback(() => dispatch(closeSuccessAlert()), [dispatch]);

    useEffect(
        () => () => {
            onClose();
        },
        [onClose],
    );

    return isOpen ? (
        <Alert
            className={styles.alert}
            type='success'
            showIcon={true}
            closable={true}
            onClose={onClose}
            data-test-id='alert'
            {...props}
        />
    ) : null;
};
