import { ResultButton } from '@components/result-button/result-button';
import { WIDTH_540 } from '@constants/index';
import { Modal, Result, Space, Typography } from 'antd';

import styles from './modal-error.module.css';

type ModalErrorProps = {
    open: boolean;
    onRepeat: () => void;
    onClose: () => void;
};

export const ModalError = ({ open, onClose, onRepeat }: ModalErrorProps) => (
    <Modal open={open} closable={false} centered width={WIDTH_540} footer={null}>
        <Result
            status='error'
            title={
                <Typography.Title className={styles.title} level={3}>
                    Данные не сохранились
                </Typography.Title>
            }
            subTitle='Что-то пошло не так. Попробуйте ещё раз.'
            extra={
                <Space className={styles.space}>
                    <ResultButton block onClick={onRepeat} testId=''>
                        Написать отзыв
                    </ResultButton>
                    <ResultButton block type='default' onClick={onClose} testId=''>
                        Закрыть
                    </ResultButton>
                </Space>
            }
        />
    </Modal>
);
