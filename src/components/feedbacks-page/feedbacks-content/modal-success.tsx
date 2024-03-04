import { ResultButton } from '@components/result-button/result-button';
import { WIDTH_540 } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    closeSuccessFeedbackModal,
    isSuccessFeedbackModalOpenSelector,
} from '@redux/slices/success-feedback-modal';
import { Modal, Result, Typography } from 'antd';

export const ModalSuccess = () => {
    const isOpen = useAppSelector(isSuccessFeedbackModalOpenSelector);
    const dispatch = useAppDispatch();

    const onClick = () => dispatch(closeSuccessFeedbackModal());

    return (
        <Modal open={isOpen} closable={false} centered width={WIDTH_540} footer={null}>
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
};
