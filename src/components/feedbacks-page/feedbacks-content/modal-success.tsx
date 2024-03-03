import { ResultButton } from '@components/result-button/result-button';
import { WIDTH_540 } from '@constants/index';
import { Modal, Result, Typography } from 'antd';

type ModalSuccessProps = {
    open: boolean;
    onClick: () => void;
};

export const ModalSuccess = ({ open, onClick }: ModalSuccessProps) => (
    <Modal open={open} closable={false} centered width={WIDTH_540} footer={null}>
        <Result
            status='success'
            title={<Typography.Title level={3}>Отзыв успешно опубликован</Typography.Title>}
            extra={
                <ResultButton block onClick={onClick}>
                    Отлично
                </ResultButton>
            }
        />
    </Modal>
);
