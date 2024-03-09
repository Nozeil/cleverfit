import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Typography } from 'antd';

import styles from './notificaton.module.css';

type NotificationProps = {
    isOpen: boolean;
    close: () => void;
    refresh: () => void;
};

export const Notification = ({ isOpen, close, refresh }: NotificationProps) => (
    <Modal
        className={styles.modal}
        open={isOpen}
        centered
        footer={null}
        width={384}
        closable={false}
        maskStyle={{ backgroundColor: 'var(--blue-2)' }}
    >
        <Space className={styles.space} direction='vertical' align='end'>
            <Space size='middle' align='start'>
                <CloseCircleOutlined style={{ color: 'var(--primary-light-6)', fontSize: 24 }} />
                <div>
                    <Typography.Title className={styles.title} level={5}>
                        При открытии данных произошла ошибка
                    </Typography.Title>
                    <Typography.Text className={styles.title} disabled>
                        Попробуйте ещё раз.
                    </Typography.Text>
                </div>
                <Button
                    type='text'
                    size='small'
                    onClick={close}
                    icon={
                        <CloseOutlined
                            style={{
                                color: 'var(--character-light-secondary-45)',
                                fontSize: 14,
                            }}
                        />
                    }
                />
            </Space>
            <Button className={styles.btn} onClick={refresh} type='primary'>
                Обновить
            </Button>
        </Space>
    </Modal>
);
