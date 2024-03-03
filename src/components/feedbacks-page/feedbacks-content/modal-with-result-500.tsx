import { ResultButton } from '@components/result-button/result-button';
import { WIDTH_540 } from '@constants/index';
import { Modal, Result } from 'antd';

type ModalWithResult500Props = {
    open: boolean;
    onClick: () => void;
};

export const ModalWithResult500 = ({ open, onClick }: ModalWithResult500Props) => (
    <Modal open={open} closable={false} centered width={WIDTH_540} footer={null}>
        <Result
            status='500'
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, &nbsp;попробуйте ещё раз.'
            extra={<ResultButton onClick={onClick}>Назад</ResultButton>}
        />
    </Modal>
);
