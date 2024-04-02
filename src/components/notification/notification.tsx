import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    closeTrainingListErrorNotification,
    isTrainingListErrorNotificationOpenSelector,
} from '@redux/slices/training-list-error-notification';
import { Button, Modal, Space, Typography } from 'antd';

import styles from './notificaton.module.css';

type NotificationProps = {
    refresh: () => void;
};

export const Notification = ({ refresh }: NotificationProps) => {
    const isOpen = useAppSelector(isTrainingListErrorNotificationOpenSelector);
    const dispatch = useAppDispatch();

    const closeNotification = () => dispatch(closeTrainingListErrorNotification());

    return (
        <Modal
            open={isOpen}
            centered={true}
            footer={null}
            width={384}
            closable={false}
            maskStyle={{ backgroundColor: 'var(--blue-2)' }}
        >
            <Space className={styles.space} direction='vertical' align='end'>
                <Space size='middle' align='start'>
                    <CloseCircleOutlined
                        style={{ color: 'var(--primary-light-6)', fontSize: 24 }}
                    />
                    <div>
                        <Typography.Title
                            className={styles.title}
                            level={5}
                            data-test-id='modal-error-user-training-title'
                        >
                            При открытии данных произошла ошибка
                        </Typography.Title>
                        <Typography.Text
                            className={styles.title}
                            disabled={true}
                            data-test-id='modal-error-user-training-subtitle'
                        >
                            Попробуйте ещё раз.
                        </Typography.Text>
                    </div>
                    <Button
                        type='text'
                        size='small'
                        icon={
                            <CloseOutlined
                                style={{
                                    color: 'var(--character-light-secondary-45)',
                                    fontSize: 14,
                                }}
                            />
                        }
                        onClick={closeNotification}
                        data-test-id='modal-error-user-training-button-close'
                    />
                </Space>
                <Button
                    className={styles.btn}
                    onClick={refresh}
                    type='primary'
                    data-test-id='modal-error-user-training-button'
                >
                    Обновить
                </Button>
            </Space>
        </Modal>
    );
};
