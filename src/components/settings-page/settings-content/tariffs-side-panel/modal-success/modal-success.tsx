import { CheckCircleFilled } from '@ant-design/icons';
import { ModalWithShadowMd } from '@components/modal-with-shadow-md/modal-with-shadow-md';
import { WIDTH_540 } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { closeTariffsSuccessModal, selectIsTariffsSuccessModalOpen } from '@redux/slices/tariffs';
import { useGetUserInfoQuery } from '@services/endpoints/user';
import { Grid, Result, Typography } from 'antd';

import styles from './modal-success.module.css';

const { useBreakpoint } = Grid;

export const ModalSuccess = () => {
    const isOpen = useAppSelector(selectIsTariffsSuccessModalOpen);
    const dispatch = useAppDispatch();
    const { data } = useGetUserInfoQuery();
    const { xs } = useBreakpoint();

    const onClose = () => dispatch(closeTariffsSuccessModal());

    return (
        data && (
            <ModalWithShadowMd
                className={styles.modal}
                open={isOpen}
                closable={!xs}
                centered
                width={WIDTH_540}
                footer={null}
                maskStyle={{ backgroundColor: 'var(--blue-2)' }}
                onCancel={onClose}
            >
                <Result
                    className={styles.result}
                    status='success'
                    icon={<CheckCircleFilled style={{ color: 'var(--primary-light-6)' }} />}
                    title={
                        <Typography.Title className={styles.title} level={3}>
                            Чек для оплаты у вас на почте
                        </Typography.Title>
                    }
                    subTitle={
                        <Typography.Text className={styles.subtitle}>
                            Мы отправили инструкцию для оплаты вам на e-mail <b>{data.email}</b>.
                            После подтверждения оплаты войдите в приложение заново.
                        </Typography.Text>
                    }
                    extra={
                        <Typography.Text className={styles.extra}>
                            Не пришло письмо? Проверьте папку Спам.
                        </Typography.Text>
                    }
                />
            </ModalWithShadowMd>
        )
    );
};
